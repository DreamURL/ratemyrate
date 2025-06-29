# Competitiveness Rank Test Application

## Overview

This is a multilingual single-page web application (SPA) that provides a fun, competitive self-assessment service. Users evaluate their achievements across 10 metrics to receive a competitiveness ranking (S, A, B, C grades). The application supports 5 languages (English, Korean, Japanese, Chinese, and Spanish) and is designed for global users.

## System Architecture

The application follows a modern full-stack architecture with clear separation between frontend and backend:

- **Frontend**: React-based SPA using Vite for development and build tooling
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM (configured but not actively used in current implementation)
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Internationalization**: i18next for multi-language support
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for client-side routing

## Key Components

### Frontend Architecture
- **Component Structure**: Modular React components with TypeScript
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Font Strategy**: Multi-font setup supporting CJK languages (Noto Sans family)

### Backend Architecture
- **Server Framework**: Express.js with TypeScript
- **Middleware**: JSON parsing, URL encoding, custom logging middleware
- **Error Handling**: Centralized error handling with status codes
- **Development Setup**: Vite integration for HMR in development

### Internationalization System
- **Translation Files**: JSON-based translations for 5 languages
- **Language Detection**: Browser language detection with localStorage persistence
- **Font Switching**: Automatic font switching for CJK languages
- **Component Integration**: useTranslation hook throughout components

### Assessment Logic
- **Scoring Algorithm**: Weighted scoring system across 10 metrics
- **Grade Calculation**: Letter grades (S, A, B, C) based on total weighted score
- **Visualization**: Radar chart for profile visualization using Chart.js

## Data Flow

1. User selects language (persisted in localStorage)
2. User fills out assessment form with 10 metrics
3. Form validation ensures all fields are completed
4. Client-side scoring algorithm calculates weighted scores
5. Results displayed with grade, radar chart, and detailed breakdown
6. Social sharing functionality for Twitter/X integration

## External Dependencies

### Core Libraries
- **React**: Frontend framework with hooks and context
- **Express**: Backend web framework
- **Drizzle ORM**: Database ORM (PostgreSQL configured)
- **Vite**: Build tool and development server
- **TypeScript**: Type safety across the application

### UI/UX Libraries
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Chart.js**: Data visualization for radar charts
- **Framer Motion**: Animation library
- **Lucide React**: Icon library

### Development Tools
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Development tooling for Repl.it

## Deployment Strategy

The application is configured for deployment with:

- **Build Process**: Vite builds frontend to `dist/public`, esbuild bundles server
- **Production Server**: Express serves built static files and API routes
- **Environment Variables**: DATABASE_URL for PostgreSQL connection
- **Static Assets**: Frontend assets served from build directory
- **API Routes**: All backend routes prefixed with `/api`

The architecture supports deployment to various platforms including Cloudflare Pages (as mentioned in requirements) or traditional Node.js hosting environments.

## Changelog
- June 29, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.