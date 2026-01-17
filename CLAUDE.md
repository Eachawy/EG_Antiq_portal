# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with the Antiq Portal frontend.

## Essential Commands

### Development
```bash
npm run dev         # Start development server on port 3002
npm run build       # Build for production
npm start           # Start production server on port 3002
```

### Code Quality
```bash
npm run lint             # Run ESLint
npm run format           # Format code with Prettier
npm run format:check     # Check formatting without changes
```

### Docker
```bash
docker build -t antiq-portal .
docker run -p 3002:3002 -e NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api/v1 antiq-portal
docker-compose up        # Run with docker-compose
```

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS 4.x with RTL support
- **UI Libraries**:
  - PrimeReact for complex components
  - Radix UI for accessible primitives
  - Framer Motion for animations
- **Maps**: OpenLayers (ol)
- **HTTP Client**: Axios with interceptors
- **i18n**: next-intl for internationalization
- **State Management**: React Context API
- **Form Validation**: Zod
- **Fonts**: Cairo font family (Arabic-optimized)

### Key Features
1. **Bilingual Support (English & Arabic)**: Full RTL support with locale-specific routes
2. **Authentication**: JWT-based auth with OAuth support (Google, Facebook, Apple)
3. **Monument Management**: Browse, search, and favorite Egyptian monuments
4. **Interactive Map**: OpenLayers integration for monument locations
5. **Books & Sources**: Academic resources about monuments
6. **User Features**: Favorites, browsing history, saved searches, settings
7. **Dark Mode**: Theme switching support
8. **Responsive**: Mobile-first design

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── [locale]/                 # Locale-prefixed routes (/en, /ar)
│   │   ├── layout.tsx            # Locale layout (sets dir, lang)
│   │   ├── page.tsx              # Home page
│   │   ├── about/                # About page
│   │   ├── sites/                # Monuments/sites browsing
│   │   │   ├── page.tsx          # List view with search
│   │   │   ├── [siteId]/         # Monument detail page
│   │   │   └── components/       # Site-specific components
│   │   ├── map/                  # Interactive map view
│   │   ├── eras/                 # Historical eras
│   │   │   └── [erasId]/         # Era detail page
│   │   ├── books/                # Books section
│   │   ├── tour-guides/          # Tour guides
│   │   ├── contact/              # Contact page
│   │   ├── profile/              # User profile (protected)
│   │   ├── favorites/            # User favorites (protected)
│   │   ├── saved-searches/       # Saved searches (protected)
│   │   ├── history/              # Browsing history (protected)
│   │   ├── settings/             # User settings (protected)
│   │   └── HomePage-Components/  # Home page sections
│   ├── layout.tsx                # Root layout
│   └── global-error.tsx          # Global error boundary
├── components/
│   ├── auth/                     # Auth-related components
│   │   ├── AuthContext.tsx       # Authentication state
│   │   ├── LoginModal.tsx        # Login/register modal
│   │   ├── FavoriteContext.tsx   # Favorites management
│   │   └── CartContext.tsx       # Shopping cart for books
│   ├── common/                   # Shared components
│   │   ├── ErrorState.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── ThemeContext.tsx
│   │   └── ThemeToggle.tsx
│   ├── layout/                   # Layout components
│   │   ├── Header.tsx            # Main navigation
│   │   ├── Footer.tsx
│   │   └── LanguageSwitcher.tsx
│   └── ui/                       # Base UI components
│       ├── Button.tsx
│       └── Input.tsx
├── features/                     # Feature modules (old structure, partially used)
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   └── utils/
│   └── dashboard/
├── lib/
│   ├── api/                      # API layer
│   │   ├── http.ts               # Axios instance with interceptors
│   │   ├── errors.ts             # Error handling
│   │   ├── endpoints/            # API endpoint modules
│   │   │   ├── auth.ts
│   │   │   └── dashboard.ts
│   │   └── types/                # API DTOs
│   │       ├── common.ts
│   │       ├── auth.dto.ts
│   │       └── dashboard.dto.ts
│   └── env.ts                    # Environment validation with Zod
├── i18n/
│   ├── config.ts                 # Locale configuration
│   ├── routing.ts                # next-intl routing
│   └── request.ts                # Server-side i18n config
├── styles/                       # Global styles
│   ├── index.css                 # Main entry point
│   ├── tailwind.css
│   ├── global-styles.css
│   ├── fonts.css                 # Cairo font definitions
│   ├── theme-light.css
│   ├── theme-dark.css
│   ├── primereact-theme.css
│   └── fonts/                    # Cairo font files (.ttf, .otf, .woff, .eot)
├── types/                        # TypeScript types
│   ├── index.ts
│   └── next-intl.d.ts
└── middleware.ts                 # Locale detection + auth guards
```

## Core Concepts

### 1. Internationalization (i18n)

**Supported Locales**: English (en), Arabic (ar)

**How it works**:
- All routes are prefixed with locale: `/en/...`, `/ar/...`
- Middleware handles locale detection (cookie → Accept-Language → default 'en')
- Automatic RTL for Arabic, LTR for English
- Locale stored in `NEXT_LOCALE` cookie

**Configuration**:
- `src/i18n/config.ts` - Defines locales and directions
- `src/i18n/routing.ts` - next-intl routing setup
- `src/middleware.ts` - Locale detection logic

**Usage**:
```typescript
import { useTranslations } from 'next-intl';

