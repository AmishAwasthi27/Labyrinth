# INDIA'S LABYRINTH — Project Notes

## Live URL
https://your-vercel-url.vercel.app

## Tech Stack
- Frontend: React 18 + Vite
- Charts: Recharts
- Styling: Inline CSS (Blueprint aesthetic)
- Deployment: Vercel (auto-deploy from GitHub)
- Backend: Node.js + Express (server/ folder, planned)
- Database: MongoDB Atlas (planned)

## Design System
- Background: #003366 (blueprint blue)
- Accent: #FF3333 (redline red)
- Measurements: #00FFFF (cyan)
- Font: monospace + Bebas Neue (Google Fonts)
- 20px CSS grid background
- Crosshair cursor with live X/Y coordinates
- Corner markers on all cards (CardCorners component)

## Modules Built
- OVERVIEW — national snapshot, radar chart, crime pie, suicide trend
- SAFETY — statewise crime bar chart, root causes, solutions, helplines
- MENTAL HEALTH — content warning gate, suicide trend, helplines
- HEALTH — IMR by state, gaps, schemes, helplines
- EDUCATION — dropout funnel chart, root causes, solutions
- ECONOMY — poverty/unemployment trend, inequality data, helplines
- HELPLINES — searchable full directory with WhatsApp share

## Components Built
- GridBg — fixed 20px cyan grid background
- Crosshair — live X/Y cursor coordinates
- CardCorners — cyan corner marks on every card
- BCard — blueprint card with corners + serial label
- StatTile — animated counting stat tiles
- Annotation — rotated handwritten-style notes
- HelpCard — red bordered helpline card with WhatsApp share
- SectionTitle — module heading with serial number
- CustomTooltip — blueprint styled chart tooltips
- ListItem — monospace list rows

## Data Sources
- NCRB Annual Report 2022 (crime, suicide)
- NFHS-5 2019-21 (health, nutrition)
- UDISE+ 2022 (education)
- ASER 2023 (learning outcomes)
- MOSPI 2023 (economy, poverty)
- CMIE 2023 (unemployment)
- NIMHANS 2023 (mental health)
- OXFAM India 2023 (inequality)

## Data Currently In App (Static JSON inside App.jsx)
- crimeByState — top 10 states, 4 crime types
- suicideTrend — 2013-2022, total/farmers/students
- healthMetrics — 10 states, IMR/MMR/stunting
- educationFunnel — 6 stages class1 to graduate
- economyData — 2004-2023, poverty/unemployment/gini
- crimeCategories — 6 categories with colors
- radarData — 7 development metrics scored /100
- helplines — 5 categories, 22 total numbers

## Planned Features (Next Steps)
- [ ] Mobile responsive layout (priority)
- [ ] News module (NewsAPI.org integration)
- [ ] Environment module (AQI, forest cover, river pollution)
- [ ] D3 choropleth India map (district level drilldown)
- [ ] Backend API (Node + Express in /server folder)
- [ ] MongoDB for helplines + solutions data
- [ ] Annual data refresh pipeline (Python + GitHub Actions)
- [ ] Custom domain: indiaslabyrinth.in
- [ ] Solutions Hub page (fishbone diagrams, NGOs, schemes)
- [ ] PWA support (installable on mobile)

## File Structure
labyrinth/
├── src/
│   ├── App.jsx        ← ENTIRE frontend lives here (single file)
│   ├── main.jsx       ← React root mount
│   └── index.css      ← minimal reset only
├── server/            ← Node/Express backend (empty, planned)
├── public/
├── index.html
├── vite.config.js
├── package.json
└── PROJECT.md         ← this file

## Key Packages
- recharts (charts)
- react-router-dom (routing, installed not used yet)
- framer-motion (installed not used yet)
- axios (installed not used yet)

## Commands
npm run dev                   # local dev at localhost:5173
npm run dev -- --host         # expose to mobile on same WiFi
npm run build                 # production build
git add . && git commit -m "msg" && git push  # save + deploy

## Bugs Fixed
- useRef removed (was unused)
- CardCorners uses explicit CSS props (top/left/right/bottom)
- HelpCard WhatsApp URL string was broken, extracted to function
- TICKER_DATA moved outside component (was causing re-render)
- e.target replaced with e.currentTarget in hover handlers
- Bebas Neue has sans-serif fallback while font loads

## How To Continue This Project
When starting a new chat session, say:
"We are continuing India's Labyrinth project.
It is a React + Vite civic awareness dashboard
with blueprint aesthetic (#003366 bg, #FF3333 accents, #00FFFF cyan).
All code is in src/App.jsx as a single file.
Check PROJECT.md in my repo for full details."