# HireReady

HireReady is a comprehensive AI-powered career development and recruitment platform designed to bridge the gap between job seekers and employers. By leveraging advanced Large Language Models (LLMs) and structured data analysis, the platform provides personalized career guidance for seekers and intelligent applicant screening for recruiters.

## Core Features

### For Job Seekers

1.  **AI-Powered Resume Analysis**
    *   Automated extraction of technical skills and profesional metadata from PDF resumes using PyMuPDF and Groq LLMs.
    *   Secure storage of resumes in Supabase Storage buckets for persistent access.

2.  **Career Gap Analysis**
    *   Real-time comparison between a user's current skill set and the requirements of their target role.
    *   Dynamic visualization of match percentages, identifying both present and missing critical skills.

3.  **Personalized Learning Roadmaps**
    *   Automated generation of structured learning paths based on identified skill gaps.
    *   Interactive progress tracking where completing roadmap steps automatically updates the user's professional profile.

4.  **Intelligent Job Discovery and Application**
    *   Browsing of job postings with automated match scoring before applying.
    *   Application tracking system to monitor status and review match analysis for submitted resumes.

### For Recruiters

1.  **Job Posting Management**
    *   Tools to create and manage detailed job listings, specifying required skills, experience levels, and employment types.

2.  **Automated Applicant Screening**
    *   Instant parsing and scoring of applicant resumes against specific job requirements.
    *   Detailed view of matched and missing skills for each applicant, facilitating faster decision-making.

3.  **Recruitment Analytics**
    *   Dashboard providing high-level statistics on total postings, applicant volume, and average candidate match scores across all active listings.

### For Administrators

1.  **Platform Governance**
    *   Centralized management of user accounts, job postings, and platform-wide analytics.

## Technical Implementation

### Backend Architecture
*   **Framework**: FastAPI (Python) for high-performance asynchronous API management.
*   **Database**: PostgreSQL hosted on Supabase, managed via SQLAlchemy.
*   **Storage**: Supabase Storage for secure PDF resume hosting.
*   **AI/ML Integration**:
    *   **LangChain**: Orchestration of LLM chains and structured output parsing.
    *   **Groq (Llama 3.3 70B)**: High-speed inference for resume parsing, gap analysis, and roadmap generation.
    *   **PyMuPDF**: Robust text extraction from PDF documents.
*   **Authentication**: JWT-based secure authentication with role-based access control (RBAC).

### Frontend Architecture
*   **Framework**: React 19 with Vite for rapid development and optimized builds.
*   **Styling**: Tailwind CSS with Shadcn UI components for a premium, responsive design system.
*   **Data Visualization**: Recharts for interactive analytics and match percentage displays.
*   **State Management & Routing**: React Router for SPA navigation and context-based state management.
*   **Icons & Notifications**: Lucide React for iconography and Sonner for real-time user feedback.

## Infrastructure and Deployment
*   **Containerization**: Docker and Docker Compose for local development and production-ready environments.
*   **Multi-Stage Builds**: Optimized Docker images for both frontend and backend to minimize footprint and improve security.
*   **Reverse Proxy**: Nginx configuration for serving the static frontend and acting as a secure gateway for API requests.

## Getting Started

### Prerequisites
*   Docker and Docker Compose
*   Groq API Key
*   Supabase Project Credentials

### Installation
1.  Clone the repository.
2.  Configure environment variables in `hireready-backend/.env`.
3.  Deploy the stack using Docker Compose:
    ```bash
    docker-compose up --build
    ```
4.  The application will be accessible at `http://localhost`.
