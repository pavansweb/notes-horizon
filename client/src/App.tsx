import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { BookOpen, ChevronRight, Search, Menu, Sun, Moon, Star, CheckCircle, Printer, TerminalSquare, X } from 'lucide-react';
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
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeSubject, setActiveSubject] = useState('Physics');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal & Dashboard State
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [newTopicInput, setNewTopicInput] = useState('');
  const [pendingRequests, setPendingRequests] = useState<AIRequest[]>([]);
  const [dashboardMessage, setDashboardMessage] = useState('');

  // User Data State
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  const [readNotes, setReadNotes] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchNotesList();
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
    
    // Load user data
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    const savedReadNotes = JSON.parse(localStorage.getItem('readNotes') || '[]');
    setBookmarks(new Set(savedBookmarks));
    setReadNotes(new Set(savedReadNotes));
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleBookmark = (id: string) => {
    const newBookmarks = new Set(bookmarks);
    if (newBookmarks.has(id)) newBookmarks.delete(id);
    else newBookmarks.add(id);
    setBookmarks(newBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(Array.from(newBookmarks)));
  };

  const toggleReadStatus = (id: string) => {
    const newReadNotes = new Set(readNotes);
    if (newReadNotes.has(id)) newReadNotes.delete(id);
    else newReadNotes.add(id);
    setReadNotes(newReadNotes);
    localStorage.setItem('readNotes', JSON.stringify(Array.from(newReadNotes)));
  };

  const handlePrint = () => {
    window.print();
  };

  const fetchNotesList = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/notes');
      setNotesList(response.data);
      // Auto-select first note if none selected
      if (response.data.length > 0 && !selectedNote) {
        const firstPhysicsNote = response.data.find((n: NoteMetadata) => n.subject === 'Physics');
        if (firstPhysicsNote) {
          fetchNote(firstPhysicsNote.subject, firstPhysicsNote.id);
        }
      }
    } catch (error) {
      console.error('Error fetching notes list:', error);
    }
  };

  const fetchNote = async (subject: string, id: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/notes/${subject}/${id}`);
      setSelectedNote(response.data);
      if (window.innerWidth <= 768) setSidebarOpen(false); // Auto close on mobile
    } catch (error) {
      console.error('Error fetching note:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/requests');
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
      await axios.post('http://localhost:5000/api/generate', {
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
  
  const filteredNotes = notesList.filter(n => 
    n.subject === activeSubject && 
    n.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate progress for subjects only
  const isSyllabus = activeSubject.includes('Syllabus');
  const subjectNotesCount = notesList.filter(n => n.subject === activeSubject).length;
  const readSubjectNotesCount = notesList.filter(n => n.subject === activeSubject && readNotes.has(n.id)).length;
  const progressPercentage = subjectNotesCount > 0 ? Math.round((readSubjectNotesCount / subjectNotesCount) * 100) : 0;

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
            placeholder="Search topics..." 
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
        {!isSyllabus && (
          <div className="progress-container">
            <span className="progress-text">{progressPercentage}% Completed</span>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: `${progressPercentage}%` }}></div>
            </div>
          </div>
        )}
      </nav>

      <div className="main-layout">
        <aside className={`sidebar no-print ${sidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-content">
            <div className="subject-group">
              <h3>{activeSubject} {isSyllabus ? '' : 'Chapters'}</h3>
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
                        <span className="note-title">{note.title}</span>
                      </div>
                      {!isSyllabus && (
                        <div className="li-icons">
                          {bookmarks.has(note.id) && <Star size={14} className="icon-star" fill="currentColor" />}
                          {readNotes.has(note.id) && <CheckCircle size={14} className="icon-check" />}
                        </div>
                      )}
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
                    {!isSyllabus && (
                      <>
                        <button 
                          className={`action-btn ${bookmarks.has(selectedNote.id) ? 'active-star' : ''}`}
                          onClick={() => toggleBookmark(selectedNote.id)}
                          title="Bookmark"
                        >
                          <Star size={18} fill={bookmarks.has(selectedNote.id) ? "currentColor" : "none"} />
                        </button>
                        <button 
                          className={`action-btn ${readNotes.has(selectedNote.id) ? 'active-check' : ''}`}
                          onClick={() => toggleReadStatus(selectedNote.id)}
                          title="Mark as Read"
                        >
                          <CheckCircle size={18} />
                        </button>
                      </>
                    )}
                    <button className="export-pdf-btn" onClick={handlePrint}>
                      <Printer size={16} />
                      Export PDF
                    </button>
                  </div>
                </div>
                <h2>{selectedNote.title}</h2>
                <p className="metadata">Last updated: {new Date(selectedNote.lastUpdated).toLocaleDateString()}</p>
              </div>
              <div className="markdown-body">
                <ReactMarkdown 
                  remarkPlugins={[remarkMath]} 
                  rehypePlugins={[rehypeKatex]}
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

