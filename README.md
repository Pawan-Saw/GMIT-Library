# GMIT Library

A modern Library Management System (LMS) built with React, TypeScript, Vite, and Tailwind CSS. It includes separate portals for Students and Admins with protected routes and demo data.

## Features

- Student portal: dashboard, catalog search/filter, borrowed books, digital ID, notifications, request a book
- Admin portal: dashboard, manage books, manage students, issue/return, fines overview, reports export
- Mock authentication with role-based access and protected routes
- Global `DataContext` providing books, students, borrowings, notifications, and stats
- Responsive UI with Tailwind and Lucide icons

## Tech Stack

- React + TypeScript + Vite
- Tailwind CSS
- React Router
- Lucide Icons

## Getting Started

1) Install dependencies

```bash
npm install
```

2) Start the dev server

```bash
npm run dev
```

3) Build for production

```bash
npm run build
```

## Demo Credentials

- Student: `alex@student.gmit.ie` / `123456`
- Admin: `admin@gmit.ie` / `123456`

After login you will be redirected to the appropriate dashboard.

## Project Structure

```
src/
  components/
    Layout/
    UI/
  context/
    AuthContext.tsx
    DataContext.tsx
  pages/
    student/
    admin/
  types/
  App.tsx
```

## Notes

- Data is in-memory via `DataContext` for demo purposes.
- Admin “Reports” page exports a JSON snapshot of in-memory data.

## License

MIT
