import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import {
  BadgeCheck,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  Copy,
  Eye,
  ListTree,
  Menu,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  PlusCircle,
  Printer,
  Save,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  Sun,
  TerminalSquare,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import './App.css';

interface NoteMetadata {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  order?: number;
}

interface SyllabusChapter {
  title: string;
  topics: string[];
}

interface SyllabusSection {
  subject: string;
  chapters: SyllabusChapter[];
}

interface Note extends NoteMetadata {
  content: string;
  lastUpdated: string;
  sources: string[];
  syllabus?: SyllabusSection[];
}

interface AIRequest {
  id: string;
  subject: string;
  topic: string;
  status: string;
  timestamp: string;
}

const GITHUB_REPO = 'pavansweb/notes-horizon';
const GITHUB_BRANCH = 'main';
const API_BASE_URL = `https://raw.githubusercontent.com/${GITHUB_REPO}/${GITHUB_BRANCH}/data`;
const SUBJECTS = ['Physics', 'Chemistry', 'Mathematics'];
const STORAGE_KEYS = {
  theme: 'notes-horizon-theme',
  favorites: 'notes-horizon-favorites',
  completed: 'notes-horizon-completed',
  fontScale: 'notes-horizon-font-scale',
};

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

const readStoredList = (key: string) => {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : [];
  } catch {
    return [];
  }
};

const noteKey = (note: Pick<NoteMetadata, 'subject' | 'id'>) => `${note.subject}/${note.id}`;

const NOTE_TEMPLATE = (title = '[Title]') => `# ${title}

## Synopsis
[High-level introduction]

## Topic Breakdown
### 1. [Main Topic]
#### 1.1 [Subtopic]

## Formulas & Laws
[LaTeX formulas here, use $...$ for inline and $$...$$ for blocks]

## JEE Focus & Common Traps
[Strategic advice]

## Subject Specifics
[Diagrams for Physics / Simulators for Math]
`;

