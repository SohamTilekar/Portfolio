import http.server
import socketserver
import os
import json
import re
import shutil

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))
TEMPLATES_DIR = os.path.join(DIRECTORY, ".agents", "skills", "resume-builder", "templates")
RESUME_DIR = os.path.join(DIRECTORY, "Resume")
RESUME_HTML_PATH = os.path.join(DIRECTORY, "resume.html")
ADMIN_HTML_PATH = os.path.join(DIRECTORY, "admin.html")

os.makedirs(RESUME_DIR, exist_ok=True)

def render_resume_html_string(template_name, resume_data, is_preview=False):
    template_css_path = os.path.join(TEMPLATES_DIR, template_name, "style.css")
    if not os.path.exists(template_css_path):
        template_name = "modern"
        template_css_path = os.path.join(TEMPLATES_DIR, template_name, "style.css")
        
    with open(template_css_path, "r", encoding="utf-8") as f:
        css_content = f.read()

    name = resume_data.get("name", "Soham Tilekar")
    job_title = resume_data.get("job_title", "")
    contact = resume_data.get("contact", {})
    location = contact.get("location", "Pune, India")
    email = contact.get("email", "")
    phone = contact.get("phone", "")
    linkedin = contact.get("linkedin", "")
    github = contact.get("github", "")
    portfolio = contact.get("portfolio", "")

    summary = resume_data.get("summary", "")
    skills = resume_data.get("skills", [])
    experience = resume_data.get("experience", [])
    projects = resume_data.get("projects", [])
    education = resume_data.get("education", [])
    certifications = resume_data.get("certifications", [])

    contact_parts = []
    if location: contact_parts.append(location)
    if phone: contact_parts.append(phone)
    if email: contact_parts.append(f'<a href="mailto:{email}">{email}</a>')

    custom_links = contact.get("links", [])
    if custom_links:
        for link in custom_links:
            lbl = link.get("label", "").strip()
            url = link.get("url", "").strip()
            if url:
                lbl_display = lbl if lbl else url
                contact_parts.append(f'<a href="{url}" target="_blank">{lbl_display}</a>')
    else:
        if linkedin: contact_parts.append(f'<a href="{linkedin}" target="_blank">LinkedIn</a>')
        if github: contact_parts.append(f'<a href="{github}" target="_blank">GitHub</a>')
        if portfolio: contact_parts.append(f'<a href="{portfolio}" target="_blank">Portfolio</a>')

    contact_str = " | ".join(contact_parts)

    skills_html = ""
    if skills:
        skills_items = ""
        for s in skills:
            cat = s.get("category", "")
            items = s.get("items", "")
            if cat and items:
                skills_items += f'<li><strong>{cat}:</strong> {items}</li>\n'
        if skills_items:
            skills_html = f'''
        <section class="skills">
            <h2>Technical Skills</h2>
            <ul class="skills-list">
                {skills_items}
            </ul>
        </section>
        '''

    experience_html = ""
    if experience:
        exp_items = ""
        for exp in experience:
            role = exp.get("role", "")
            company = exp.get("company", "")
            dates = exp.get("dates", "")
            loc = exp.get("location", "")
            bullets = exp.get("bullets", [])
            b_html = "".join([f'<li>{b}</li>' for b in bullets if b and str(b).strip()])
            exp_items += f'''
            <div class="item">
                <div class="item-header">
                    <span class="left-side"><strong>{role}</strong> | {company}</span>
                    <span class="right-side"><em>{dates}</em></span>
                </div>
                <div class="item-sub">
                    <span>{loc}</span>
                </div>
                <ul>
                    {b_html}
                </ul>
            </div>
            '''
        if exp_items:
            experience_html = f'''
        <section class="experience">
            <h2>Professional Experience</h2>
            {exp_items}
        </section>
        '''

    projects_html = ""
    if projects:
        proj_items = ""
        for proj in projects:
            p_name = proj.get("name", "")
            p_desc = proj.get("short_desc", "")
            p_github = proj.get("github", "")
            p_dates = proj.get("dates", "")
            p_tech = proj.get("tech_stack", "")
            bullets = proj.get("bullets", [])
            b_html = "".join([f'<li>{b}</li>' for b in bullets if b and str(b).strip()])
            
            link_html = f' | <a href="{p_github}" target="_blank">{p_github}</a>' if p_github else ''
            desc_html = f' ({p_desc})' if p_desc else ''
            
            proj_items += f'''
            <div class="item">
                <div class="item-header">
                    <span class="left-side"><strong>{p_name}</strong>{desc_html}{link_html}</span>
                    <span class="right-side"><em>{p_dates}</em></span>
                </div>
                <div class="item-sub">
                    <span><strong>Tech Stack:</strong> {p_tech}</span>
                </div>
                <ul>
                    {b_html}
                </ul>
            </div>
            '''
        if proj_items:
            projects_html = f'''
        <section class="projects">
            <h2>Selected Projects</h2>
            {proj_items}
        </section>
        '''

    edu_cert_html = ""
    if education or certifications:
        items_html = ""
        for edu in education:
            deg = edu.get("degree", "")
            inst = edu.get("institution", "")
            dates = edu.get("dates", "")
            add = edu.get("details", "")
            items_html += f'''
            <div class="item">
                <div class="item-header">
                    <span class="left-side"><strong>{deg}</strong></span>
                    <span class="right-side">{dates}</span>
                </div>
                <div class="item-sub">
                    <span>{inst}</span>
                    <span>{add}</span>
                </div>
            </div>
            '''
        for cert in certifications:
            c_name = cert.get("name", "")
            c_issuer = cert.get("issuer", "")
            c_dates = cert.get("dates", "")
            c_details = cert.get("details", "")
            items_html += f'''
            <div class="item">
                <div class="item-header">
                    <span class="left-side"><strong>{c_name}</strong> - {c_issuer}</span>
                    <span class="right-side">{c_dates}</span>
                </div>
                <div class="item-sub">
                    <span>{c_details}</span>
                </div>
            </div>
            '''
        if items_html:
            edu_cert_html = f'''
        <section class="education">
            <h2>Certifications & Education</h2>
            {items_html}
        </section>
        '''

    title_display = f"{name} - {job_title}" if job_title else name

    no_print_bar = "" if is_preview else f'''
    <div class="no-print-bar">
        <div>📄 <strong>Resume Viewer</strong> ({template_name.capitalize()} Template)</div>
        <div>
            <a href="../../resume.html">← Back to Portfolio</a>
            <button onclick="window.print()">🖨️ Print / Save PDF</button>
        </div>
    </div>'''

    css_tag = f"<style>\n{css_content}\n</style>" if is_preview else '<link rel="stylesheet" href="style.css">'

    full_html = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title_display} | Resume</title>
    {css_tag}
    <style>
        .no-print-bar {{
            background: #1e293b;
            color: #ffffff;
            padding: 12px 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-family: system-ui, -apple-system, sans-serif;
            font-size: 14px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            margin-bottom: 24px;
        }}
        .no-print-bar a, .no-print-bar button {{
            background: #38bdf8;
            color: #0f172a;
            border: none;
            padding: 8px 16px;
            font-weight: 700;
            border-radius: 6px;
            cursor: pointer;
            text-decoration: none;
            font-size: 13px;
            margin-left: 8px;
            transition: all 0.2s ease;
        }}
        .no-print-bar a:hover, .no-print-bar button:hover {{
            background: #7dd3fc;
            transform: translateY(-1px);
        }}
        @media print {{
            .no-print-bar {{
                display: none !important;
            }}
        }}
    </style>
