# Notes Horizon - JEE Preparation Platform

## Overview
A web application designed to display high-quality JEE (Joint Entrance Examination) notes. The content is primarily AI-generated/synthesized from web searches and stored as structured JSON/Markdown.

## Architecture
- **Frontend:** React (TypeScript) + Vite + Vanilla CSS.
- **Backend:** Node.js + Express + Mongoose.
- **Storage:** MongoDB Atlas (Persistent NoSQL storage).

## Data Structure
Notes are stored in MongoDB with the following schema:
```json
{
  "id": "slug-string",
  "title": "Topic Title",
  "subject": "Physics | Chemistry | Mathematics",
  "chapter": "Chapter Name",
  "content": "Markdown content with LaTeX support ($...$ for inline, $$...$$ for blocks)",
  "lastUpdated": "Date Object",
  "sources": ["URL1", "URL2"],
  "order": 999
}
```

## AI Instructions for Content Generation
1. **Research:** Use web search to find authoritative JEE resources (NCERT, coaching materials, etc.).
2. **Synthesis:** Create comprehensive, exam-oriented notes using a hierarchical structure.
3. **Structure:**
    - **# Title**
    - **## Synopsis**: A high-level introduction to the chapter.
    - **## Topic Breakdown**: Nested headers (###, ####) covering every major and minor concept.
    - **## Formulas & Laws**: All mathematical and chemical expressions MUST use LaTeX ($...$ or $$...$$).
    - **## JEE Focus & Common Traps**: Strategic advice for the exam.
    - **## Subject Specifics**:
        - **Physics**: Include a "Diagrams" section with descriptive placeholders or Mermaid diagrams.
        - **Mathematics (Coordinate Geometry)**: Include a "Simulators" section with descriptions or links to interactive tools like Desmos/GeoGebra.
4. **Formatting:** Use Markdown and LaTeX exclusively for technical content.
5. **Storage:** Save to MongoDB collection `notes` via the API or Mongoose model.

## Development Roadmap
- [ ] Phase 1: Basic Scaffolding (Server & Client)
- [ ] Phase 2: Content Injection (AI Scraper/Generator)
- [ ] Phase 3: Advanced UI (LaTeX rendering, Search, Categorization)
- [ ] Phase 4: User features (Bookmarks, Progress tracking)