function App() {
  const [notesList, setNotesList] = useState<NoteMetadata[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isEntryMode, setIsEntryMode] = useState(false);
  const [entryData, setEntryData] = useState({
    title: '',
    chapter: '',
    subject: 'Physics',
    content: '',
    sources: '',
  });
  const [focusMode, setFocusMode] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [fontScale, setFontScale] = useState(() => Number(localStorage.getItem(STORAGE_KEYS.fontScale)) || 1);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.theme) || localStorage.getItem('theme');
    return savedTheme === 'dark' ? 'dark' : 'light';
  });
  const [activeSubject, setActiveSubject] = useState('Physics');
  const [searchQuery, setSearchQuery] = useState('');
  const [syllabusQuery, setSyllabusQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>(() => readStoredList(STORAGE_KEYS.favorites));
  const [completed, setCompleted] = useState<string[]>(() => readStoredList(STORAGE_KEYS.completed));
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [newTopicInput, setNewTopicInput] = useState('');
  const [pendingRequests, setPendingRequests] = useState<AIRequest[]>([]);
  const [dashboardMessage, setDashboardMessage] = useState('');

  const enterEntryMode = useCallback((note: Note | null = null) => {
    setIsEntryMode(true);
    if (note) {
      setEntryData({
        title: note.title,
        chapter: note.chapter,
        subject: note.subject,
        content: note.content,
        sources: note.sources.join(', '),
      });
    } else {
      setEntryData({
        title: '',
        chapter: '',
        subject: activeSubject,
        content: NOTE_TEMPLATE(),
        sources: '',
      });
    }
  }, [activeSubject]);

  const fetchNotesList = useCallback(async () => {
    try {
      const response = await axios.get<NoteMetadata[]>(`${API_BASE_URL}/index.json`);
      setNotesList(
        response.data.sort((a, b) => {
          if (a.subject !== b.subject) return SUBJECTS.indexOf(a.subject) - SUBJECTS.indexOf(b.subject);
          return (a.order || 999) - (b.order || 999) || a.title.localeCompare(b.title);
        }),
      );

      if (response.data.length > 0 && !selectedNote) {
        const firstNote = response.data.find((note) => note.subject === activeSubject) || response.data[0];
        fetchNote(firstNote.subject, firstNote.id);
      }
    } catch (error) {
      console.error('Error fetching notes list:', error);
    }
  }, [activeSubject, selectedNote]); // fetchNote added inside effect or defined before

  const handleSaveNote = async () => {
    if (!entryData.title || !entryData.content) {
      setDashboardMessage('Title and content are required.');
      return;
    }
    try {
      setLoading(true);
      const payload = {
        ...entryData,
        sources: entryData.sources.split(',').map((s) => s.trim()).filter(Boolean),
      };
      const response = await axios.post(`${API_BASE_URL}/api/notes`, payload);
      setDashboardMessage('Note saved successfully!');
      setIsEntryMode(false);
      await fetchNotesList();
      if (response.data.note) {
        setSelectedNote(response.data.note);
      }
      setTimeout(() => setDashboardMessage(''), 3000);
    } catch (error) {
      console.error('Error saving note:', error);
      setDashboardMessage('Failed to save note.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEYS.theme, theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.completed, JSON.stringify(completed));
  }, [completed]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.fontScale, String(fontScale));
  }, [fontScale]);

  useEffect(() => {
    const contentArea = document.querySelector('.content-area');
    if (!contentArea) return;

    const updateProgress = () => {
      const maxScroll = contentArea.scrollHeight - contentArea.clientHeight;
      setReadingProgress(maxScroll > 0 ? Math.round((contentArea.scrollTop / maxScroll) * 100) : 0);
    };

    updateProgress();
    contentArea.addEventListener('scroll', updateProgress);
    return () => contentArea.removeEventListener('scroll', updateProgress);
  }, [selectedNote]);

  const fetchNote = useCallback(async (subject: string, id: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/notes/${encodeURIComponent(subject)}/${encodeURIComponent(id)}`);
      setSelectedNote(response.data);
      setActiveSubject(subject);
      setReadingProgress(0);

      const contentArea = document.querySelector('.content-area');
      if (contentArea) contentArea.scrollTop = 0;

      if (window.innerWidth <= 760) setSidebarOpen(false);
    } catch (error) {
      console.error('Error fetching note:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotesList();
  }, [fetchNotesList]);

  useEffect(() => {
    setSyllabusQuery('');
  }, [selectedNote?.id]);

  useEffect(() => {
    if (notesList.length === 0 || selectedNote?.subject === activeSubject || searchQuery.trim()) return;
    const firstNoteOfSubject = notesList.find((note) => note.subject === activeSubject);
    if (firstNoteOfSubject) fetchNote(firstNoteOfSubject.subject, firstNoteOfSubject.id);
  }, [activeSubject, fetchNote, notesList, searchQuery, selectedNote]);

  const fetchRequests = async () => {
    try {
      const response = await axios.get<AIRequest[]>(`${API_BASE_URL}/requests.json`);
      setPendingRequests(response.data.reverse());
    } catch (error) {
      console.error('Error fetching requests:', error);
      setPendingRequests([]);
    }
  };

  const handleOpenDashboard = () => {
    setIsDashboardOpen(true);
    fetchRequests();
  };

  const handleSubmitRequest = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!newTopicInput.trim()) return;

    setDashboardMessage('Backend removed. Add requests to data/requests.json in GitHub directly.');
    setTimeout(() => setDashboardMessage(''), 4500);
  };

  const subjectCounts = useMemo(
    () =>
      SUBJECTS.reduce<Record<string, number>>((counts, subject) => {
        counts[subject] = notesList.filter((note) => note.subject === subject).length;
        return counts;
      }, {}),
    [notesList],
  );

  const filteredNotes = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return notesList.filter((note) => {
      const matchesSubject = query ? true : note.subject === activeSubject;
      const matchesSearch =
        !query ||
        [note.title, note.chapter, note.subject]
          .join(' ')
          .toLowerCase()
          .includes(query);

      return matchesSubject && matchesSearch;
    });
  }, [activeSubject, notesList, searchQuery]);

  const currentKey = selectedNote ? noteKey(selectedNote) : '';
  const currentIsFavorite = currentKey ? favorites.includes(currentKey) : false;
  const currentIsCompleted = currentKey ? completed.includes(currentKey) : false;
  const completedInSubject = notesList.filter((note) => note.subject === activeSubject && completed.includes(noteKey(note))).length;
  const activeSubjectTotal = subjectCounts[activeSubject] || 0;
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

  const filteredSyllabus = useMemo(() => {
    if (!selectedNote?.syllabus) return [];
    const query = syllabusQuery.trim().toLowerCase();

    return selectedNote.syllabus
      .map((section) => ({
        ...section,
        chapters: section.chapters
          .map((chapter) => {
            const chapterMatches = chapter.title.toLowerCase().includes(query);
            const topics = query
              ? chapter.topics.filter((topic) => chapterMatches || topic.toLowerCase().includes(query))
              : chapter.topics;

            return { ...chapter, topics, chapterMatches };
          })
          .filter((chapter) => !query || chapter.chapterMatches || chapter.topics.length > 0),
      }))
      .filter((section) => section.chapters.length > 0);
  }, [selectedNote, syllabusQuery]);

  const toggleListItem = (key: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter((items) => (items.includes(key) ? items.filter((item) => item !== key) : [...items, key]));
  };

  const copyCurrentLink = async () => {
    if (!selectedNote) return;
    const link = `${window.location.origin}${window.location.pathname}#${slugify(selectedNote.title)}`;
    try {
      await navigator.clipboard.writeText(link);
      setDashboardMessage('Note link copied.');
      setTimeout(() => setDashboardMessage(''), 2200);
    } catch (error) {
      console.error('Clipboard failed:', error);
    }
  };

  return (
    <div className={`app-container ${focusMode ? 'focus-mode' : ''}`}>
      <div className="reading-progress" style={{ width: `${readingProgress}%` }} />

      <header className="header no-print">
        <div className="logo-section">
          <button className="icon-btn menu-button" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle sidebar">
            <Menu size={20} />
          </button>
          <div className="brand-mark">
            <div className="brand-icon">
              <BookOpen size={20} />
            </div>
            <div>
              <h1>Notes Horizon</h1>
              <span>JEE study workspace</span>
            </div>
          </div>
        </div>

        <label className="search-bar">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search topics, chapters, subjects"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </label>

        <div className="header-actions">
          <button className="icon-btn" onClick={() => enterEntryMode()} title="Create new note">
            <PlusCircle size={19} />
          </button>
          <button className="icon-btn" onClick={handleOpenDashboard} title="Generation queue" aria-label="Generation queue">
            <TerminalSquare size={19} />
          </button>
          <button className="icon-btn" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} title="Toggle theme" aria-label="Toggle theme">
            {theme === 'light' ? <Moon size={19} /> : <Sun size={19} />}
          </button>
        </div>
      </header>

      <nav className="subject-rail no-print" aria-label="Subjects">
        {SUBJECTS.map((subject) => (
          <button
            key={subject}
            className={`subject-pill ${activeSubject === subject ? 'active' : ''}`}
            onClick={() => {
              setActiveSubject(subject);
              setSearchQuery('');
            }}
          >
            <span>{subject}</span>
            <strong>{subjectCounts[subject] || 0}</strong>
          </button>
        ))}
      </nav>

      <div className="main-layout">
        <aside className={`sidebar no-print ${sidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-panel">
            <section className="study-overview">
              <div>
                <span>Current subject</span>
                <strong>{activeSubject}</strong>
              </div>
              <div className="overview-grid">
                <div>
                  <BookOpen size={16} />
                  <strong>{activeSubjectTotal}</strong>
                  <span>notes</span>
                </div>
                <div>
                  <CheckCircle2 size={16} />
                  <strong>{completedInSubject}</strong>
                  <span>done</span>
                </div>
                <div>
                  <Star size={16} />
                  <strong>{favorites.length}</strong>
                  <span>saved</span>
                </div>
              </div>
            </section>

            <div className="sidebar-heading">
              <div>
                <span>{searchQuery.trim() ? 'Search results' : 'Library'}</span>
                <strong>{filteredNotes.length} items</strong>
              </div>
              <button className="icon-btn compact" onClick={() => setSidebarOpen(false)} aria-label="Collapse sidebar">
                <PanelLeftClose size={17} />
              </button>
            </div>

            {filteredNotes.length === 0 ? (
              <p className="no-results">No matching notes found.</p>
            ) : (
              <ul className="note-list">
                {filteredNotes.map((note) => {
                  const key = noteKey(note);
                  return (
                    <li key={key}>
                      <button className={`note-row ${selectedNote?.id === note.id ? 'active' : ''}`} onClick={() => fetchNote(note.subject, note.id)}>
                        <ChevronRight size={15} className="chevron" />
                        <span>
                          <strong>{note.title}</strong>
                          <small>{searchQuery.trim() ? note.subject : note.chapter}</small>
                        </span>
                        <span className="note-state">
                          {favorites.includes(key) && <Star size={13} />}
                          {completed.includes(key) && <BadgeCheck size={14} />}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </aside>

        {!sidebarOpen && (
          <button className="sidebar-reopen no-print" onClick={() => setSidebarOpen(true)} aria-label="Open sidebar">
            <PanelLeftOpen size={18} />
          </button>
        )}

        <main className="content-area">
          {loading ? (
            <div className="loader">
              <Sparkles size={32} />
              <p>Loading note...</p>
            </div>
          ) : isEntryMode ? (
            <div className="entry-form-container">
              <div className="entry-header">
                <div>
                  <span>Note Editor</span>
                  <h2>{entryData.title || 'Untitled Note'}</h2>
                </div>
                <button className="icon-btn" onClick={() => setIsEntryMode(false)} aria-label="Close editor">
                  <X size={20} />
                </button>
              </div>
              <div className="entry-grid">
                <div className="form-row">
                  <label className="form-group">
                    <span>Subject</span>
                    <select
                      value={entryData.subject}
                      onChange={(e) => setEntryData({ ...entryData, subject: e.target.value })}
                    >
                      {SUBJECTS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="form-group">
                    <span>Chapter</span>
                    <input
                      type="text"
                      value={entryData.chapter}
                      placeholder="e.g. Mechanics"
                      onChange={(e) => setEntryData({ ...entryData, chapter: e.target.value })}
                    />
                  </label>
                </div>
                <label className="form-group">
                  <span>Title</span>
                  <input
                    type="text"
                    value={entryData.title}
                    placeholder="Note Title"
                    onChange={(e) => setEntryData({ ...entryData, title: e.target.value })}
                  />
                </label>
                <label className="form-group">
                  <span>Content (Markdown + LaTeX)</span>
                  <textarea
                    className="content-editor"
                    value={entryData.content}
                    onChange={(e) => setEntryData({ ...entryData, content: e.target.value })}
                    placeholder="Write your note here..."
                  />
                </label>
                <label className="form-group">
                  <span>Sources (comma separated)</span>
                  <input
                    type="text"
                    value={entryData.sources}
                    placeholder="https://example.com, https://another.com"
                    onChange={(e) => setEntryData({ ...entryData, sources: e.target.value })}
                  />
                </label>
              </div>
              <div className="entry-actions">
                <button className="tool-button" onClick={() => setIsEntryMode(false)}>
                  Cancel
                </button>
                <button className="primary-btn" onClick={handleSaveNote}>
                  <Save size={18} />
                  Save Note
                </button>
              </div>
            </div>
          ) : selectedNote ? (
            <article className="note-content" style={{ '--note-font-scale': fontScale } as React.CSSProperties}>
              <div className="note-toolbar no-print">
                <div className="toolbar-group">
                  <button className="tool-button" onClick={() => enterEntryMode(selectedNote)}>
                    <SlidersHorizontal size={16} />
                    Edit
                  </button>
                  <button className={`tool-button ${currentIsFavorite ? 'active' : ''}`} onClick={() => toggleListItem(currentKey, setFavorites)}>
                    <Star size={16} />
                    Save
                  </button>
                  <button className={`tool-button ${currentIsCompleted ? 'active success' : ''}`} onClick={() => toggleListItem(currentKey, setCompleted)}>
                    <CheckCircle2 size={16} />
                    Done
                  </button>
                  <button className="tool-button" onClick={copyCurrentLink}>
                    <Copy size={16} />
                    Copy
                  </button>
                </div>
                <div className="toolbar-group">
                  <button className="icon-btn compact" onClick={() => setFontScale(Math.max(0.9, Number((fontScale - 0.05).toFixed(2))))} aria-label="Decrease text size">
                    <ZoomOut size={17} />
                  </button>
                  <button className="icon-btn compact" onClick={() => setFontScale(Math.min(1.2, Number((fontScale + 0.05).toFixed(2))))} aria-label="Increase text size">
                    <ZoomIn size={17} />
                  </button>
                  <button className="icon-btn compact" onClick={() => setFocusMode(!focusMode)} aria-label="Focus mode">
                    <Eye size={17} />
                  </button>
                  <button className="icon-btn compact" onClick={() => window.print()} aria-label="Export PDF">
                    <Printer size={17} />
                  </button>
                </div>
              </div>

              <header className="note-header">
                <div className="note-kicker">
                  <span>{selectedNote.subject}</span>
                  <span>{selectedNote.chapter}</span>
                </div>
                <h2 id={slugify(selectedNote.title)}>{selectedNote.title}</h2>
                <div className="metadata-row">
                  <span>
                    <Clock size={14} /> {estimatedMinutes} min read
                  </span>
                  <span>Updated {new Date(selectedNote.lastUpdated).toLocaleDateString()}</span>
                  <span>{readingProgress}% read</span>
                </div>
              </header>

              {selectedNote.syllabus ? (
                <section className="syllabus-browser no-print">
                  <label className="syllabus-search">
                    <Search size={18} />
                    <input
                      type="text"
                      placeholder="Search chapter or topic in this syllabus"
                      value={syllabusQuery}
                      onChange={(event) => setSyllabusQuery(event.target.value)}
                    />
                  </label>
                  <div className="syllabus-summary">
                    <span>{filteredSyllabus.reduce((total, section) => total + section.chapters.length, 0)} chapters shown</span>
                    <span>{filteredSyllabus.reduce((total, section) => total + section.chapters.reduce((sum, chapter) => sum + chapter.topics.length, 0), 0)} topics</span>
                  </div>
                </section>
              ) : contentHeadings.length > 0 ? (
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
              ) : null}

              {selectedNote.syllabus ? (
                <div className="syllabus-content">
                  <div className="markdown-body syllabus-intro">
                    <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                      {selectedNote.content}
                    </ReactMarkdown>
                  </div>
                  {filteredSyllabus.length === 0 ? (
                    <p className="no-results">No chapter or topic matches this search.</p>
                  ) : (
                    filteredSyllabus.map((section) => (
                      <section className="syllabus-section" key={section.subject}>
                        <h3>{section.subject}</h3>
                        <div className="chapter-accordion">
                          {section.chapters.map((chapter, index) => (
                            <details key={`${section.subject}-${chapter.title}`} className="chapter-card" open={Boolean(syllabusQuery.trim()) || index === 0}>
                              <summary>
                                <span>{chapter.title}</span>
                                <strong>{chapter.topics.length} topics</strong>
                              </summary>
                              <ul>
                                {chapter.topics.map((topic) => (
                                  <li key={topic}>{topic}</li>
                                ))}
                              </ul>
                            </details>
                          ))}
                        </div>
                      </section>
                    ))
                  )}
                </div>
              ) : (
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
              )}

              <footer className="note-footer no-print">
                <h4>Sources</h4>
                <ul>
                  {selectedNote.sources.map((source, index) => (
                    <li key={`${source}-${index}`}>
                      <a href={source} target="_blank" rel="noreferrer">
                        {source}
                      </a>
                    </li>
                  ))}
                </ul>
              </footer>
            </article>
          ) : (
            <div className="empty-state no-print">
              <BookOpen size={48} />
              <p>Select a note to start studying.</p>
            </div>
          )}
        </main>
      </div>

      {dashboardMessage && <div className="global-toast no-print">{dashboardMessage}</div>}

      {isDashboardOpen && (
        <div className="modal-overlay no-print">
          <div className="modal-content">
            <div className="modal-header">
              <div>
                <span>Generation queue</span>
                <h2>Request a new note</h2>
              </div>
              <button className="icon-btn compact" onClick={() => setIsDashboardOpen(false)} aria-label="Close dashboard">
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="dashboard-info">
                <SlidersHorizontal size={18} />
                <p>Queue topics for the local note generator, then refresh the library when generation is complete.</p>
              </div>

              <form onSubmit={handleSubmitRequest} className="request-form">
                <label className="form-group">
                  <span>Subject</span>
                  <select value={activeSubject} onChange={(event) => setActiveSubject(event.target.value)}>
                    {SUBJECTS.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="form-group">
                  <span>Topic name</span>
                  <input
                    type="text"
                    placeholder="e.g. Rotational motion"
                    value={newTopicInput}
                    onChange={(event) => setNewTopicInput(event.target.value)}
                  />
                </label>
                <button type="submit" className="primary-btn">
                  <Sparkles size={17} />
                  Queue generation
                </button>
              </form>

              <section className="pending-requests">
                <div className="queue-heading">
                  <h3>Pending queue</h3>
                  <span>{pendingRequests.length}</span>
                </div>
                {pendingRequests.length === 0 ? (
                  <p className="empty-queue">No topics in queue.</p>
                ) : (
                  <ul>
                    {pendingRequests.map((request) => (
                      <li key={request.id}>
                        <div className="req-info">
                          <span className="req-subject">{request.subject}</span>
                          <span className="req-topic">{request.topic}</span>
                        </div>
                        <span className={`status-badge ${request.status}`}>{request.status}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
