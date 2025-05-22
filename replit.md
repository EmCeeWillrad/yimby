# AffordableHomes Application Documentation

## Overview

AffordableHomes is a web application designed to help users find affordable housing options. The platform connects people with affordable housing properties including Section 8, income-restricted, and subsidized housing options. The application features property listings with detailed information, search functionality with filters, housing program details, and user account features like saved properties.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

This project follows a full-stack JavaScript/TypeScript architecture with a clear separation between client and server components.

### Frontend
- **React**: Single page application with routing via Wouter
- **TailwindCSS**: For styling with a custom theme
- **React Query**: For data fetching and state management
- **Shadcn/UI**: Component library based on Radix UI primitives

### Backend
- **Express.js**: Node.js web server framework
- **Drizzle ORM**: Database ORM with schema definitions
- **PostgreSQL**: Database (can be added via Replit modules)

### Data Layer
- Database schema defined using Drizzle ORM
- Primary entities: Users, Properties, and SavedProperties

## Key Components

### Client-Side Components

1. **Pages**:
   - Home: Landing page with hero section, popular listings, and program info
   - PropertySearch: Search interface with filters
   - PropertyDetails: Individual property information
   - HousingPrograms: Information about housing assistance programs
   - SavedProperties: User's saved property listings

2. **Layout Components**:
   - Header: Site navigation
   - Footer: Site information
   - MobileAppBar: Mobile-specific navigation

3. **UI Components**:
   - A comprehensive collection of UI components built with Radix UI primitives
   - Custom components like PropertyCard, ProgramCard, etc.

### Server-Side Components

1. **API Routes**:
   - Property endpoints (list, filter, details)
   - User authentication (implied but not fully implemented)
   - Saved properties management

2. **Data Storage**:
   - Currently using a memory storage implementation
   - Schema designed for PostgreSQL using Drizzle ORM

## Data Flow

1. **Property Search Flow**:
   - User inputs search criteria via the PropertySearch component
   - Frontend makes API requests to `/api/properties` with filter parameters
   - Server queries the database and returns filtered properties
   - Results displayed as PropertyCard components

2. **Property Details Flow**:
   - User selects a property from search results
   - Frontend fetches detailed information via `/api/properties/:id`
   - Server returns comprehensive property data
   - Data displayed in the PropertyDetails component

3. **Saved Properties Flow**:
   - Authenticated users can save properties via the API
   - Saved properties are stored in the database
   - Users can view their saved properties in a dedicated page

## External Dependencies

### Frontend Dependencies
- **@radix-ui**: UI component primitives
- **@tanstack/react-query**: Data fetching and state management
- **class-variance-authority**: For component styling variations
- **wouter**: Lightweight routing library
- **date-fns**: Date manipulation utilities
- **lucide-react**: Icon library

### Backend Dependencies
- **drizzle-orm**: Database ORM
- **express**: Web server framework
- **zod**: Schema validation
- **@neondatabase/serverless**: Database connection (for serverless environments)

## Deployment Strategy

The application is configured for deployment on Replit with:

1. **Development Mode**:
   - Run with `npm run dev` which uses `tsx` for TypeScript execution
   - Vite development server with hot module reloading

2. **Production Build**:
   - Frontend built with Vite
   - Backend bundled with esbuild
   - Combined into a single distribution

3. **Database**:
   - PostgreSQL module available in Replit
   - Schema migration using Drizzle Kit

## Getting Started

1. **Setup Database**:
   - The application expects a PostgreSQL database
   - Set the `DATABASE_URL` environment variable
   - Run `npm run db:push` to create the database schema

2. **Development**:
   - Run `npm run dev` to start the development server
   - The application will be available on port 5000

3. **Production**:
   - Run `npm run build` to create a production build
   - Run `npm run start` to start the production server