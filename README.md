# HireProof AI

### AI-Powered Technical Hiring & Candidate Verification Platform

<p align="center">
  Full-stack recruiter intelligence platform for resume screening, candidate management, and AI-driven hiring workflows.
</p>

---

## Live Demo

### Frontend

https://hireproof-ai.netlify.app

### Backend API

https://hireproof-ai.onrender.com

---

# Overview

HireProof AI is a modern full-stack recruiter platform designed to simplify hiring workflows through AI-powered candidate management.

Recruiters can:

* register and securely log in
* upload candidate resumes
* manage hiring workflows
* track candidate progress
* review recruiter-specific dashboards
* work inside a scalable AI hiring workspace

Built with production-ready MERN architecture and deployed on Netlify + Render.

---

# Tech Stack

## Frontend

* React.js
* Vite
* Tailwind CSS
* React Router DOM
* Axios
* Context API
* Lucide React

---

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* Multer File Upload

---

## Deployment

* Netlify — Frontend Hosting
* Render — Backend Hosting
* MongoDB Atlas — Cloud Database

---

# Features

## Authentication

* Recruiter Registration
* Secure Login
* JWT Authentication
* Protected Dashboard Routes
* Persistent Login Sessions
* Logout Flow

---

## Candidate Resume Upload

* PDF Resume Upload
* Resume Storage
* Candidate Record Creation
* Production Upload Support on Render

---

## Recruiter Dashboard

* Candidates Screened Counter
* Pending Reviews Counter
* Verified Profiles Counter
* Reports Generated Counter

---

## Candidate Workspace

* Candidate Resume Management
* Hiring Workflow Interface
* Recruiter Workspace Panel
* Candidate Tracking Foundation

---

## User-Specific Data Security

Each recruiter sees only:

* their own uploaded candidates
* their own dashboard statistics
* their own recruiter workspace data

User data remains fully isolated across accounts.

---

# Project Structure

```bash
HireProof-AI/
│
├── backend/
│   ├── config/
│   │   ├── aiConfig.js
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── candidateController.js
│   │
│   ├── middleware/
│   │   └── uploadMiddleware.js
│   │
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── uploads/
│   ├── utils/
│   │
│   ├── .env
│   ├── package.json
│   ├── server.js
│   ├── testPdfParser.js
│   └── vercel.json
│
├── frontend/
│   ├── public/
│   │   ├── _redirects
│   │   ├── favicon.svg
│   │   └── icons.svg
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── constants/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── .env
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── DEBUG_LOG.md
├── PROJECT_PROGRESS.md
├── PROJECT_RULES.md
└── README.md
```

---

# Local Setup

## Clone Repository

```bash
git clone https://github.com/shivam-js/HireProof-AI.git
cd HireProof-AI
```

---

## Backend Setup

```bash
cd backend
npm install
npm run dev
```

Runs backend server on:

```bash
http://localhost:5000
```

---

## Frontend Setup

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Runs frontend on:

```bash
http://localhost:5173
```

---

# Environment Variables

## Backend `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## Frontend `.env`

```env
VITE_API_URL=https://hireproof-ai.onrender.com
```

---

# Major Production Fixes Completed

## Authentication Fixes

* Register flow fixed
* Login flow fixed
* Registration success feedback added
* Improved error handling

---

## Deployment Fixes

* Netlify deployment configured
* Render backend deployment stabilized
* React Router route refresh fixed using `_redirects`

---

## Resume Upload Fixes

* Render upload directory auto-created dynamically
* PDF upload working in production
* Upload middleware fixed

---

## Security & Data Fixes

* User-specific candidate filtering implemented
* Dashboard data isolation fixed
* Recruiter account separation working correctly

---

# Roadmap

Upcoming planned features:

* AI Resume Analysis Engine
* ATS Match Percentage
* Candidate Ranking System
* Shortlisted Candidates Module
* Recruiter Report Generation
* Interview Tracking Workflow
* AI Candidate Insights Dashboard
* Hiring Analytics & Reporting

---

# Author

## Shivam Prasad

Full Stack Developer • MERN Stack Developer • AI Product Builder

GitHub:
https://github.com/shivam-js

---

# Project Status

## Currently in Active Development

HireProof AI is actively being developed with ongoing improvements focused on:

* AI candidate intelligence
* recruiter workflow automation
* technical hiring optimization
* scalable recruiter SaaS architecture

---

# License

MIT License
