# Mauli Home Stay - Hotel Booking Website

## Overview

A full-stack hotel booking website for "Mauli Home Stay," a homestay located in the Konkan region of Maharashtra, India. The application allows guests to browse rooms, view vegetarian food menu, check location, make bookings with payment screenshot uploads, and submit feedback. Built with a React frontend and Express backend using PostgreSQL for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **State Management**: TanStack React Query for server state caching and synchronization
- **Styling**: Tailwind CSS with custom CSS variables for theming (earthy, natural color palette)
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Animations**: Framer Motion for page transitions and micro-interactions
- **Forms**: React Hook Form with Zod validation via @hookform/resolvers
- **Build Tool**: Vite with path aliases (@/, @shared/, @assets/)

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript compiled with tsx for development, esbuild for production
- **API Design**: RESTful endpoints defined in shared/routes.ts with Zod schemas for request/response validation
- **File Uploads**: Multer middleware handling payment screenshot uploads to /uploads directory

### Data Layer
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM with drizzle-zod for automatic schema-to-validation generation
- **Schema Location**: shared/schema.ts contains all table definitions (rooms, menuItems, bookings, feedbacks)
- **Migrations**: Drizzle Kit with migrations output to /migrations directory

### Project Structure
```
├── client/src/          # React frontend
│   ├── components/      # UI components including shadcn/ui
│   ├── pages/           # Route pages (Home, Rooms, Booking, Food, Location, Feedback)
│   ├── hooks/           # Custom React hooks for data fetching
│   └── lib/             # Utilities and query client setup
├── server/              # Express backend
│   ├── routes.ts        # API route handlers with seed data
│   ├── storage.ts       # Database access layer
│   └── db.ts            # Drizzle database connection
├── shared/              # Shared between frontend and backend
│   ├── schema.ts        # Drizzle table definitions
│   └── routes.ts        # API contract definitions with Zod
└── attached_assets/     # Static images for the homestay
```

### Key Design Decisions

1. **Shared Schema Pattern**: Database schemas and API contracts live in /shared, enabling type-safe communication between frontend and backend without code duplication.

2. **Storage Abstraction**: The IStorage interface in storage.ts allows swapping database implementations. Currently uses DatabaseStorage class with Drizzle/PostgreSQL.

3. **Seed Data on Startup**: Room and menu data is seeded automatically when the database is empty, ensuring the app works immediately after deployment.

4. **Static File Serving**: Production builds serve the Vite-compiled frontend from dist/public via Express static middleware.

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via DATABASE_URL environment variable
- **connect-pg-simple**: PostgreSQL session store (available but not currently used for sessions)

### Third-Party Services
- **Google Maps**: Embedded iframe on Location page for displaying homestay location
- **Unsplash**: External image URLs used for room and menu item placeholder images in seed data

### Key NPM Packages
- **drizzle-orm** + **drizzle-kit**: Database ORM and migration tooling
- **zod**: Runtime schema validation for API requests/responses
- **@tanstack/react-query**: Async state management and caching
- **framer-motion**: Animation library
- **react-day-picker** + **date-fns**: Calendar/date selection for bookings
- **multer**: Multipart form handling for file uploads

### Environment Variables Required
- `DATABASE_URL`: PostgreSQL connection string (required)