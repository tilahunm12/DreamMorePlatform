# Dream More Platform - AppWorks Freelance Marketplace Module

AppWorks connects skilled Ethiopian graduates with employers. It combines freelance work contracts, job posting, proposal submissions, and LMS verified skill badges.

---

## Technical Stack
- **Frontend:** React 19, Vite, Tailwind CSS, Lucide Icons, Axios
- **Backend API:** Pure PHP 8.3 REST API with JSON responses
- **Database:** MySQL 8

---

## Directory Structure
```
Dream_More/
├── api/                        # Pure PHP REST API Endpoints
│   ├── config/database.php      # PDO MySQL Connection
│   └── appworks/
│       ├── get_jobs.php         # Fetch & filter jobs
│       ├── create_job.php       # Employer posts a job
│       ├── submit_proposal.php  # Freelancer applies
│       ├── get_proposals.php   # View proposals
│       └── update_proposal.php # Accept / Reject proposal
├── database/
│   └── schema.sql              # MySQL Tables & Seed Data
├── src/                        # React 19 Frontend
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── JobMarketplace.jsx
│   │   ├── EmployerDashboard.jsx
│   │   ├── FreelancerDashboard.jsx
│   │   ├── PostJobModal.jsx
│   │   ├── SubmitProposalModal.jsx
│   │   └── JobDetailsModal.jsx
│   ├── services/
│   │   └── api.js              # Axios Client & Offline Fallback Engine
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── package.json
└── vite.config.js
```

---

## How to Run Locally

### 1. Frontend Development (React)
```bash
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Backend REST API (PHP)
Ensure WAMP / Apache server is running, or place the `api/` directory under your local PHP server (`http://localhost:8000/api/appworks/` or WAMP `http://localhost/Dream_More/api/appworks/`).

### 3. Database Setup (MySQL)
Import `database/schema.sql` into phpMyAdmin or MySQL server to create `dreammore_db`.

---

## Git Workflow & GitHub
This repository is configured for push to:
`https://github.com/tilahunm12/appworks-temp.git`
