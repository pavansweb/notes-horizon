const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs-extra");
const path = require("path");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const REQUESTS_PATH = path.join(__dirname, "data", "requests.json");
const NOTES_PATH = path.join(__dirname, "data", "notes");

async function processRequests() {
  try {
    if (!(await fs.pathExists(REQUESTS_PATH))) return;

    let requests = await fs.readJson(REQUESTS_PATH);
    const pending = requests.filter((r) => r.status === "pending");

    if (pending.length === 0) return;

    console.log(`[Worker] Found ${pending.length} pending requests.`);

    for (const req of pending) {
      console.log(`[Worker] Generating notes for: ${req.topic} (${req.subject})...`);

      const prompt = `
        You are an expert JEE (Joint Entrance Examination) educator. 
        Generate comprehensive, high-quality study notes for the topic: "${req.topic}" for the subject: "${req.subject}".
        
        Requirements:
        1. Use Markdown for structure.
        2. Use LaTeX for ALL mathematical formulas and chemical equations (e.g., $E=mc^2$ or block $$...$$).
        3. Include: Basic Concepts, Key Formulas, JEE Tips & Tricks, and a small Summary.
        4. Focus on exam-oriented content for JEE Main & Advanced 2026.
        
        Output the result ONLY as a raw JSON object with this structure:
        {
          "id": "slugified-id",
          "title": "Topic Title",
          "subject": "${req.subject}",
          "chapter": "Chapter Name",
          "content": "Full markdown content here",
          "lastUpdated": "${new Date().toISOString()}",
          "sources": ["AI Synthesis based on JEE Syllabus"]
        }
      `;

      try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();
        
        // Clean the text if AI wrapped it in markdown code blocks
        text = text.replace(/```json|```/g, "").trim();
        const noteData = JSON.parse(text);

        const subjectDir = path.join(NOTES_PATH, req.subject);
        await fs.ensureDir(subjectDir);
        
        const fileName = `${noteData.id}.json`;
        await fs.writeJson(path.join(subjectDir, fileName), noteData, { spaces: 2 });

        // Update request status
        req.status = "completed";
        console.log(`[Worker] Successfully generated: ${req.topic}`);
      } catch (e) {
        console.error(`[Worker] Error processing ${req.topic}:`, e);
        req.status = "failed";
      }
    }

    await fs.writeJson(REQUESTS_PATH, requests, { spaces: 2 });
  } catch (error) {
    console.error("[Worker] Loop error:", error);
  }
}

// Poll every 10 seconds
console.log("[Worker] AI Background Worker started...");
setInterval(processRequests, 10000);
processRequests();