</head>
<body>
    {no_print_bar}
    <div class="container">
        <header>
            <h1>{name}</h1>
            {"<p style='font-size: 13pt; font-weight: 600; margin-top: -4px; margin-bottom: 8px; color: var(--accent-color);'>" + job_title + "</p>" if job_title else ""}
            <div class="contact-info">
                {contact_str}
            </div>
        </header>

        {"<section class='summary'><h2>Professional Summary</h2><p>" + summary + "</p></section>" if summary else ""}

        {skills_html}
        {experience_html}
        {projects_html}
        {edu_cert_html}
    </div>
</body>
</html>
'''
    return full_html


def generate_resume_files(folder_slug, template_name, resume_data):
    target_folder = os.path.join(RESUME_DIR, folder_slug)
    os.makedirs(target_folder, exist_ok=True)
    
    template_css_path = os.path.join(TEMPLATES_DIR, template_name, "style.css")
    if not os.path.exists(template_css_path):
        template_name = "modern"
        template_css_path = os.path.join(TEMPLATES_DIR, template_name, "style.css")
        
    with open(template_css_path, "r", encoding="utf-8") as f:
        css_content = f.read()

    with open(os.path.join(target_folder, "style.css"), "w", encoding="utf-8") as f:
        f.write(css_content)

    full_html = render_resume_html_string(template_name, resume_data, is_preview=False)
    html_path = os.path.join(target_folder, "resume.html")
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(full_html)

    return f"Resume/{folder_slug}/resume.html"


def update_resume_html_registry(payload, folder_slug):
    if not os.path.exists(RESUME_HTML_PATH):
        return

    with open(RESUME_HTML_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    card_title = payload.get("card_title", "Custom Resume").strip()
    card_subtitle = payload.get("card_subtitle", "Tailored Profile").strip()
    card_badge = payload.get("card_badge", "Custom Profile").strip()
    badge_color = payload.get("card_badge_color", "ai").strip()
    highlights = payload.get("card_highlights", [])
    
    h1 = highlights[0] if len(highlights) > 0 and highlights[0] else "Tailored technical skillset & focus."
    h2 = highlights[1] if len(highlights) > 1 and highlights[1] else "Highlighted key projects & experience."
    h3 = highlights[2] if len(highlights) > 2 and highlights[2] else f"Styled using the {payload.get('template', 'modern').capitalize()} template."

    new_card_html = f'''<!-- Custom Resume: {card_title} -->
                <article class="selector-card {badge_color}" data-slug="{folder_slug}">
                    <div class="selector-card-header">
                        <span class="selector-card-badge">{card_badge}</span>
                        <h2 class="selector-card-title">{card_title}</h2>
                        <p class="selector-card-subtitle">{card_subtitle}</p>
                    </div>
                    <div class="selector-card-body">
                        <ul>
                            <li><i class="fas fa-check-circle"></i> {h1}</li>
                            <li><i class="fas fa-check-circle"></i> {h2}</li>
                            <li><i class="fas fa-check-circle"></i> {h3}</li>
                        </ul>
                    </div>
                    <div class="selector-card-action" style="display: flex; gap: 8px;">
                        <a href="Resume/{folder_slug}/resume.html" class="selector-btn" style="flex: 1;">View Resume</a>
                    </div>
                </article>'''

    slug_pattern = rf'<!-- Custom Resume: [^>]*? -->\s*<article[^>]*data-slug="{re.escape(folder_slug)}"[^>]*>.*?</article>'
    if not re.search(slug_pattern, content, re.DOTALL):
        slug_pattern = rf'<article[^>]*data-slug="{re.escape(folder_slug)}"[^>]*>.*?</article>'
    href_pattern = rf'<article[^>]*>.*?href="Resume/{re.escape(folder_slug)}/resume\.html".*?</article>'

    if re.search(slug_pattern, content, re.DOTALL):
        content = re.sub(slug_pattern, new_card_html, content, flags=re.DOTALL)
    elif re.search(href_pattern, content, re.DOTALL):
        content = re.sub(href_pattern, new_card_html, content, flags=re.DOTALL)
    else:
        grid_pattern = r'<div\s+class="selector-grid"[^>]*>'
        if re.search(grid_pattern, content):
            content = re.sub(grid_pattern, lambda m: m.group(0) + "\n" + new_card_html, content, count=1)

    with open(RESUME_HTML_PATH, "w", encoding="utf-8") as f:
        f.write(content)


def remove_resume_from_registry(folder_slug):
    target_folder = os.path.join(RESUME_DIR, folder_slug)
    if os.path.exists(target_folder):
        shutil.rmtree(target_folder)

    if os.path.exists(RESUME_HTML_PATH):
        with open(RESUME_HTML_PATH, "r", encoding="utf-8") as f:
            content = f.read()

        slug_pattern = rf'\s*<!-- [^>]*? -->\s*<article[^>]*data-slug="{re.escape(folder_slug)}"[^>]*>.*?</article>'
        if not re.search(slug_pattern, content, re.DOTALL):
            slug_pattern = rf'<article[^>]*data-slug="{re.escape(folder_slug)}"[^>]*>.*?</article>'
        if not re.search(slug_pattern, content, re.DOTALL):
            slug_pattern = rf'<article[^>]*>.*?href="Resume/{re.escape(folder_slug)}/resume\.html".*?</article>'

        content = re.sub(slug_pattern, '', content, flags=re.DOTALL)

        with open(RESUME_HTML_PATH, "w", encoding="utf-8") as f:
            f.write(content)


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        # Serve admin studio on root '/' or '/admin' when running local python server
        if self.path in ['/', '/admin', '/admin.html']:
            self.path = '/admin.html'

        if self.path == '/api/status':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            response = {
                "status": "online",
                "mode": "local_studio",
                "templates": ["minimal", "modern", "creative"]
            }
            self.wfile.write(json.dumps(response).encode('utf-8'))
            return

        super().do_GET()

    def do_POST(self):
        if self.path == '/api/preview-resume':
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            try:
                payload = json.loads(post_data.decode('utf-8'))
                template = payload.get('template', 'modern').lower()
                resume_data = payload.get('resume_data', {})

                preview_html = render_resume_html_string(template, resume_data, is_preview=True)
                self.send_response(200)
                self.send_header('Content-Type', 'text/html; charset=utf-8')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(preview_html.encode('utf-8'))
            except Exception as e:
                self.send_response(500)
                self.end_headers()
            return

        if self.path == '/api/create-resume':
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            try:
                payload = json.loads(post_data.decode('utf-8'))
                folder_slug = payload.get('folder_slug', '').strip()
                card_title = payload.get('card_title', 'Custom Resume').strip()
                if not folder_slug:
                    folder_slug = re.sub(r'[^a-zA-Z0-9_]', '_', card_title).strip('_')
                if not folder_slug:
                    folder_slug = "Resume_Custom"

                template = payload.get('template', 'modern').lower()
                resume_data = payload.get('resume_data', {})

                resume_url = generate_resume_files(folder_slug, template, resume_data)
                update_resume_html_registry(payload, folder_slug)

                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                res = {
                    "success": True,
                    "resume_url": resume_url,
                    "folder_slug": folder_slug,
                    "message": f"Resume '{card_title}' published successfully!"
                }
                self.wfile.write(json.dumps(res).encode('utf-8'))
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                res = {"success": False, "error": str(e)}
                self.wfile.write(json.dumps(res).encode('utf-8'))
            return

        if self.path == '/api/delete-resume':
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            try:
                payload = json.loads(post_data.decode('utf-8'))
                folder_slug = payload.get('folder_slug', '').strip()
                if folder_slug:
                    remove_resume_from_registry(folder_slug)
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                res = {"success": True, "message": "Resume deleted successfully."}
                self.wfile.write(json.dumps(res).encode('utf-8'))
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                res = {"success": False, "error": str(e)}
                self.wfile.write(json.dumps(res).encode('utf-8'))
            return

        self.send_response(404)
        self.end_headers()

if __name__ == "__main__":
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"⚡ Local Resume Studio active at http://localhost:{PORT}")
        print(f"🌐 Public Portfolio Preview available at http://localhost:{PORT}/index.html & http://localhost:{PORT}/resume.html")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n👋 Studio server stopped.")
