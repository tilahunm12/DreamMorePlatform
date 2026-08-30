# Implementation Plan - Revised Architecture Setup & Offline Dependency Provision

Set up the complete **Dream More Platform** revised monorepo architecture (Next.js 16 frontend, NestJS backend, Prisma ORM database schema, shared packages, and dependencies) so that all required packages and boilerplate structures are downloaded and ready locally. This allows offline development without requiring additional internet data.

## User Review Required

> [!IMPORTANT]
> - **Monorepo Structure**: The new structure will organize the project under `apps/web` (Next.js 16), `apps/api` (NestJS API), and `packages/shared` (shared contracts & types), keeping the root clean.
> - **Prisma Database Schema**: A complete PostgreSQL Prisma schema containing all 20 core entities (User, StudentProfile, TeacherProfile, EmployerProfile, FreelancerProfile, Course, Section, Lesson, Quiz, Enrollment, Payment, Certificate, Job, Proposal, Review, VerificationRequest, Notification) will be scaffolded in `apps/api/prisma/schema.prisma`.
> - **Offline Readiness**: All required npm dependencies for React, Next.js, NestJS, Prisma, Tailwind, Zustand, TanStack Query, Zod, and Lucide React will be downloaded into `node_modules`.

## Open Questions

> [!NOTE]
> - Do you prefer using **npm workspaces** or **pnpm / Turborepo** for managing the monorepo? (Default proposal: npm workspaces for simple, native setup with zero extra tool dependencies).
> - Should we preserve the existing legacy PHP/React prototype inside a `legacy/` or `deprecated/` folder, or create the new `apps/` structure alongside it? (Default proposal: keep current files in place or isolate in `legacy/`).

## Proposed Changes

---

### Root Project Setup

#### [NEW] [package.json](file:///c:/wamp64/www/Dream_More/package.json)
- Define root monorepo scripts (`dev`, `build`, `dev:web`, `dev:api`, `db:migrate`, `db:studio`).
- Configure `workspaces: ["apps/*", "packages/*"]`.

#### [NEW] [turbo.json](file:///c:/wamp64/www/Dream_More/turbo.json) or workspace configuration
- Define build and dev pipelines for multi-package execution.

---

### `apps/web` (Next.js 16 Frontend)

#### [NEW] [apps/web/package.json](file:///c:/wamp64/www/Dream_More/apps/web/package.json)
- Dependencies: `next@latest`, `react`, `react-dom`, `@tanstack/react-query`, `zustand`, `react-hook-form`, `@hookform/resolvers`, `zod`, `lucide-react`, `recharts`, `clsx`, `tailwind-merge`.
- DevDependencies: `tailwindcss`, `postcss`, `autoprefixer`, `typescript`, `@types/react`, `@types/node`.

#### [NEW] [apps/web/tailwind.config.js](file:///c:/wamp64/www/Dream_More/apps/web/tailwind.config.js)
- Configure Tailwind CSS styling system and theme tokens matching modern glassmorphism dark/light design system.

#### [NEW] Directory & Component Boilerplate Structure
- `apps/web/app/`: Next.js App Router root layout, pages, and route groups (`(auth)`, `(student)`, `(teacher)`, `(admin)`, `(employer)`, `(freelancer)`).
- `apps/web/components/`: Base UI components (Button, Input, Card, Modal, Navbar, Sidebar).
- `apps/web/features/`: LMS, Payment, AppWorks marketplace, Verification feature modules.
- `apps/web/lib/`, `hooks/`, `stores/`, `schemas/`, `types/`: Custom hooks, Zustand stores, API client setup.

---

### `apps/api` (NestJS Backend)

#### [NEW] [apps/api/package.json](file:///c:/wamp64/www/Dream_More/apps/api/package.json)
- Dependencies: `@nestjs/core`, `@nestjs/common`, `@nestjs/platform-express`, `@nestjs/jwt`, `@nestjs/passport`, `@prisma/client`, `passport`, `passport-jwt`, `bcrypt`, `class-validator`, `class-transformer`, `rxjs`, `@nestjs/websockets`, `@nestjs/platform-socket.io`, `socket.io`.
- DevDependencies: `prisma`, `@nestjs/cli`, `@nestjs/schematics`, `typescript`, `@types/node`, `@types/bcrypt`, `@types/passport-jwt`, `jest`, `ts-jest`.

#### [NEW] [apps/api/prisma/schema.prisma](file:///c:/wamp64/www/Dream_More/apps/api/prisma/schema.prisma)
- Prisma ORM schema defining all database models:
  - `User`, `StudentProfile`, `TeacherProfile`, `EmployerProfile`, `FreelancerProfile`
  - `Course`, `CourseSection`, `Lesson`, `LessonResource`, `Quiz`, `QuizQuestion`, `QuizAttempt`
  - `Enrollment`, `Payment`, `Certificate`
  - `Job`, `Proposal`, `WorkSubmission`, `Review`, `VerificationRequest`, `Notification`

#### [NEW] NestJS Modules Scaffold (`apps/api/src/modules/`)
- `auth/` (Login, Register, JWT, Roles Guard)
- `users/` (Profile management)
- `courses/` (LMS course CRUD, video metadata)
- `enrollments/` (Course enrollment tracking)
- `payments/` (Screenshot payment workflow)
- `certificates/` (PDF generation & QR verification)
- `jobs/` (AppWorks freelance job posting)
- `proposals/` (Job proposals)
- `reviews/` (Ratings & reviews)
- `verifications/` (Teacher/Freelancer/Employer identity verification)
- `notifications/` (In-app notifications via WebSockets)
- `common/` (Interceptors, filters, decorators, guards)
- `config/` (Environment configuration)

---

### `packages/shared` (Shared TypeScript Contracts)

#### [NEW] [packages/shared/package.json](file:///c:/wamp64/www/Dream_More/packages/shared/package.json)
- Shared TypeScript interfaces, DTOs, Zod validation schemas, and Enums (UserRole, PaymentStatus, JobStatus, ProposalStatus).

---

## Verification Plan

### Automated Tests / Commands
- Run `npm install` at root to verify all monorepo dependencies install without error.
- Run `npx prisma validate` inside `apps/api` to verify schema correctness.
- Run `npm run build` or `npx tsc --noEmit` across `apps/web`, `apps/api`, and `packages/shared` to verify TypeScript setup.

### Manual Verification
- Verify `node_modules` folders exist in root and subfolders so everything runs fully offline.
- Test launching `npm run dev:web` and `npm run dev:api` to confirm dev servers start cleanly.
