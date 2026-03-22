# GenAI Job Preparation Application

A full-stack MERN (MongoDB, Express, React, Node.js) web application that leverages Google's Gemini AI to help job seekers prepare for technical interviews. The application analyzes your resume, self-description, and a job description to generate personalized interview preparation reports.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3Ev18-green.svg)
![React](https://img.shields.io/badge/react-19.2-blue.svg)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Setup Instructions](#setup-instructions)
- [Usage Guide](#usage-guide)
- [Environment Variables](#environment-variables)
- [Security Features](#security-features)

## Features

- **AI-Powered Interview Analysis**: Uses Google's Gemini 2.5 Flash to generate comprehensive interview preparation reports
- **Resume Parsing**: Automatically extracts text from uploaded PDF resumes using `pdf-parse`
- **Job Match Scoring**: Provides a 0-100 score indicating how well your profile matches the job description
- **Personalized Question Generation**:
  - Technical interview questions with intention and answer guidance
  - Behavioral interview questions with answer frameworks
- **Skill Gap Analysis**: Identifies missing skills with severity levels (low/medium/high)
- **Structured Preparation Plan**: Day-by-day study plan for interview preparation
- **User Authentication**: Secure JWT-based authentication with HTTP-only cookies
- **Protected Routes**: Authentication required for interview features

## Tech Stack

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | v18+ | Runtime environment |
| Express.js | v5.2.1 | REST API framework |
| MongoDB | - | NoSQL database |
| Mongoose | v9.2.3 | MongoDB ODM |
| Google GenAI | v1.43.0 | AI report generation (gemini-2.5-flash) |
| pdf-parse | v2.4.5 | PDF resume text extraction |
| multer | v2.1.0 | File upload handling |
| bcryptjs | v3.0.3 | Password hashing |
| jsonwebtoken | v9.0.3 | JWT authentication |
| zod | v4.3.6 | Schema validation for AI responses |
| zod-to-json-schema | v3.25.1 | Convert Zod schemas to JSON Schema |
| cookie-parser | v1.4.7 | Cookie handling |
| cors | v2.8.6 | Cross-origin resource sharing |
| dotenv | v17.3.1 | Environment variable management |

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| React | v19.2.0 | UI framework |
| Vite | v7.3.1 | Build tool & dev server |
| React Router | v7.13.1 | Client-side routing |
| Axios | v1.13.6 | HTTP client |
| Sass | v1.97.3 | CSS preprocessor |

## Project Structure

```
GenAIJobPreparation/
├── backend/                    # Node.js/Express REST API
│   ├── src/
│   │   ├── app.js             # Express app configuration (CORS, cookies, JSON)
│   │   ├── config/
│   │   │   └── database.js    # MongoDB connection setup
│   │   ├── controllers/
│   │   │   ├── auth.controller.js     # User authentication logic
│   │   │   └── interview.controller.js # Interview report generation
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js     # JWT token verification
│   │   │   └── file.middleware.js     # Multer file upload config
│   │   ├── models/
│   │   │   ├── user.model.js          # User schema (userName, email, password)
│   │   │   ├── interviewReport.model.js # Interview report schema
│   │   │   └── blacklist.model.js     # JWT token blacklist
│   │   ├── routes/
│   │   │   ├── auth.routes.js         # /api/auth endpoints
│   │   │   └── interview.routes.js    # /api/interview endpoints
│   │   └── services/
│   │       └── ai.service.js          # Google GenAI integration
│   ├── .env                   # Environment variables (not in repo)
│   ├── server.js              # Application entry point
│   └── package.json
│
└── frontend/                  # React + Vite SPA
    ├── src/
    │   ├── App.jsx            # Root component with AuthProvider
    │   ├── app.routes.jsx     # React Router configuration
    │   ├── main.jsx           # React entry point
    │   ├── style.scss         # Global styles
    │   └── features/          # Feature-based organization
    │       ├── auth/          # Authentication feature
    │       │   ├── auth.context.jsx   # Auth context provider
    │       │   ├── auth.api.js        # Auth API calls (axios)
    │       │   ├── hooks/
    │       │   │   └── useAuth.js     # Custom auth hook
    │       │   ├── components/
    │       │   │   └── Protected.jsx  # Route guard component
    │       │   ├── pages/
    │       │   │   ├── Login.jsx
    │       │   │   └── Register.jsx
    │       │   └── services/
    │       │       └── auth.api.js    # Auth API service
    │       └── interview/   # Interview feature
    │           ├── pages/
    │           │   ├── Home.jsx       # Main interview form
    │           │   └── Interview.jsx  # Interview results page
    │           ├── services/
    │           │   └── interview.api.js # Interview API service
    │           └── style/             # SCSS styles
    └── package.json
```

## API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required | Request Body |
|--------|----------|-------------|---------------|--------------|
| POST | `/register` | Register new user | No | `{ userName, email, password }` |
| POST | `/login` | Login user | No | `{ email, password }` |
| GET | `/logout` | Logout user | Yes | - |
| GET | `/get-me` | Get current user | Yes | - |

### Interview Routes (`/api/interview`)

| Method | Endpoint | Description | Auth Required | Request Body |
|--------|----------|-------------|---------------|--------------|
| POST | `/generate-report` | Generate AI interview report | Yes | `formData` with resume, jobDescription, selfDescription |

## Database Models

### User Model
```javascript
{
  userName: String,      // unique, required, trimmed
  email: String,         // unique, required, lowercase
  password: String       // hashed with bcrypt, required
}
```

### InterviewReport Model
```javascript
{
  jobDescription: String,    // required
  resume: String,            // parsed text from PDF
  selfDescription: String,   // required
  matchScore: Number,        // 0-100
  technicalQuestions: Array, // [{ question, intention, answer }]
  behavioralQuestions: Array,// [{ question, intention, answer }]
  skillGaps: Array,          // [{ gap, severity }]
  preparationPlan: Array,    // [{ day, task }]
  user: ObjectId             // reference to users collection
}
```

### BlacklistToken Model
```javascript
{
  token: String,           // JWT token
  createdAt: Date          // auto-expires for cleanup
}
```

## Setup Instructions

### Prerequisites

- Node.js v18 or higher
- npm or yarn
- MongoDB Atlas account or local MongoDB installation
- Google GenAI API key

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory:
   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/genai-job-prep
   JWT_SECRET=your_secure_jwt_secret_key_min_32_chars
   GOOGLE_GENAI_API_KEY=your_google_genai_api_key
   PORT=3000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will start on `http://localhost:5173`

## Usage Guide

### 1. Register / Login

- Navigate to `/register` to create a new account
- Or navigate to `/login` if you already have an account

### 2. Upload Resume & Generate Report

After logging in, you'll be redirected to the Home page (`/`):

1. **Upload Resume**: Click to upload your resume (PDF, DOC, DOCX - max 5MB)
2. **Enter Job Description**: Paste the full job posting you're targeting
3. **Enter Self-Description**: Briefly describe your skills, experience, and background
4. **Generate Report**: Click the "Generate Interview Report" button

### 3. View Results

After processing, you'll be redirected to `/interview` where you can view:

- **Match Score**: Overall compatibility percentage
- **Technical Questions**: Role-specific technical questions with guidance
- **Behavioral Questions**: Soft skills and culture fit questions
- **Skill Gaps**: Missing skills ranked by severity
- **Preparation Plan**: Day-by-day study tasks

## Environment Variables

### Backend `.env`

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `JWT_SECRET` | Secret key for JWT signing | `your-secret-key-at-least-32-characters` |
| `GOOGLE_GENAI_API_KEY` | Google AI Studio API key | `AIzaSy...` |
| `PORT` | Server port (optional) | `3000` |

### Frontend

The frontend uses the hardcoded API base URL: `http://localhost:3000/api/`

To change this, modify `frontend/src/features/auth/services/auth.api.js` and `frontend/src/features/interview/services/interview.api.js`

## Security Features

- **JWT Authentication**: Tokens stored in HTTP-only cookies (1-day expiry)
- **Password Hashing**: bcryptjs with salt rounds
- **Token Blacklisting**: Logout invalidates tokens
- **Protected Routes**: Middleware verifies JWT before accessing interview features
- **File Validation**: Upload middleware validates file type and size (max 5MB)
- **CORS Configuration**: Configured for localhost frontend
- **Input Validation**: Zod schemas validate AI responses

## Application Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Register  │────▶│    Login    │────▶│  Protected  │
│   /register │     │   /login    │     │    Route    │
└─────────────┘     └─────────────┘     └─────────────┘
                                               │
                                               ▼
┌─────────────────────────────────────────────────────────┐
│                      Home Page                          │
│  1. Upload Resume (PDF/DOC/DOCX)                        │
│  2. Enter Job Description                               │
│  3. Enter Self-Description                              │
│  4. Click "Generate Interview Report"                   │
└─────────────────────────────────────────────────────────┘
                                               │
                                               ▼
┌─────────────────────────────────────────────────────────┐
│                   Backend Processing                    │
│  1. Parse PDF resume with pdf-parse                     │
│  2. Call Google GenAI with structured prompt            │
│  3. Validate response with Zod schema                   │
│  4. Save report to MongoDB                              │
└─────────────────────────────────────────────────────────┘
                                               │
                                               ▼
┌─────────────────────────────────────────────────────────┐
│                  Interview Results                      │
│  - Match Score (0-100)                                  │
│  - Technical Questions                                  │
│  - Behavioral Questions                                 │
│  - Skill Gaps                                           │
│  - Preparation Plan                                     │
└─────────────────────────────────────────────────────────┘
```

## NPM Scripts

### Backend
```bash
npm run dev    # Start server with nodemon (auto-restart)
```

### Frontend
```bash
npm run dev     # Start Vite dev server
npm run build   # Build for production
npm run lint    # Run ESLint
npm run preview # Preview production build
```

## License

MIT License - see LICENSE file for details

## Author

GenAI Job Preparation Team

---

**Built with**  Google Gemini AI | React 19 | Express 5 | MongoDB
