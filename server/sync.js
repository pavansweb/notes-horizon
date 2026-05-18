const fs = require('fs-extra');
const path = require('path');
require('dotenv').config();

class GithubSync {
  constructor() {
    this.token = process.env.GITHUB_TOKEN;
    this.repo = process.env.GITHUB_REPO;
    this.branch = process.env.GITHUB_BRANCH || 'main';
    this.apiBase = "https://api.github.com";
  }

  get enabled() {
    return !!(this.token && this.repo);
  }

  get headers() {
    return {
      "Accept": "application/vnd.github+json",
      "Authorization": `Bearer ${this.token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json"
    };
  }

  async getFile(filePath) {
    if (!this.enabled) return null;
    try {
      const url = `${this.apiBase}/repos/${this.repo}/contents/${filePath}?ref=${this.branch}`;
      const res = await fetch(url, { headers: this.headers });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error(`GitHub GET error: ${res.statusText}`);
      const payload = await res.json();
      const content = Buffer.from(payload.content, 'base64').toString('utf-8');
      return { sha: payload.sha, data: JSON.parse(content) };
    } catch (error) {
      console.error(`GitHub Fetch Error (${filePath}):`, error.message);
      return null;
    }
  }

  async putFile(filePath, data, message) {
    if (!this.enabled) return;
    try {
      const existing = await this.getFile(filePath);
      const body = {
        message: message || `Update ${filePath}`,
        content: Buffer.from(JSON.stringify(data, null, 2)).toString('base64'),
        branch: this.branch
      };
      if (existing && existing.sha) {
        body.sha = existing.sha;
      }
      const url = `${this.apiBase}/repos/${this.repo}/contents/${filePath}`;
      const res = await fetch(url, {
        method: 'PUT',
        headers: this.headers,
        body: JSON.stringify(body)
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(`GitHub PUT error: ${err.message}`);
      }
    } catch (error) {
      console.error(`GitHub Save Error (${filePath}):`, error.message);
    }
  }

  async getDirectoryContents(dirPath) {
    if (!this.enabled) return [];
    try {
      const url = `${this.apiBase}/repos/${this.repo}/contents/${dirPath}?ref=${this.branch}`;
      const res = await fetch(url, { headers: this.headers });
      if (res.status === 404) return [];
      if (!res.ok) throw new Error(`GitHub GET DIR error: ${res.statusText}`);
      return await res.json();
    } catch (error) {
      console.error(`GitHub Dir Fetch Error (${dirPath}):`, error.message);
      return [];
    }
  }

  async syncFromRemote(remotePath, localPath) {
    const remote = await this.getFile(remotePath);
    if (remote && remote.data) {
      try {
        await fs.ensureDir(path.dirname(localPath));
        await fs.writeJson(localPath, remote.data, { spaces: 2 });
      } catch (e) {
        console.warn(`Could not cache ${remotePath} locally: ${e.message}`);
      }
      return remote.data;
    }
    if (await fs.pathExists(localPath)) {
      try {
        return await fs.readJson(localPath);
      } catch (e) {
        return null;
      }
    }
    return null;
  }
}

module.exports = new GithubSync();
