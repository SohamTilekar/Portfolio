---
name: resume-builder
description: Generates, formats, and updates technical resumes specifically optimized for Applicant Tracking Systems (ATS) and tech industry hiring standards by directly generating resume files and updating the portfolio showcase registry.
---

# Resume Builder Skill

You are an expert technical recruiter, career coach, and resume writer. When the user asks you (the AI Agent) to "build a resume", "format my resume", "update my resume", or "create an ATS resume", follow these guidelines rigorously. 

Since you operate directly on the codebase via file tools, you will generate resume files and update the portfolio showcase directly in the file system.

---

## Part 1: Sourcing Candidate Profile & Context

1. **Ask for Target Role Context:** Ask the user for the targeted role, company, or job description.
2. **Analyze Candidate Strengths:** Extract all relevant technical skills, systems projects, work experience, achievements, and education.

---

## Part 2: Structural Anatomy of a Perfect One-Page Resume

Organize the page into six distinct, logical sections in a **single-column, top-to-bottom layout**:

### 1. The Header
- **Name:** Prominent, bold, at the absolute top.
- **Location:** City, State/Country only.
- **Contact:** Professional Email and Phone Number.
- **Dynamic Hyperlinks:** Clickable links to LinkedIn, GitHub, Portfolio, LeetCode, or custom profiles.

### 2. Professional Summary
A 2 to 4-line introductory statement detailing Core Focus Area, Key Technologies, and Quantitative Impact (avoid generic hype).

### 3. Technical Skills
Organize skills by dynamic categories (e.g. `Languages & Core`, `Systems & Frameworks`, `Cloud & DevOps`, `Databases`).

### 4. Professional Experience
- *Line 1:* `Role | Organization` (Left Aligned) | `Duration` (Right Aligned)
- *Line 2:* `Location` (Left Aligned, Italicized)
- Bullet points formatted with the **XYZ Formula**: Accomplished [X], as measured by [Y], by doing [Z].

### 5. Projects
Limit to 3–4 high-impact projects. Include Project Title, GitHub Link, Tech Stack, and 2-3 Bullet Points detailing architecture, scale, and performance metrics.

### 6. Education & Certifications
Degree, Institution, Dates, and details (CGPA if >= 7.5/10.0).

---

## Part 3: Templates Available

Choose the template that best matches the target role:
- **`modern`** (Located in `templates/modern/`): Sleek Inter font with professional indigo accents.
- **`minimal`** (Located in `templates/minimal/`): Clean, high-density ATS layout with dark headers.
- **`creative`** (Located in `templates/creative/`): Modern Outfit font with custom header borders and slate accents.

---

## Part 4: File System Action Workflow for AI Agents

When building a resume manually as an AI Agent, perform the following steps:

1. **Determine Folder Slug:** Auto-slugify the target resume title (e.g., `Java_Systems_Engineer`).
2. **Create Resume Directory:** Create directory `Resume/<folder_slug>/`.
3. **Copy Template CSS:** Copy `style.css` from `.agents/skills/resume-builder/templates/<chosen_template>/style.css` into `Resume/<folder_slug>/style.css`.
4. **Generate Resume HTML (`Resume/<folder_slug>/resume.html`):**
   - Create `Resume/<folder_slug>/resume.html` with clean HTML, proper ATS section headings, header contact links, and print top-bar (`no-print-bar` with print button and back link to `../../resume.html`).
5. **Update Portfolio Showcase (`resume.html`):**
   - Open `resume.html` in the root workspace.
   - Insert an `<article class="selector-card <badge_color>" data-slug="<folder_slug>">` card at the top of `<div class="selector-grid" id="selector-grid-container">`.
   - Card includes: Badge, Title, Subtitle, 3 Key Highlights, and View Resume link (`href="Resume/<folder_slug>/resume.html"`).
6. **Inform User:** Inform the user that the resume has been generated locally in `Resume/<folder_slug>/` and registered in `resume.html`, ready for them to review and commit to Git.