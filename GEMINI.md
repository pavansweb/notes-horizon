# Notes Horizon - JEE Preparation Platform

## Overview
A web application designed to display high-quality JEE (Joint Entrance Examination) notes. The content is primarily AI-generated/synthesized from web searches and stored as structured JSON/Markdown.

## Architecture
- **Frontend:** React (TypeScript) + Vite + Vanilla CSS.
- **Backend:** Node.js + Express.
- **Storage:** Local JSON files in `server/data/notes/` for maximum portability and AI-readability.

## Data Structure
Notes are stored in JSON format with the following schema:
```json
{
  "id": "slug-string",
  "title": "Topic Title",
  "subject": "Physics | Chemistry | Mathematics",
  "chapter": "Chapter Name",
  "content": "Markdown content with LaTeX support ($...$ for inline, $$...$$ for blocks)",
  "lastUpdated": "ISO Timestamp",
  "sources": ["URL1", "URL2"]
}
```

## AI Instructions for Content Generation
1. **Research:** Use web search to find authoritative JEE resources (NCERT, coaching materials, etc.).
2. **Synthesis:** Create comprehensive, exam-oriented notes.
3. **Formatting:** Use Markdown. Always use LaTeX for mathematical formulas and chemical equations.
4. **Storage:** Save the output as a new JSON file in `server/data/notes/{subject}/{id}.json`.

## Development Roadmap
- [ ] Phase 1: Basic Scaffolding (Server & Client)
- [ ] Phase 2: Content Injection (AI Scraper/Generator)
- [ ] Phase 3: Advanced UI (LaTeX rendering, Search, Categorization)
- [ ] Phase 4: User features (Bookmarks, Progress tracking)
