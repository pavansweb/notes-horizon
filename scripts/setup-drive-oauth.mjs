import http from 'http';
import { URL } from 'url';
import fs from 'fs';
import path from 'path';
import { google } from 'googleapis';

const FOLDER_ID = '1eXLXWr8hpYObemhjwgblnkzpkRlZYEyd';
const clientId = process.argv[2] || process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.argv[3] || process.env.GOOGLE_CLIENT_SECRET;

async function exchangeAndSave(oauth2Client, code) {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  console.log('\n✅ Successfully obtained OAuth tokens!');
  console.log('Refresh token received:', tokens.refresh_token ? 'YES' : 'NO (already authorized earlier)');

  const envPath = path.join(process.cwd(), '.env.local');
  let envContent = '';
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  }

  const varsToAdd = {
    GOOGLE_CLIENT_ID: clientId,
    GOOGLE_CLIENT_SECRET: clientSecret,
    GOOGLE_REFRESH_TOKEN: tokens.refresh_token,
    GOOGLE_DRIVE_FOLDER_ID: FOLDER_ID,
  };

  for (const [key, value] of Object.entries(varsToAdd)) {
    if (!value) continue;
    const regex = new RegExp(`^${key}=.*$`, 'm');
    if (regex.test(envContent)) {
      envContent = envContent.replace(regex, `${key}=${value}`);
    } else {
      envContent += `\n${key}=${value}`;
    }
  }

  fs.writeFileSync(envPath, envContent.trim() + '\n', 'utf8');
  console.log('✅ Saved credentials to .env.local');

  // Test uploading a test file to the user's folder
  console.log('\n🧪 Testing Google Drive upload directly to your 2 TB quota...');
  const drive = google.drive({ version: 'v3', auth: oauth2Client });
  const { Readable } = await import('stream');
  const testFile = await drive.files.create({
    requestBody: {
      name: 'jee-storage-connection-test.txt',
      parents: [FOLDER_ID],
    },
    media: {
      mimeType: 'text/plain',
      body: Readable.from(['Google Drive 2 TB connection successful!']),
    },
    fields: 'id, name, webViewLink',
  });

  console.log('\n========================================');
  console.log('🎉 TEST SUCCESSFUL! File created in your Drive:');
  console.log('Name:', testFile.data.name);
  console.log('ID:', testFile.data.id);
  console.log('View link:', testFile.data.webViewLink);
  console.log('========================================\n');
  return tokens;
}

async function main() {
  const port = 8085;
  const redirectUri = `http://localhost:${port}`;
  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
  });

  console.log('\n========================================');
  console.log('🔗 Click to authorize:');
  console.log(authUrl);
  console.log('========================================\n');

  const server = http.createServer(async (req, res) => {
    try {
      if (!req.url) return;
      const parsedUrl = new URL(req.url, `http://localhost:${port}`);
      const code = parsedUrl.searchParams.get('code');

      if (code) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
          <div style="font-family: system-ui; max-width: 500px; margin: 60px auto; text-align: center; color: #111;">
            <h2 style="color: #10b981;">✅ Authorization Successful!</h2>
            <p>Your Google Drive 2 TB connection has been verified.</p>
            <p>You can close this tab and return to the chat.</p>
          </div>
        `);

        server.close();
        await exchangeAndSave(oauth2Client, code);
        process.exit(0);
      }
    } catch (err) {
      console.error('❌ Error handling auth callback:', err);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Authentication failed: ' + err.message);
      process.exit(1);
    }
  });

  server.listen(port, () => {
    console.log(`OAuth callback server running at http://localhost:${port}`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
