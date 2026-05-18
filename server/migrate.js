const mongoose = require('mongoose');
const fs = require('fs-extra');
const path = require('path');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
const NOTES_PATH = path.join(__dirname, 'data', 'notes');
const REQUESTS_PATH = path.join(__dirname, 'data', 'requests.json');

if (!MONGODB_URI) {
  console.error('Error: MONGODB_URI is not defined in .env');
  process.exit(1);
}

// Schemas
const noteSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  subject: { type: String, required: true },
  chapter: { type: String, default: 'General' },
  content: { type: String, required: true },
  lastUpdated: { type: Date, default: Date.now },
  sources: [String],
  order: { type: Number, default: 999 }
});

const requestSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  subject: { type: String, required: true },
  topic: { type: String, required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  timestamp: { type: Date, default: Date.now }
});

const Note = mongoose.model('Note', noteSchema);
const Request = mongoose.model('Request', requestSchema);

async function migrate() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Migrate Notes
    if (await fs.pathExists(NOTES_PATH)) {
      const subjects = await fs.readdir(NOTES_PATH);
      for (const subject of subjects) {
        const subjectPath = path.join(NOTES_PATH, subject);
        if ((await fs.stat(subjectPath)).isDirectory()) {
          const files = await fs.readdir(subjectPath);
          for (const file of files) {
            if (file.endsWith('.json')) {
              const noteData = await fs.readJson(path.join(subjectPath, file));
              await Note.findOneAndUpdate(
                { id: noteData.id },
                { ...noteData, subject },
                { upsert: true }
              );
              console.log(`Migrated note: ${noteData.id}`);
            }
          }
        }
      }
    }

    // Migrate Requests
    if (await fs.pathExists(REQUESTS_PATH)) {
      const requests = await fs.readJson(REQUESTS_PATH);
      for (const req of requests) {
        await Request.findOneAndUpdate(
          { id: req.id },
          req,
          { upsert: true }
        );
        console.log(`Migrated request: ${req.id}`);
      }
    }

    console.log('Migration complete!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate();
