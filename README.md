# Dream More Platform

**Dream More Platform** is an integrated education and career development ecosystem that combines an online **Learning Management System (LMS)** with the **AppWorks Freelance Marketplace**. The platform enables students to learn skills through courses, instructors to create and sell courses, and graduates/freelancers to find work opportunities based on acquired skills and verified experience.

---

## 🚀 Technology Stack (Revised Architecture - August 2026)

| Layer | Selected Technology |
| :--- | :--- |
| **Monorepo** | npm Workspaces (`apps/*`, `packages/*`) |
| **Frontend** | **Next.js 16** + **TypeScript** |
| **UI Styling** | **Tailwind CSS** + **Lucide React** + **Recharts** |
| **State & Fetching** | **TanStack Query** (Server State) + **Zustand** (Client State) |
| **Forms & Validation** | **React Hook Form** + **Zod** |
| **Backend API** | **NestJS** + **TypeScript** |
| **API Protocol** | **REST API** + **WebSockets / Socket.IO** (Real-time notifications) |
| **Authentication** | **JWT** + Refresh Tokens + Passport |
| **Database** | **PostgreSQL** |
| **ORM** | **Prisma ORM** |
| **Shared Contracts** | `@dream-more/shared` (TypeScript Types, Zod Schemas, Enums) |

---

## 📁 Repository Structure

```text
Dream_More/
├── apps/
│   ├── web/                        # Next.js 16 Frontend
│   │   ├── app/                    # Next.js App Router (pages & layouts)
│   │   ├── components/             # Reusable UI components
│   │   ├── features/               # Domain feature modules (LMS, Jobs, Payments)
│   │   ├── lib/                    # API client & helpers
│   │   └── stores/                 # Zustand state management
│   │
│   └── api/                        # NestJS Backend API
│       ├── prisma/                 # Prisma schema & migrations
│       └── src/
│           ├── main.ts             # API entry point (Port 4000)
│           └── modules/            # Domain modules (auth, users, courses,
│                                   # payments, jobs, proposals, certificates...)
│
├── packages/
│   └── shared/                     # @dream-more/shared package
│       └── src/
│           ├── enums/              # UserRole, PaymentStatus, JobStatus...
│           ├── schemas/            # Zod validation schemas
│           └── types/              # System-wide TypeScript interfaces
│
├── documentation.pdf               # Revised Software Requirements Specification
├── package.json                    # Root monorepo workspace configuration
└── README.md
```

---

## 🗄️ Database Design (Prisma Entities)

The database schema defined in `apps/api/prisma/schema.prisma` includes **20 core entities**:

- **Identity & Profiles**: `User`, `StudentProfile`, `TeacherProfile`, `EmployerProfile`, `FreelancerProfile`, `VerificationRequest`
- **LMS Module**: `Course`, `CourseSection`, `Lesson`, `LessonResource`, `Quiz`, `QuizQuestion`, `QuizAttempt`, `Enrollment`
- **Payment & Certificates**: `Payment` (screenshot-based verification), `Certificate` (unique ID + QR Code)
- **AppWorks Marketplace**: `Job`, `Proposal`, `WorkSubmission`, `Review`
- **Notifications**: `Notification`

---

## 🛠️ How to Run Locally

### 1. Prerequisites
Ensure you have **Node.js** (v18+ or v20+) installed.

### 2. Launch Next.js Frontend
```bash
npm run dev:web
```
Access the application at `http://localhost:3000`.

### 3. Launch NestJS Backend API
```bash
npm run dev:api
```
The API server runs at `http://localhost:4000/api`.

### 4. Prisma Database Tooling
- **Generate Prisma Client:**
  ```bash
  npm run db:generate
  ```
- **Open Prisma Studio (Database GUI):**
  ```bash
  npm run db:studio
  ```

---

## 📶 Offline Development

All dependencies (Next.js, NestJS, Prisma, React, Zustand, TanStack Query, Zod, Tailwind, Lucide Icons) are pre-downloaded into `node_modules`. You can run and build the codebase completely offline without requiring internet data!
