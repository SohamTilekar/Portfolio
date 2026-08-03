# Soham Tilekar | Systems & AI Engineer Portfolio

This is my personal professional portfolio website and **Local Resume Studio**, showcasing my work in systems programming, compiler design, kernel development, hardware architecture, and agentic AI.

---

## ⚡ Key Features

- **Personal Portfolio Showcase:** High-impact Neo-Brutalist design featuring projects, terminal UIs, compiler architecture, and background.
- **Local Resume Studio (`server.py`):** Dedicated local Python backend server running at `http://localhost:8000/`.
  - **Live Real-Time Split-Screen Preview:** See your resume render instantly as you type.
  - **Multiple ATS Templates:** Switch live between `Modern`, `Minimal`, and `Creative` styles.
  - **Dynamic Sections:** Add custom contact links, skill categories, featured projects, work experience, and education blocks dynamically.
  - **Auto-Slugification:** Automatically slugifies Resume Titles into clean folder names.
- **Static GitHub Pages Deployment (`gh-pages`):**
  - When pushed to GitHub Pages, the site operates purely as a clean, read-only static portfolio.
  - No resume builder or server controls are exposed publicly to GitHub Pages visitors.

---

## 🛠️ Local Development & Resume Studio

### 1. Launching the Local Resume Studio
Run the zero-dependency Python server:
```bash
python3 server.py
```
Open **`http://localhost:8000/`** in your browser to launch the **Local Resume Studio Dashboard**.

### 2. Generating a Local Resume
1. In the Studio Dashboard, enter your Resume Title (e.g. `Systems & Compiler Engineer`).
2. Pick a template style (`Modern`, `Minimal`, or `Creative`).
3. Fill out or pre-fill candidate details, dynamic contact links, technical skills, projects, and experience.
4. Watch the real-time live HTML render in the right panel.
5. Click **`⚡ Generate Local Resume`**. The server renders the HTML/CSS in `Resume/<folder_slug>/resume.html` and automatically registers the new card in `resume.html`.

### 3. Deploying New Resumes to GitHub Pages
To publish your new resumes to GitHub Pages:
```bash
git add .
git commit -m "Add new targeted resume version"
git push origin main
```

---

## 🏗️ Production Build & Webpack

If developing frontend React components:
```bash
# Install dependencies
npm install

# Run Webpack dev server
npm start

# Build static production bundle
npm run build
```

---

## 🌐 Deployment & Hosting

### GitHub Pages
Deploy static build:
```bash
npm run deploy
```

---
Built with <3 by **Soham Tilekar**
