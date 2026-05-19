# Soham Tilekar | Systems Engineer - Portfolio

This is my professional portfolio website, showcasing my work in systems programming, compiler design, kernel development, and hardware architecture.

## 🚀 Tech Stack

- **Framework:** React 19 (TypeScript ready)
- **Styling:** Tailwind CSS & Vanilla CSS
- **Bundler:** Webpack 5
- **Environment:** Node.js
- **Containerization:** Docker & Docker Compose
- **Hosting:** GitHub Pages & Self-hostable

## 🛠️ Local Development

### Prerequisites
- Node.js (v18+)
- npm

### Setup
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
   The site will be available at `http://localhost:8080` (or the next available port).

## 🏗️ Production Build

To generate the static assets for production:
```bash
npm run build
```
The output will be in the `dist/` directory.

## 🐳 Docker Support

You can run the portfolio in a containerized environment:

### Using Docker Compose
```bash
docker-compose up --build
```
The site will be available at `http://localhost:8080`.

### Manual Docker Build
```bash
docker build -t portfolio-website .
docker run -p 8080:80 portfolio-website
```

## 🌐 Deployment

### GitHub Pages
To deploy to GitHub Pages:
```bash
npm run deploy
```
This will build the project and push the `dist` folder to the `gh-pages` branch.

### Self-Hosting
You can serve the `dist` directory with any static web server (Nginx, Apache, Vercel, etc.) or use the provided `Dockerfile`.

---
Built with <3 by Soham Tilekar
