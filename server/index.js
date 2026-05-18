const express = require('express');
const cors = require('cors');
const fs = require('fs-extra');
const path = require('path');
const syncClient = require('./sync');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_PATH = path.join(__dirname, 'data');
const NOTES_PATH = path.join(DATA_PATH, 'notes');
const REQUESTS_FILE = path.join(DATA_PATH, 'requests.json');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Helper to ensure directories exist
fs.ensureDirSync(NOTES_PATH);

// Get all notes (metadata only)
app.get('/api/notes', async (req, res) => {
  try {
    const subjects = await fs.readdir(NOTES_PATH);
    const allNotes = [];

    for (const subject of subjects) {
      const subjectPath = path.join(NOTES_PATH, subject);
      if ((await fs.stat(subjectPath)).isDirectory()) {
        const files = await fs.readdir(subjectPath);
        for (const file of files) {
          if (file.endsWith('.json')) {
            const note = await fs.readJson(path.join(subjectPath, file));
            const { content, ...metadata } = note;
            allNotes.push({ ...metadata, subject });
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
    const localPath = path.join(NOTES_PATH, subject, `${id}.json`);
    const remotePath = `data/notes/${subject}/${id}.json`;
    
    const note = await syncClient.syncFromRemote(remotePath, localPath);
    
    if (note) {
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
    
    let requests = await syncClient.syncFromRemote('data/requests.json', REQUESTS_FILE) || [];

    const newRequest = {
      id: Date.now().toString(),
      subject,
      topic,
      status: 'pending',
      timestamp: new Date()
    };
    
    requests.push(newRequest);
    await fs.writeJson(REQUESTS_FILE, requests, { spaces: 2 });
    await syncClient.putFile('data/requests.json', requests, `New request: ${topic}`);
    
    res.json({ message: 'Request queued for AI generation.', request: newRequest });
  } catch (error) {
    console.error('Generate Request Error:', error);
    res.status(500).json({ error: 'Failed to queue request' });
  }
});

// Get requests
app.get('/api/requests', async (req, res) => {
  try {
    const requests = await syncClient.syncFromRemote('data/requests.json', REQUESTS_FILE) || [];
    res.json(requests.reverse());
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
});

// Save or update a note
app.post('/api/notes', async (req, res) => {
  try {
    const { subject, chapter, title, content, sources, order } = req.body;
    
    if (!subject || !title || !content) {
      return res.status(400).json({ error: 'Subject, title, and content are required' });
    }

    const id = title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
    const subjectPath = path.join(NOTES_PATH, subject);
    await fs.ensureDir(subjectPath);

    const noteData = {
      id,
      title,
      subject,
      chapter: chapter || 'General',
      content,
      lastUpdated: new Date(),
      sources: sources || [],
      order: order || 999
    };

    const localPath = path.join(subjectPath, `${id}.json`);
    const remotePath = `data/notes/${subject}/${id}.json`;

    await fs.writeJson(localPath, noteData, { spaces: 2 });
    await syncClient.putFile(remotePath, noteData, `Save note: ${title}`);

    res.json({ message: 'Note saved successfully', note: noteData });
  } catch (error) {
    console.error('Save Error:', error);
    res.status(500).json({ error: 'Failed to save note' });
  }
});

app.get('/', (req, res) => {
  res.send(`Notes Horizon API is running (GitHub Storage: ${syncClient.enabled ? 'Enabled' : 'Disabled'})`);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
