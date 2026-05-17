const express = require('express');
const cors = require('cors');
const fs = require('fs-extra');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const NOTES_PATH = path.join(__dirname, 'data', 'notes');
const REQUESTS_PATH = path.join(__dirname, 'data', 'requests.json');

// Initialize requests file
fs.ensureFileSync(REQUESTS_PATH);
if (fs.readFileSync(REQUESTS_PATH, 'utf8') === '') {
  fs.writeJsonSync(REQUESTS_PATH, []);
}

// Get all notes (metadata only)
app.get('/api/notes', async (req, res) => {
  try {
    if (!(await fs.pathExists(NOTES_PATH))) {
      return res.json([]);
    }
    
    let allNotes = [];
    const subjects = await fs.readdir(NOTES_PATH);

    for (const subject of subjects) {
      const subjectPath = path.join(NOTES_PATH, subject);
      const stat = await fs.stat(subjectPath);
      
      if (stat.isDirectory()) {
        const files = await fs.readdir(subjectPath);
        for (const file of files) {
          if (file.toLowerCase().endsWith('.json')) {
            try {
              const content = await fs.readJson(path.join(subjectPath, file));
              const { content: _, ...metadata } = content;
              metadata.subject = subject;
              allNotes.push(metadata);
            } catch (e) {
              console.error(`Error reading ${file}:`, e);
            }
          }
        }
      }
    }
    res.json(allNotes);


  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

// Get single note
app.get('/api/notes/:subject/:id', async (req, res) => {
  try {
    const { subject, id } = req.params;
    const filePath = path.join(NOTES_PATH, subject, `${id}.json`);
    if (await fs.pathExists(filePath)) {
      const note = await fs.readJson(filePath);
      res.json(note);
    } else {
      res.status(404).json({ error: 'Note not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch note' });
  }
});

// Submit a request for AI generation
app.post('/api/generate', async (req, res) => {
  try {
    const { subject, topic } = req.body;
    if (!subject || !topic) return res.status(400).json({ error: 'Subject and topic required' });
    
    const requests = await fs.readJson(REQUESTS_PATH);
    const newRequest = {
      id: Date.now().toString(),
      subject,
      topic,
      status: 'pending',
      timestamp: new Date().toISOString()
    };
    requests.push(newRequest);
    await fs.writeJson(REQUESTS_PATH, requests, { spaces: 2 });
    
    res.json({ message: 'Request queued for AI generation.', request: newRequest });
  } catch (error) {
    res.status(500).json({ error: 'Failed to queue request' });
  }
});

// Get pending requests
app.get('/api/requests', async (req, res) => {
  try {
    const requests = await fs.readJson(REQUESTS_PATH);
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
