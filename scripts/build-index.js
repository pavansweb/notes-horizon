import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '..', 'data', 'notes');
const indexPath = path.join(__dirname, '..', 'data', 'index.json');

function buildIndex() {
  const allNotes = [];
  
  function processDir(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        processDir(fullPath);
      } else if (file.endsWith('.md')) {
        const fileContent = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContent);
        
        // Push metadata to index
        allNotes.push({
          id: data.id || file.replace('.md', ''),
          title: data.title || 'Untitled',
          subject: data.subject || path.basename(path.dirname(fullPath)),
          chapter: data.chapter || '',
          lastUpdated: data.lastUpdated || new Date().toISOString(),
          order: data.order || 999
        });
      }
    }
  }

  processDir(dataDir);
  
  fs.writeFileSync(indexPath, JSON.stringify(allNotes, null, 2));
  console.log(`Index built successfully with ${allNotes.length} notes.`);
}

buildIndex();
