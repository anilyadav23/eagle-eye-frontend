# Eagle Eye Frontend
### Smart Class Attendance & Activity Intelligence - Tactical Web Command Portal

The modern, responsive web application for the Eagle Eye smart classroom attendance verification, biometric surveillance, and spatial tracking platform.

Built with **React 18/19**, **Vite**, **TypeScript**, **Tailwind CSS**, **Lucide Icons**, and **HTML5 Canvas / SVG rendering**.

---

## 🚀 Features

- **🎓 Smart Classroom Attendance Roster**: Real-time biometric attendance verification, proxy attendance detection, invigilator verification overrides, and 1-click audit CSV export.
- **📹 Live AI Video Matrix HUD**: Dual-mode video player supporting hardware RTSP/USB camera feeds and interactive Smart Classroom AI canvas simulations.
- **🗺️ Interactive 2D Campus Map**: Architectural CAD blueprint studio, multi-level campus navigator (Academic Block A), and live student movement avatars.
- **👤 Student & Personnel Enrollment**: Digital ID card issuance with customized classroom/lab clearance permissions.
- **📍 Individual Tracking & Trajectory**: Historical room transition logs and spatial breadcrumb trails.
- **📸 Daily Appearance Vault**: Multi-day outfit comparison and ArcFace facial verification records.
- **📊 Compliance ROI & Analytics**: Space utilization heatmaps, arrival peak curves, and compliance reports.

---

## 🛠️ Local Development

### Prerequisites
- Node.js v18.0.0 or higher
- npm (or pnpm / yarn)

### Setup & Run
```bash
# 1. Install dependencies
npm install

# 2. Run local development server (with proxy to backend on localhost:8000)
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🌐 Environment Variables

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

| Variable | Description | Default (Local) | Production Example |
|---|---|---|---|
| `VITE_API_BASE_URL` | Base HTTP URL of the deployed FastAPI backend | `""` (Uses Vite dev proxy) | `https://eagle-eye-backend.onrender.com` |
| `VITE_WS_URL` | WebSocket URL for real-time live events | `""` (Uses `ws://<host>/ws`) | `wss://eagle-eye-backend.onrender.com/ws` |

---

## 📦 Production Deployment

### Option 1: Deploy to Vercel (Recommended)
1. Push this repository to GitHub.
2. In [Vercel](https://vercel.com), click **Add New Project** and import this repository.
3. Vercel automatically detects **Vite** and uses:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. In **Environment Variables**, set:
   - `VITE_API_BASE_URL`: Your deployed backend URL (e.g. `https://your-backend.onrender.com`)
   - `VITE_WS_URL`: Your deployed WebSocket URL (e.g. `wss://your-backend.onrender.com/ws`)
5. Click **Deploy**. SPA rewrites are already handled by `vercel.json`.

---

### Option 2: Deploy to Netlify
1. Connect your GitHub repository to [Netlify](https://netlify.com).
2. Configure settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. Add environment variables:
   - `VITE_API_BASE_URL`: `https://your-backend.onrender.com`
   - `VITE_WS_URL`: `wss://your-backend.onrender.com/ws`
4. Click **Deploy Site**. SPA routing is pre-configured via `netlify.toml` and `public/_redirects`.

---

### Option 3: Deploy with Docker
Build and run the production-optimized Nginx container:

```bash
# Build Docker image
docker build -t eagle-eye-frontend .

# Run container on port 80 (or port 3000)
docker run -d -p 80:80 --name eagle-eye-frontend eagle-eye-frontend
```

---

### Option 4: Deploy to Render / Railway (Static Site)
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`
- Add rewrite rule: `/* -> /index.html` (Status 200)

---

## 🧪 Build & Lint Checks

```bash
# Check TypeScript types & compile bundle
npm run build

# Fast linter check
npm run lint
```

<!-- Auto-deploy trigger: linked to https://eagle-eye-ai-security-system.onrender.com -->
