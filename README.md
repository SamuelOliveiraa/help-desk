# [Help Desk](https://help-desk-samuel.vercel.app/login)

![Project Help Desk Image](public/og-image.png)

A web application built with Next.js to centralize technical support services. The system offers distinct portals for administrators, users, and technicians, allowing for the creation, tracking, and resolution of tickets with role-based access control.

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
  - [Environment Variables](#environment-variables)
  - [Database and Prisma](#database-and-prisma)
  - [Running the Project](#running-the-project)
- [Available Scripts](#available-scripts)
- [Folder Structure](#folder-structure)
- [Authentication and Authorization](#authentication-and-authorization)
- [Roadmap and Improvements](#roadmap-and-improvements)
- [License](#license)

## Overview

The Help Desk centralizes the complete lifecycle management of a support ticket: creation, prioritization, assignment to technicians, execution, and closure. All internal operations are protected by JWT authentication stored in cookies, while the Next.js middleware ensures that each user can only access routes corresponding to their role.

## Key Features

- Authentication with email and password and issuance of secure JWT tokens.
- Exclusive dashboards for `admin`, `user`, and `technician` with automatic redirection after login.
- Users can open tickets by selecting services, with automatic calculation of the cost and an order summary.
- Ticket management by the administrator: view by status (`open`, `inProgress`, `finished`) and access to details.
- Service catalog with the ability to activate/deactivate services and set prices.
- Integration with Prisma ORM for managing users, services, sub-services, and tickets in a PostgreSQL database.
- Responsive UI built with Radix UI components, Tailwind CSS, and a custom design system.

## Technologies

- Next.js 15 (App Router)
- React 19 with TypeScript
- Tailwind CSS and Tailwind Merge
- Prisma ORM + PostgreSQL
- Radix UI (Dialog, Dropdown, Select, Tooltip, etc.)
- React Hook Form and React Hot Toast
- Axios for integrations with internal API routes
- JSON Web Tokens with the `jose` library

## Prerequisites

- Node.js 18 or higher
- NPM (or Yarn/PNPM/Bun, if you prefer)
- Accessible PostgreSQL database
- An account with permissions to run Prisma migrations on the configured database

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/help-desk.git
   cd help-desk
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
   > If you prefer another package manager, adapt the commands (`yarn`, `pnpm`, `bun`).

### Environment Variables

Create a `.env` file in the project root (or `.env.local`, if you prefer to keep it separate from version control) with the following settings:

```
DATABASE_URL="postgresql://user:password@host:5432/database_name"
DIRECT_URL="postgresql://user:password@host:5432/database_name"
JWT_SECRET="a_very_secret_and_complex_key"
```

- `DATABASE_URL`: used by Prisma to connect to the main database.
- `DIRECT_URL`: direct connection used by tools like Prisma Studio; can be the same as `DATABASE_URL`.
- `JWT_SECRET`: key used to sign and validate JWT tokens. Change this to a robust value; the fallback in the code is for development purposes only.

### Database and Prisma

1. Apply existing migrations or create new ones:
   ```bash
   npx prisma migrate dev
   ```
2. Generate the Prisma client:
   ```bash
   npx prisma generate
   ```
3. (Optional) Use Prisma Studio to inspect the data:
   ```bash
   npx prisma studio
   ```

The current migrations create the tables for users, services, sub-services, and tickets, as well as enums for roles (`admin`, `user`, `technician`) and ticket statuses.

### Running the Project

- Development environment:

  ```bash
  npm run dev
  ```

  The application will be available at `http://localhost:3000`.

- Production build:
  ```bash
  npm run build
  npm run start
  ```

## Available Scripts

- `npm run dev`: starts the Next.js server in development mode.
- `npm run build`: generates the Prisma client, compiles the application, and runs a type-check.
- `npm run start`: starts the server in production mode (requires a prior build).
- `npm run lint`: runs ESLint with the rules defined by Next.js/TypeScript.

## Folder Structure

```
.
├── prisma/               # Prisma schema, migrations, and local database
├── public/               # Static assets (logos, favicon, images)
└── src/
    ├── app/              # Public and private routes (App Router)
    │   ├── api/          # API routes (login, users, tickets, services)
    │   ├── (public)/     # Authentication pages (login and register)
    │   └── (private)/    # Dashboards for admin, user, and technician
    ├── components/       # Design system and shared components
    ├── lib/              # API services, authentication, and Prisma utilities
    ├── types/            # Shared types
    └── utils/            # Formatting helpers, cookies, and authentication
```

## Authentication and Authorization

- Logging in generates a JWT token stored in a cookie with a 3-day validity.
- The middleware (`src/middleware.ts`) intercepts all private routes, validating the token.
- Users without a valid token are redirected to `/login`.
- After validation, the middleware automatically redirects each user to the dashboard corresponding to their role:
  - `/dashboard/admin`
  - `/dashboard/user`
  - `/dashboard/technician`

## Roadmap and Improvements

- ✅ User registration and authentication with role control.
- ✅ Complete flow for opening and tracking tickets.
- 🔜 Implement email notifications.
- 🔜 Add React Query to the project to improve performance and caching.
- 🔜 Add automated tests (unit and e2e).

## License

This project is licensed under the terms of the [MIT License](LICENSE).
