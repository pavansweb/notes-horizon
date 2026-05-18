const os = require('os');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs-extra");
const path = require("path");
const syncClient = require("./sync");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const DATA_PATH = process.env.VERCEL ? path.join(os.tmpdir(), 'data') : path.join(__dirname, 'data');
const NOTES_PATH = path.join(DATA_PATH, 'notes');
const REQUESTS_FILE = path.join(DATA_PATH, 'requests.json');

// Safer local write helper
async function safeWriteJson(filePath, data) {
  try {
    await fs.ensureDir(path.dirname(filePath));
    await fs.writeJson(filePath, data, { spaces: 2 });
  } catch (e) {
    console.warn(`Local write failed for ${filePath}, skipping local cache:`, e.message);
  }
}

async function processRequests() {
  try {
    let requests = await syncClient.syncFromRemote('data/requests.json', REQUESTS_FILE) || [];
    const pending = requests.filter(r => r.status === "pending");

    if (pending.length === 0) return;

    console.log(`[Worker] Found ${pending.length} pending requests.`);

    for (const req of pending) {
      console.log(`[Worker] Generating notes for: ${req.topic} (${req.subject})...`);

      const prompt = `
        You are an expert JEE (Joint Entrance Examination) educator and content creator. 
        Generate comprehensive, high-quality, and exam-oriented study notes for the topic: "${req.topic}" for the subject: "${req.subject}".
        
        Follow this hierarchical structure strictly:
        1. # Title
        2. ## Synopsis: A high-level introduction to the chapter.
        3. ## Topic Breakdown: Use nested headers (###, ####) covering every major and minor concept.
        4. ## Formulas & Laws: All mathematical and chemical expressions MUST use LaTeX ($...$ for inline, $$...$$ for blocks).
        5. ## JEE Focus & Common Traps: Strategic advice, common mistakes, and important points for JEE Main & Advanced.
        6. ## Subject Specifics:
           ${req.subject === 'Physics' ? '- Include a "Diagrams" section with descriptive placeholders or Mermaid diagrams.' : '- Include a "Simulators" section with descriptions or links to interactive tools like Desmos/GeoGebra.'}

        Formatting Rules:
        - Use Markdown for structure.
        - Ensure LaTeX is used for ALL technical expressions.
        - The content should be comprehensive enough for a student to understand the topic from scratch.

        Output the result ONLY as a raw JSON object with this structure:
        {
          "id": "${req.topic.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-')}",
          "title": "${req.topic}",
          "subject": "${req.subject}",
          "chapter": "${req.topic}",
          "content": "Full markdown content here",
          "lastUpdated": "${new Date().toISOString()}",
          "sources": ["AI Synthesis based on JEE Syllabus", "NCERT Reference", "Standard Coaching Material"]
        }
      `;

      try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();
        
        // Robust JSON extraction
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          throw new Error("No JSON found in response");
        }
        text = jsonMatch[0];
        const noteData = JSON.parse(text);

        // Save note locally (optional cache)
        const noteLocalPath = path.join(NOTES_PATH, req.subject, `${noteData.id}.json`);
        await safeWriteJson(noteLocalPath, noteData);
        
        // Save note to GitHub
        await syncClient.putFile(`data/notes/${req.subject}/${noteData.id}.json`, noteData, `Worker: Generated ${req.topic}`);

        // Update request status
        const idx = requests.findIndex(r => r.id === req.id);
        requests[idx].status = "completed";
        
        // Save requests locally and to GitHub
        await safeWriteJson(REQUESTS_FILE, requests);
        await syncClient.putFile('data/requests.json', requests, `Worker: Completed ${req.topic}`);
        
        console.log(`[Worker] Successfully generated: ${req.topic}`);
      } catch (e) {
        console.error(`[Worker] Error processing ${req.topic}:`, e);
        const idx = requests.findIndex(r => r.id === req.id);
        requests[idx].status = "failed";
        await safeWriteJson(REQUESTS_FILE, requests);
        await syncClient.putFile('data/requests.json', requests, `Worker: Failed ${req.topic}`);
      }
    }
  } catch (error) {
    console.error("[Worker] Loop error:", error);
  }
}

// Poll every 10 seconds
if (process.env.RUN_WORKER === "true") {
  console.log("[Worker] AI Background Worker started...");
  setInterval(processRequests, 10000);
  processRequests();
} else {
  console.log("[Worker] Worker is not enabled (RUN_WORKER != true). Running one-off check...");
  processRequests().then(() => {
    console.log("[Worker] One-off check complete.");
    if (!process.env.INTERVAL) process.exit(0);
  });
}
