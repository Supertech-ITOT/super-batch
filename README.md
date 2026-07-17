# SuperBatch

Enterprise ISA-88 Batch Management Software

SuperBatch is an enterprise-grade batch management system built around the ISA-88 standard. It provides plant modeling, recipe management, batch execution, scheduling, reporting, user management, and other manufacturing features.

---

## Project Structure

```
super-batch/
│
├── apps/
│   ├── frontend/      # Next.js + React
│   ├── backend/       # Spring Boot
│   └── desktop/       # Electron Desktop
│
├── docs/              # Project documentation
│
├── .gitignore
└── README.md
```

---

## Technology Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- TanStack Query
- React Hook Form
- Recharts

### Backend

- Spring Boot
- Java
- Spring Data JPA
- Spring Security
- SQL Server

### Desktop

- Electron
- TypeScript

---

# Features

- ISA-88 Plant Model
- Master Recipe
- Control Recipe
- Batch Execution
- Batch Scheduler
- Batch Reports
- Recipe SOP
- Material Management
- Parameter Management
- User & Role Management
- Audit Trail
- Dashboard
- Alarm & Notification
- Equipment Management

---

# Getting Started

## Frontend

```bash
cd apps/frontend

npm install

npm run dev
```

Runs on:

```
http://localhost:3000
```

---

## Backend

```bash
cd apps/backend

./mvnw spring-boot:run
```

or

```bash
mvn spring-boot:run
```

Runs on:

```
http://localhost:8080
```

---

## Desktop

```bash
cd apps/desktop

npm install

npm run dev
```

---

# Development Workflow

1. Start Backend

```bash
cd apps/backend
mvn spring-boot:run
```

2. Start Frontend

```bash
cd apps/frontend
npm run dev
```

3. Start Desktop (Optional)

```bash
cd apps/desktop
npm run dev
```

---

# Build

## Frontend

```bash
npm run build
```

## Backend

```bash
mvn clean package
```

## Desktop

```bash
npm run build
```

---

# Documentation

Project documentation is available inside:

```
docs/
```

Including:

- Architecture
- API Documentation
- Database
- Release Notes
- ISA-88

---

# Versioning

Semantic Versioning

```
Major.Minor.Patch
```

Example

```
1.0.0
```

---

# License

Proprietary

Copyright © SuperTech Automation Pvt. Ltd.

All rights reserved.
