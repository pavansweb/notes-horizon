import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { BookOpen, ChevronRight, Search, Menu, Sun, Moon, Printer, TerminalSquare, X, ListTree, Clock } from 'lucide-react';
import './App.css';

interface NoteMetadata {
  id: string;
  title: string;
  subject: string;
  chapter: string;
}

interface Note extends NoteMetadata {
  content: string;
  lastUpdated: string;
  sources: string[];
}

interface AIRequest {
  id: string;
  subject: string;
  topic: string;
  status: string;
  timestamp: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

const getTextFromChildren = (children: React.ReactNode): string =>
  React.Children.toArray(children)
    .map((child) => {
      if (typeof child === 'string' || typeof child === 'number') return child.toString();
      if (React.isValidElement<{ children?: React.ReactNode }>(child)) return getTextFromChildren(child.props.children);
      return '';
    })
    .join('');

const Logo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="site-logo">
    <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2.5" />
    <path d="M8 16C8 11.5817 11.5817 8 16 8C20.4183 8 24 11.5817 24 16" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M16 16L16 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="16" cy="16" r="3" fill="var(--primary)" />
  </svg>
);

function App() {
  const [notesList, setNotesList] = useState<NoteMetadata[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' ? 'dark' : 'light';
  });
  const [activeSubject, setActiveSubject] = useState('Physics');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal & Dashboard State
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [newTopicInput, setNewTopicInput] = useState('');
  const [pendingRequests, setPendingRequests] = useState<AIRequest[]>([]);
  const [dashboardMessage, setDashboardMessage] = useState('');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const handlePrint = () => {
    window.print();
  };

  const fetchNote = useCallback(async (subject: string, id: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/notes/${encodeURIComponent(subject)}/${encodeURIComponent(id)}`);
      setSelectedNote(response.data);
      setActiveSubject(subject);
      
      // Scroll to top of content area
      const contentArea = document.querySelector('.content-area');
      if (contentArea) contentArea.scrollTop = 0;
      
      if (window.innerWidth <= 768) setSidebarOpen(false); // Auto close on mobile
    } catch (error) {
      console.error('Error fetching note:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchNotesList = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/notes`);
      setNotesList(response.data);
      
      // Initial auto-select
      if (response.data.length > 0 && !selectedNote) {
        const firstNote = response.data.find((n: NoteMetadata) => n.subject === activeSubject);
        if (firstNote) {
          fetchNote(firstNote.subject, firstNote.id);
        }
      }
    } catch (error) {
      console.error('Error fetching notes list:', error);
    }
  }, [fetchNote, selectedNote, activeSubject]);

  useEffect(() => {
    fetchNotesList();
  }, [fetchNotesList]);

  // Handle subject change: Auto-select first note of new subject
  useEffect(() => {
    if (notesList.length > 0) {
      const firstNoteOfSubject = notesList.find(n => n.subject === activeSubject);
      if (firstNoteOfSubject && selectedNote?.subject !== activeSubject) {
        fetchNote(firstNoteOfSubject.subject, firstNoteOfSubject.id);
      }
    }
  }, [activeSubject, notesList, fetchNote, selectedNote]);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/requests`);
      setPendingRequests(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleOpenDashboard = () => {
    setIsDashboardOpen(true);
    fetchRequests();
  };

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicInput.trim()) return;
    try {
      await axios.post(`${API_BASE_URL}/api/generate`, {
        subject: activeSubject,
        topic: newTopicInput
      });
      setNewTopicInput('');
      setDashboardMessage('Topic queued! Tell the Gemini CLI to fulfill pending requests.');
      fetchRequests();
      setTimeout(() => setDashboardMessage(''), 4000);
    } catch (e) {
      console.error(e);
      setDashboardMessage('Failed to queue request.');
    }
  };

  const subjects = ['Physics', 'Chemistry', 'Mathematics', 'JEE Main Syllabus', 'JEE Advanced Syllabus'];
  
  const filteredNotes = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return notesList.filter((note) => {
      const matchesSubject = query ? true : note.subject === activeSubject;
      const matchesSearch = !query || [note.title, note.chapter, note.subject]
        .join(' ')
        .toLowerCase()
        .includes(query);

      return matchesSubject && matchesSearch;
    });
  }, [activeSubject, notesList, searchQuery]);

  const estimatedMinutes = selectedNote ? Math.max(1, Math.ceil(selectedNote.content.split(/\s+/).length / 180)) : 0;
  
  const contentHeadings = useMemo(() => {
    if (!selectedNote) return [];
    return selectedNote.content
      .split('\n')
      .map((line) => {
        const match = /^(#{2,3})\s+(.+)$/.exec(line);
        if (!match) return null;
        const text = match[2].replace(/[*_`$]/g, '').trim();
        return { id: slugify(text), text, level: match[1].length };
      })
      .filter(Boolean) as { id: string; text: string; level: number }[];
  }, [selectedNote]);

  return (
    <div className="app-container">
      <header className="header no-print">
        <div className="logo-section">
          <Menu className="menu-icon" onClick={() => setSidebarOpen(!sidebarOpen)} />
          <div className="logo-container">
            <Logo />
            <h1>Notes Horizon</h1>
          </div>
        </div>
        <div className="search-bar">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search topics, chapters, subjects..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="header-actions">
          <button className="theme-toggle" onClick={handleOpenDashboard} title="AI Auto-Scraper Dashboard">
            <TerminalSquare size={20} />
          </button>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </header>

      <nav className="sub-header no-print">
        <div className="subject-tabs">
          {subjects.map(subject => (
            <div 
              key={subject} 
              className={`subject-nav-item ${activeSubject === subject ? 'active' : ''}`}
              onClick={() => {
                setActiveSubject(subject);
                setSearchQuery('');
              }}
            >
              {subject}
            </div>
          ))}
        </div>
      </nav>

      <div className="main-layout">
        <aside className={`sidebar no-print ${sidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-content">
            <div className="subject-group">
              <h3>{searchQuery.trim() ? 'Search results' : `${activeSubject} ${activeSubject.includes('Syllabus') ? '' : 'Chapters'}`}</h3>
              {filteredNotes.length === 0 ? (
                <p className="no-results">No content found.</p>
              ) : (
                <ul>
                  {filteredNotes.map(note => (
                    <li 
                      key={note.id} 
                      className={selectedNote?.id === note.id ? 'active' : ''}
                      onClick={() => fetchNote(note.subject, note.id)}
                    >
                      <div className="li-content">
                        <ChevronRight size={14} className="chevron" />
                        <span className="note-title">
                          {note.title}
                          {searchQuery.trim() && <small>{note.subject}</small>}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </aside>

        <main className="content-area">
          {loading ? (
            <div className="loader">Loading...</div>
          ) : selectedNote ? (
            <article className="note-content">
              <div className="note-header">
                <div className="note-header-top">
                  <span className="subject-badge">{selectedNote.subject}</span>
                  <div className="note-actions no-print">
                    <button className="export-pdf-btn" onClick={handlePrint}>
                      <Printer size={16} />
                      Export PDF
                    </button>
                  </div>
                </div>
                <h2>{selectedNote.title}</h2>
                <div className="metadata-row">
                  <p className="metadata">Last updated: {new Date(selectedNote.lastUpdated).toLocaleDateString()}</p>
                  <span><Clock size={14} /> {estimatedMinutes} min read</span>
                </div>
              </div>
              {contentHeadings.length > 0 && (
                <nav className="toc no-print" aria-label="Table of contents">
                  <div className="toc-title">
                    <ListTree size={16} />
                    On this note
                  </div>
                  <div className="toc-links">
                    {contentHeadings.map((heading, index) => (
                      <a key={`${heading.id}-${index}`} className={`toc-level-${heading.level}`} href={`#${heading.id}`}>
                        {heading.text}
                      </a>
                    ))}
                  </div>
                </nav>
              )}
              <div className="markdown-body">
                <ReactMarkdown 
                  remarkPlugins={[remarkMath]} 
                  rehypePlugins={[rehypeKatex]}
                  components={{
                    h2: ({ children }) => <h2 id={slugify(getTextFromChildren(children))}>{children}</h2>,
                    h3: ({ children }) => <h3 id={slugify(getTextFromChildren(children))}>{children}</h3>,
                  }}
                >
                  {selectedNote.content}
                </ReactMarkdown>
              </div>
              <footer className="note-footer no-print">
                <h4>Sources:</h4>
                <ul>
                  {selectedNote.sources.map((source, i) => (
                    <li key={i}><a href={source} target="_blank" rel="noreferrer">{source}</a></li>
                  ))}
                </ul>
              </footer>
            </article>
          ) : (
            <div className="empty-state no-print">
              <BookOpen size={48} />
              <p>Select a topic or syllabus to start</p>
            </div>
          )}
        </main>
      </div>

      {isDashboardOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>AI Auto-Scraper Dashboard</h2>
              <button className="close-btn" onClick={() => setIsDashboardOpen(false)}><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="dashboard-info">
                <p>Enter a topic below. The AI will research, format with LaTeX, and inject the notes into your library.</p>
              </div>
              
              <form onSubmit={handleSubmitRequest} className="request-form">
                <div className="form-group">
                  <label>Subject</label>
                  <select value={activeSubject} onChange={(e) => setActiveSubject(e.target.value)}>
                    {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Topic Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Thermodynamics, Organic Chemistry Basics" 
                    value={newTopicInput}
                    onChange={(e) => setNewTopicInput(e.target.value)}
                  />
                </div>
                <button type="submit" className="primary-btn">Queue Generation</button>
              </form>
              
              {dashboardMessage && <div className="dashboard-toast">{dashboardMessage}</div>}

              <div className="pending-requests">
                <h3>Pending Queue ({pendingRequests.length})</h3>
                {pendingRequests.length === 0 ? (
                  <p className="empty-queue">No topics in queue.</p>
                ) : (
                  <ul>
                    {pendingRequests.map(req => (
                      <li key={req.id}>
                        <div className="req-info">
                          <span className="req-subject">{req.subject}</span>
                          <span className="req-topic">{req.topic}</span>
                        </div>
                        <span className={`status-badge ${req.status}`}>{req.status}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
