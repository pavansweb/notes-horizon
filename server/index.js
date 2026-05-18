const express = require('express');
const cors = require('cors');
const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const syncClient = require('./sync');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Use OS temp directory if on a read-only filesystem (like Vercel)
const DATA_PATH = process.env.VERCEL ? path.join(os.tmpdir(), 'data') : path.join(__dirname, 'data');
const NOTES_PATH = path.join(DATA_PATH, 'notes');
const REQUESTS_FILE = path.join(DATA_PATH, 'requests.json');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Helper to ensure directories exist (safely)
try {
  fs.ensureDirSync(NOTES_PATH);
} catch (e) {
  console.warn('Could not ensure local data directory (might be read-only):', e.message);
}

// Safer local write helper
async function safeWriteJson(filePath, data) {
  try {
    await fs.ensureDir(path.dirname(filePath));
    await fs.writeJson(filePath, data, { spaces: 2 });
  } catch (e) {
    console.warn(`Local write failed for ${filePath}, skipping local cache:`, e.message);
  }
}

// Get all notes (metadata only)
app.get('/api/notes', async (req, res) => {
  try {
    let allNotes = [];
    console.log(`[API] Fetching notes. Sync Enabled: ${syncClient.enabled}`);
    
    if (syncClient.enabled) {
      const subjects = ['Physics', 'Chemistry', 'Mathematics'];
      for (const subject of subjects) {
        const contents = await syncClient.getDirectoryContents(`data/notes/${subject}`);
        console.log(`[API] Found ${contents.length} items for ${subject} on GitHub`);
        
        for (const item of contents) {
          if (item.name.endsWith('.json')) {
            // Optimization: We only need metadata, but we have to fetch the file to get the title
            // In a more advanced version, we might store a metadata index file.
            const fileData = await syncClient.getFile(item.path);
            if (fileData && fileData.data) {
              const { content, ...metadata } = fileData.data;
              allNotes.push({ ...metadata, subject });
            }
          }
        }
      }
    }

    // Only look at local if GitHub didn't return anything or as a supplement
    if (allNotes.length === 0) {
      console.log('[API] No notes from GitHub, checking local storage...');
      const localSubjects = await fs.readdir(NOTES_PATH).catch(() => []);
      for (const subject of localSubjects) {
        const subjectPath = path.join(NOTES_PATH, subject);
        if ((await fs.stat(subjectPath).catch(() => ({ isDirectory: () => false }))).isDirectory()) {
          const files = await fs.readdir(subjectPath).catch(() => []);
          for (const file of files) {
            if (file.endsWith('.json')) {
              const exists = allNotes.find(n => n.id === file.replace('.json', '') && n.subject === subject);
              if (!exists) {
                const note = await fs.readJson(path.join(subjectPath, file)).catch(() => null);
                if (note) {
                  const { content, ...metadata } = note;
                  allNotes.push({ ...metadata, subject });
                }
              }
            }
          }
        }
      }
    }

    console.log(`[API] Returning ${allNotes.length} notes`);
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
    await safeWriteJson(REQUESTS_FILE, requests);
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

    const localPath = path.join(NOTES_PATH, subject, `${id}.json`);
    const remotePath = `data/notes/${subject}/${id}.json`;

    await safeWriteJson(localPath, noteData);
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
