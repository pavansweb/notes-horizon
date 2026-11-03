import fs from 'fs';
import path from 'path';
import { google } from 'googleapis';

const SOURCE_DIR = '/home/zen/Projects/Jee-main/pw resources';
const ROOT_FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID || '1eXLXWr8hpYObemhjwgblnkzpkRlZYEyd';
const CACHE_FILE = path.join(process.cwd(), '.upload-cache.json');

function inferTags(relPath) {
  const lower = relPath.toLowerCase();
  const tags = new Set();

  if (lower.includes('physics')) tags.add('Physics');
  if (lower.includes('chemistry')) tags.add('Chemistry');
  if (lower.includes('maths') || lower.includes('mathematics')) tags.add('Maths');

  if (lower.includes('short note') || lower.includes('notes')) tags.add('Notes');
  if (lower.includes('formula')) tags.add('Formula Sheet');
  if (lower.includes('pyq') || lower.includes('2026 qs') || lower.includes('top 100 qs')) tags.add('PYQs');
  if (lower.includes('mock') || lower.includes('test')) tags.add('Mock Tests');
  if (lower.includes('mindmap')) tags.add('Mindmaps');
  if (lower.includes('syllabus')) tags.add('Syllabus');
  if (lower.includes('teacher kit')) tags.add('Teacher Kits');

  // If no subject detected, default based on filename or General
  if (!tags.has('Physics') && !tags.has('Chemistry') && !tags.has('Maths')) {
    if (lower.includes('phy')) tags.add('Physics');
    else if (lower.includes('chem')) tags.add('Chemistry');
    else if (lower.includes('math')) tags.add('Maths');
  }

  return Array.from(tags);
}

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    if (file.startsWith('.')) continue; // ignore hidden files
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else if (file.toLowerCase().endsWith('.pdf')) {
      arrayOfFiles.push(fullPath);
    }
  }

  return arrayOfFiles;
}

async function getOrCreateFolder(drive, folderName, parentId, folderCache) {
  const cacheKey = `${parentId}/${folderName}`;
  if (folderCache[cacheKey]) return folderCache[cacheKey];

  // Check if folder already exists in parent
  const res = await drive.files.list({
    q: `'${parentId}' in parents and name = '${folderName.replace(/'/g, "\\'")}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
    fields: 'files(id, name)',
    pageSize: 1,
  });

  if (res.data.files && res.data.files.length > 0) {
    const existingId = res.data.files[0].id;
    folderCache[cacheKey] = existingId;
    return existingId;
  }

  // Create folder
  const folder = await drive.files.create({
    requestBody: {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [parentId],
    },
    fields: 'id',
  });

  folderCache[cacheKey] = folder.data.id;
  return folder.data.id;
}

async function main() {
  console.log(`Scanning source folder: ${SOURCE_DIR} ...`);
  const allPdfFiles = getAllFiles(SOURCE_DIR);
  console.log(`Found ${allPdfFiles.length} PDF files.`);

  // Load cache
  let cache = {};
  if (fs.existsSync(CACHE_FILE)) {
    try {
      cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
    } catch {
      cache = {};
    }
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

  const drive = google.drive({ version: 'v3', auth: oauth2Client });
  const folderCache = cache.folders || {};

  const toUpload = allPdfFiles.filter((filePath) => !cache.files || !cache.files[filePath]);
  console.log(`Pending uploads: ${toUpload.length} (Already uploaded: ${allPdfFiles.length - toUpload.length})`);

  cache.folders = folderCache;
  cache.files = cache.files || {};

  let completed = allPdfFiles.length - toUpload.length;
  const startTime = Date.now();

  for (let i = 0; i < toUpload.length; i++) {
    const filePath = toUpload[i];
    const relPath = path.relative(SOURCE_DIR, filePath);
    const filename = path.basename(filePath);
    const tags = inferTags(relPath);
    const pathParts = path.dirname(relPath).split(path.sep).filter((p) => p && p !== '.');

    try {
      // Traverse/create folder hierarchy in Drive
      let currentParentId = ROOT_FOLDER_ID;
      for (const part of pathParts) {
        currentParentId = await getOrCreateFolder(drive, part, currentParentId, folderCache);
      }

      // Upload file with resumable stream
      const fileStream = fs.createReadStream(filePath);
      const metaPayload = JSON.stringify({
        tags,
        notes: `Relative path: ${relPath}`,
        originalName: filename,
        category: tags[0] || 'General',
      });

      const response = await drive.files.create({
        requestBody: {
          name: filename,
          mimeType: 'application/pdf',
          parents: [currentParentId],
          description: metaPayload,
          appProperties: {
            app: 'jee-resources',
          },
        },
        media: {
          mimeType: 'application/pdf',
          body: fileStream,
        },
        fields: 'id, name, size',
      });

      completed++;
      cache.files[filePath] = {
        id: response.data.id,
        name: filename,
        relPath,
        tags,
        uploadedAt: new Date().toISOString(),
      };

      // Periodic save cache
      if (completed % 10 === 0 || i === toUpload.length - 1) {
        fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf8');
      }

      const elapsedSec = ((Date.now() - startTime) / 1000).toFixed(1);
      const pct = ((completed / allPdfFiles.length) * 100).toFixed(1);
      console.log(`[${completed}/${allPdfFiles.length}] (${pct}%) Uploaded: ${filename} (Tags: ${tags.join(', ')}) [${elapsedSec}s]`);
    } catch (err) {
      console.error(`❌ Failed to upload ${relPath}:`, err.message);
      // Wait 3 seconds on error (in case of rate limit)
      await new Promise((r) => setTimeout(r, 3000));
    }
  }

  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf8');
  console.log(`\n🎉 Bulk upload completed! All ${completed} files uploaded to Google Drive.`);
}

main().catch((err) => {
  console.error('Fatal error in bulk upload:', err);
  process.exit(1);
});
