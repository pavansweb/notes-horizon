import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const DATA_DIR = path.join(__dirname, '..', 'data');

// Serve index.json
app.get('/index.json', (req, res) => {
  const indexPath = path.join(DATA_DIR, 'index.json');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).json({ error: 'index.json not found' });
  }
});

// Serve individual notes
app.get('/api/notes/:subject/:id', (req, res) => {
  const { subject, id } = req.params;
  const notePath = path.join(DATA_DIR, 'notes', subject, `${id}.md`);

  if (fs.existsSync(notePath)) {
    const fileContent = fs.readFileSync(notePath, 'utf8');
    const { data, content } = matter(fileContent);
    res.json({
      ...data,
      content,
      id,
      subject,
      lastUpdated: data.lastUpdated || fs.statSync(notePath).mtime
    });
  } else {
    res.status(404).json({ error: 'Note not found' });
  }
});

// Mock for requests.json
app.get('/requests.json', (req, res) => {
  const requestsPath = path.join(DATA_DIR, 'requests.json');
  if (fs.existsSync(requestsPath)) {
    res.sendFile(requestsPath);
  } else {
    res.json([]);
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