function Component() {
  const t = useTranslations('common');
  return <h1>{t('header.title')}</h1>;
}
```

### 2. Authentication System

**Two Types of Auth**:

1. **Context-based Auth** (`AuthContext.tsx`):
   - Client-side only
   - Used for user state management
   - Stores user in localStorage
   - Simple login/logout/updateProfile

2. **API-based Auth** (`features/auth`):
   - JWT tokens stored in cookies (`auth_token`)
   - Integrated with backend API
   - Supports OAuth providers

**Protected Routes**:
- Middleware checks for `auth_token` cookie
- Protected routes: `/profile`, `/favorites`, `/saved-searches`, `/history`, `/settings`
- Redirects to `/[locale]/login?returnUrl=...` if not authenticated

**User Interface**:
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  provider: 'email' | 'google' | 'facebook' | 'apple';
  joinDate: string;
  bio?: string;
  location?: string;
  phone?: string;
  interests?: string[];
}
```

### 3. API Integration

**HTTP Client** (`src/lib/api/http.ts`):
- Base URL from `NEXT_PUBLIC_API_BASE_URL`
- Automatically attaches JWT token from cookie
- Timeout: 30 seconds
- Request interceptor: Adds `Authorization: Bearer <token>`
- Response interceptor: Handles 401 (logout + redirect), normalizes errors

**Making API Calls**:
```typescript
import { httpClient } from '@/lib/api/http';

// GET request
const response = await httpClient.get<ApiResponse<Monument[]>>('/monuments');
const monuments = response.data.data;

// POST request
const response = await httpClient.post('/auth/login', { email, password });
```

**Error Handling**:
- All errors normalized to `ApiError` class
- Automatic logout on 401
- Structured error responses

### 4. State Management

**Context Providers**:
- `AuthContext` - User authentication state
- `FavoriteContext` - User favorites
- `CartContext` - Shopping cart for books
- `ThemeContext` - Dark/light mode

**Usage Pattern**:
```typescript
import { useAuth } from '@/components/auth/AuthContext';

function Component() {
  const { user, isAuthenticated, login, logout } = useAuth();
  // ...
}
```

### 5. Routing Structure

**Locale-prefixed Routes**:
- `/en` or `/ar` prefix required for all pages
- Root `/` redirects to locale-prefixed home
- Middleware handles locale detection

**Main Routes**:
- `/[locale]` - Home page
- `/[locale]/about` - About page
- `/[locale]/sites` - Monuments list with search
- `/[locale]/sites/[siteId]` - Monument detail
- `/[locale]/map` - Interactive map
- `/[locale]/eras/[erasId]` - Historical era details
- `/[locale]/books` - Books section
- `/[locale]/tour-guides` - Tour guides
- `/[locale]/contact` - Contact form

**Protected Routes** (require auth):
- `/[locale]/profile` - User profile
- `/[locale]/favorites` - Saved favorites
- `/[locale]/saved-searches` - Saved searches
- `/[locale]/history` - Browsing history
- `/[locale]/settings` - User settings

### 6. Styling System

**Tailwind CSS**:
- Version 4.x
- RTL plugin for Arabic support
- Custom configuration in `tailwind.config.ts`

**Theme System**:
- Light and dark modes via `theme-light.css` and `theme-dark.css`
- `ThemeContext` for theme state
- `ThemeToggle` component for switching

**Font System**:
- Cairo font family (optimized for Arabic)
- Multiple weights: Light, Regular, Medium, SemiBold, Bold, ExtraBold, Black
- Formats: TTF, OTF, WOFF, EOT

### 7. Map Integration

**OpenLayers** (`src/app/[locale]/map/components/OpenLayersMap.tsx`):
- Interactive monument map
- Custom markers for monument locations
- Zoom and pan controls
- Click handlers for monument details

## Environment Variables

Required environment variables:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api/v1

# Optional
NEXT_PUBLIC_APP_URL=http://localhost:3002
NODE_ENV=development
```

**Environment Validation**:
- Uses Zod schema in `src/lib/env.ts`
- Validates on app startup
- Type-safe access via `env` object

## Common Development Tasks

### Adding a New Page

1. Create page in `src/app/[locale]/your-page/page.tsx`:
```typescript
export default function YourPage() {
  return <div>Your content</div>;
}
```

2. Update navigation in `Header.tsx` if needed

### Adding a New API Endpoint

1. Define DTO in `src/lib/api/types/your-feature.dto.ts`:
```typescript
export interface YourData {
  id: string;
  name: string;
}
```

2. Create endpoint in `src/lib/api/endpoints/your-feature.ts`:
```typescript
import { httpClient } from '../http';

