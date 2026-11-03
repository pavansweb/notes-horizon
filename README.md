# ⚡ HorizonVault — Next-Gen PDF Cloud Storage & Reader

A modern, high-performance web application designed for storing, organizing, and reading PDF documents securely in the cloud. Powered by **Next.js 16**, **Vercel Blob Storage**, and **Tailwind CSS**.

---

## ✨ Features

- 🚀 **1 GB Free Cloud Storage**: Powered by Vercel Blob with zero credit card required.
- 📁 **Smart Drag & Drop Uploader**: Multi-file queue, real-time progress indicators, and celebratory completion animations.
- 🔍 **Live Search & Quick Shortcuts**: Filter documents by name, content tags, or notes. Press `/` or `Ctrl+K` to search instantly.
- 🏷️ **Categorization & Custom Tags**: Organize documents with tags (`Work`, `Study`, `Finance`, `Personal`, `Invoices`, or custom tags).
- ⭐ **Favorites & Pinning**: One-click star to bookmark important files.
- 👁️ **Full-Screen PDF Viewer**: Native high-fidelity PDF reader with zoom controls, fullscreen mode, notes editor, and direct download.
- 🔗 **Shareable Links**: One-click copy for direct sharing of document URLs.
- 📊 **Real-time Storage Meter**: Interactive visual gauge of storage used, total files, and remaining quota.
- 🗂️ **Grid & Table View Modes**: Switch seamlessly between visual cards and compact tabular layout.
- 🛡️ **Hybrid Storage Fallback**: Runs 100% locally out-of-the-box (`data/uploads`) without requiring API keys, and automatically activates Vercel Blob when deployed!

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Storage**: [@vercel/blob](https://vercel.com/docs/storage/vercel-blob)
- **Effects**: canvas-confetti

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> [!NOTE]
> During local development, if `BLOB_READ_WRITE_TOKEN` is not set in `.env.local`, HorizonVault automatically activates **Local Storage Mode** (`data/uploads/`). You can upload, read, and manage PDFs right away!

---

## ☁️ Deploying to Vercel

### Step 1: Push to GitHub or Deploy via Vercel CLI
```bash
git push origin main
```
or
```bash
npx vercel
```

### Step 2: Attach Vercel Blob Store (1-Click, Free)
1. Go to your project on the [Vercel Dashboard](https://vercel.com/dashboard).
2. Click on the **Storage** tab.
3. Click **Create Database** and select **Blob**.
4. Choose a name (e.g. `horizon-pdf-vault`) and click **Create**.
5. Connect it to your project environment (`Production` and `Preview`).

Vercel will automatically inject `BLOB_READ_WRITE_TOKEN` into your deployment. Any PDF uploaded will now be stored in Vercel Blob!

---

## 📜 License
MIT