export const yourFeatureEndpoints = {
  async getAll(): Promise<YourData[]> {
    const response = await httpClient.get('/your-endpoint');
    return response.data.data;
  },
};
```

3. Use in component:
```typescript
import { yourFeatureEndpoints } from '@/lib/api/endpoints/your-feature';

const data = await yourFeatureEndpoints.getAll();
```

### Adding Translations

Translations are embedded in the codebase (not in separate JSON files based on the current implementation).

To add translatable text:
```typescript
import { useTranslations } from 'next-intl';

function Component() {
  const t = useTranslations('namespace');
  return <p>{t('key')}</p>;
}
```

### Protecting a Route

Update `src/middleware.ts`:
```typescript
const isProtectedRoute =
  pathname.includes('/dashboard') ||
  pathname.includes('/profile') ||
  pathname.includes('/your-new-route'); // Add your route
```

### Adding a Context Provider

1. Create context file in `src/components/` or `src/lib/`:
```typescript
'use client';

import { createContext, useContext } from 'react';

const YourContext = createContext<YourContextType | undefined>(undefined);

export function YourProvider({ children }) {
  // Your state logic
  return (
    <YourContext.Provider value={value}>
      {children}
    </YourContext.Provider>
  );
}

export function useYour() {
  const context = useContext(YourContext);
  if (!context) {
    throw new Error('useYour must be used within YourProvider');
  }
  return context;
}
```

2. Add to layout:
```typescript
// In src/app/[locale]/layout.tsx
<YourProvider>
  {children}
</YourProvider>
```

## API Integration with Backend

### Backend Connection

The frontend connects to the backend API (from `/Volumes/Data/Ancient/Antiq/EG_Antiq`):

**Backend URL**: Configured via `NEXT_PUBLIC_API_BASE_URL` (default: `http://localhost:3000/api/v1`)

**Authentication Flow**:
1. User logs in via `/api/v1/portal/auth/login` or OAuth endpoints
2. Backend returns JWT access token
3. Frontend stores token in `auth_token` cookie
4. All subsequent requests include token via `Authorization: Bearer <token>` header

**Key Backend Endpoints Used**:
- `POST /api/v1/portal/auth/login` - Login
- `POST /api/v1/portal/auth/register` - Register
- `POST /api/v1/portal/auth/google` - Google OAuth
- `POST /api/v1/portal/auth/facebook` - Facebook OAuth
- `POST /api/v1/portal/auth/apple` - Apple OAuth
- `GET /api/v1/portal/monuments` - Get monuments list
- `GET /api/v1/portal/monuments/:id` - Get monument detail
- `POST /api/v1/favorites` - Add favorite
- `GET /api/v1/favorites` - Get user favorites
- `POST /api/v1/browsing-history` - Track visit
- `GET /api/v1/browsing-history` - Get history
- `POST /api/v1/saved-searches` - Save search
- `GET /api/v1/saved-searches` - Get saved searches
- `GET /api/v1/portal/settings` - Get user settings
- `PUT /api/v1/portal/settings` - Update settings

## Important Conventions

### File Naming
- React components: PascalCase (e.g., `Header.tsx`, `LoginModal.tsx`)
- Utilities/helpers: camelCase (e.g., `http.ts`, `errors.ts`)
- Types: PascalCase with `.types.ts` suffix (e.g., `auth.types.ts`)
- DTOs: `.dto.ts` suffix (e.g., `auth.dto.ts`)

### Component Structure
```typescript
'use client'; // Add if using hooks/client-side features

import { ... } from '...';

interface ComponentProps {
  // Props definition
}

export function Component({ prop1, prop2 }: ComponentProps) {
  // Component logic

  return (
    // JSX
  );
}
```

### Styling
- Use Tailwind classes primarily
- Custom CSS only when necessary
- RTL-aware: Use `start`/`end` instead of `left`/`right` in Tailwind
- Theme-aware: Use CSS variables defined in theme files

### Type Safety
- Always define TypeScript interfaces/types
- Use strict mode (enabled in `tsconfig.json`)
- Avoid `any` type
- Use Zod for runtime validation

## Troubleshooting

### Port Already in Use
If port 3002 is already in use:
```bash
# Find process using port 3002
lsof -i :3002

# Kill the process
kill -9 <PID>
```

### API Connection Issues
1. Check `NEXT_PUBLIC_API_BASE_URL` is correct
2. Ensure backend is running on correct port
3. Check CORS settings in backend
4. Verify auth token in browser cookies

### i18n Not Working
1. Check locale in URL (`/en/...` or `/ar/...`)
2. Clear `NEXT_LOCALE` cookie
3. Restart dev server

### Build Errors
```bash
# Clean build cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

## Quick Reference

### Default Port
- Development: 3002
- Production: 3002

### Locales
- English: `en` (LTR)
- Arabic: `ar` (RTL)

### Theme
- Light mode (default)
- Dark mode (via ThemeToggle)

### Protected Routes Pattern
All routes matching these patterns require authentication:
- `/[locale]/profile`
- `/[locale]/favorites`
- `/[locale]/saved-searches`
- `/[locale]/history`
- `/[locale]/settings`
