# Antiq Portal

Production-ready Next.js application with comprehensive internationalization, authentication, and Docker deployment support.

## Features

- **Next.js 14+** with App Router
- **TypeScript** with strict mode and path aliases
- **Internationalization (i18n)** - English and Arabic with full RTL support using next-intl
- **Tailwind CSS** with RTL plugin for styling
- **Axios-based API layer** with request/response interceptors
- **Authentication skeleton** with token-based auth and route protection
- **Error handling** - Global and locale-specific error boundaries
- **Environment validation** using Zod
- **Docker deployment** with multi-stage Alpine build
- **ESLint & Prettier** with Tailwind class sorting

## Getting Started

### Prerequisites

- Node.js 20+
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Antiq_portal
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env.local
   ```

4. Update `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NODE_ENV=development
   ```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The app will automatically redirect to `/en` (English) or respect your browser's language preference.

### Build

Build for production:

```bash
npm run build
```

Start production server:

```bash
npm start
```

### Linting & Formatting

```bash
# Run ESLint
npm run lint

# Format code with Prettier
npm run format

# Check formatting
npm run format:check
```

## Project Structure

```
Antiq_portal/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── [locale]/                 # Locale-prefixed routes
│   │   │   ├── layout.tsx            # Locale layout (sets dir attribute)
│   │   │   ├── page.tsx              # Home page
│   │   │   ├── error.tsx             # Locale error boundary
│   │   │   ├── login/                # Login page
│   │   │   ├── dashboard/            # Protected dashboard
│   │   │   └── about/                # About page
│   │   ├── global-error.tsx          # Global error boundary
│   │   └── layout.tsx                # Root layout
│   ├── components/
│   │   ├── common/                   # Shared components (ErrorState, LoadingSpinner)
│   │   ├── layout/                   # Layout components (Header, Footer, LanguageSwitcher)
│   │   └── ui/                       # Base UI components (Button, Input)
│   ├── features/
│   │   ├── auth/                     # Authentication feature
│   │   │   ├── components/           # LoginForm, ProtectedRoute
│   │   │   ├── hooks/                # useAuth
│   │   │   ├── services/             # auth.service.ts
│   │   │   ├── types/                # Auth types
│   │   │   └── utils/                # Token management, guards
│   │   └── dashboard/                # Dashboard feature
│   │       ├── components/           # DashboardStats
│   │       └── services/             # dashboard.service.ts
│   ├── i18n/
│   │   ├── config.ts                 # Locales configuration
│   │   ├── routing.ts                # next-intl routing setup
│   │   └── request.ts                # next-intl request config
│   ├── lib/
│   │   ├── api/
│   │   │   ├── http.ts               # Axios instance with interceptors
│   │   │   ├── errors.ts             # ApiError class
│   │   │   ├── endpoints/            # API endpoint modules
│   │   │   └── types/                # DTOs
│   │   └── env.ts                    # Environment validation
│   ├── middleware.ts                 # Locale detection + auth guards
│   ├── styles/globals.css            # Global styles
│   └── types/                        # TypeScript type definitions
├── public/
│   └── locales/                      # Translation files
│       ├── en/                       # English translations
│       └── ar/                       # Arabic translations
├── Dockerfile                        # Multi-stage Docker build
├── docker-compose.yml                # Docker Compose configuration
└── README.md                         # This file
```

## Internationalization (i18n)

### How It Works

The application uses **next-intl** for internationalization with the following features:

- **Locale-prefixed routes**: All routes are prefixed with the locale (`/en/...`, `/ar/...`)
- **Automatic direction**: RTL for Arabic, LTR for English
- **Locale persistence**: User's choice is saved in a cookie
- **Locale detection**: Cookie → Accept-Language header → default "en"

### Adding a New Language

1. Add the locale to `src/i18n/config.ts`:
   ```typescript
   export const locales = ['en', 'ar', 'fr'] as const;  // Add 'fr'
   export const localeNames: Record<Locale, string> = {
     en: 'English',
     ar: 'العربية',
     fr: 'Français',  // Add French
   };
   ```

2. Add direction in `src/i18n/config.ts`:
   ```typescript
   export const localeDirections: Record<Locale, 'ltr' | 'rtl'> = {
     en: 'ltr',
     ar: 'rtl',
     fr: 'ltr',  // Add direction
   };
   ```

3. Create translation files in `public/locales/fr/`:
   - `common.json`
   - `auth.json`
   - `dashboard.json`

4. Update `src/i18n/routing.ts` if needed.

### Translation Files

Translation files are located in `public/locales/{locale}/`:

- **common.json**: Header, footer, general UI
- **auth.json**: Login, authentication messages
- **dashboard.json**: Dashboard-specific content

Example usage in components:

```typescript
import { useTranslations } from 'next-intl';

export default function Component() {
  const t = useTranslations('common');
  return <h1>{t('header.title')}</h1>;
}
```

## API Layer

### Axios HTTP Client

The API layer uses Axios with the following features:

- **Base URL**: Configured via `NEXT_PUBLIC_API_BASE_URL`
- **Request interceptor**: Automatically attaches auth token from cookie
- **Response interceptor**: Normalizes errors, handles 401 (logout + redirect)

### Adding a New Endpoint

1. Create a DTO in `src/lib/api/types/`:
   ```typescript
   // src/lib/api/types/products.dto.ts
   export interface Product {
     id: string;
     name: string;
     price: number;
   }
   ```

2. Create an endpoint module in `src/lib/api/endpoints/`:
   ```typescript
   // src/lib/api/endpoints/products.ts
   import { httpClient } from '../http';
   import type { Product } from '../types/products.dto';

   export const productEndpoints = {
     async getAll(): Promise<Product[]> {
       const response = await httpClient.get<ApiResponse<Product[]>>('/products');
       return response.data.data;
     },
   };
   ```

3. Create a service in your feature folder:
   ```typescript
   // src/features/products/services/products.service.ts
   import { productEndpoints } from '@/lib/api/endpoints/products';

   export const productsService = {
     getProducts: () => productEndpoints.getAll(),
   };
   ```

## Authentication

### How It Works

- **Token storage**: HttpOnly cookies (secure, XSS-protected)
- **Server-side**: Middleware checks token and redirects to login if needed
- **Client-side**: `useAuth` hook for login/logout
- **Route protection**: Middleware automatically protects `/dashboard` routes

### Protected Routes

To protect a route, the middleware in `src/middleware.ts` automatically checks for the `auth_token` cookie. If absent, the user is redirected to login.

To add more protected routes, update the `isProtectedRoute` check in `middleware.ts`:

```typescript
const isProtectedRoute = pathname.includes('/dashboard') || pathname.includes('/profile');
```

### Demo Login

The app uses a mock authentication system. Use any email and password to login:

```
Email: demo@example.com
Password: any password
```

## Environment Variables

Required environment variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API base URL | `http://localhost:8000/api` |
| `NEXT_PUBLIC_APP_URL` | Frontend app URL (optional) | `http://localhost:3000` |
| `NODE_ENV` | Environment | `development` or `production` |

## Docker Deployment

### Build Docker Image

```bash
docker build -t antiq-portal .
```

### Run Docker Container

```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_BASE_URL=https://api.example.com \
  antiq-portal
```

### Using Docker Compose

1. Create `.env.production`:
   ```env
   NEXT_PUBLIC_API_BASE_URL=https://api.example.com
   NODE_ENV=production
   ```

2. Start services:
   ```bash
   docker-compose up
   ```

3. Stop services:
   ```bash
   docker-compose down
   ```

### Docker Image Details

- **Base**: Alpine Node.js 20 (small image size)
- **Multi-stage build**: Optimized for production
- **Standalone output**: Self-contained Next.js build
- **Non-root user**: Runs as `nextjs` user for security
- **Port**: 3000

## Error Handling

The application has multiple layers of error handling:

1. **Global error boundary** (`app/global-error.tsx`): Catches errors in root layout
2. **Locale error boundary** (`app/[locale]/error.tsx`): Catches errors per locale with translations
3. **ErrorState component**: Reusable error display with retry
4. **API error normalization**: All API errors are converted to `ApiError` class with consistent shape

## Architecture Decisions

### Why next-intl?

- Built specifically for Next.js App Router
- Server Component support
- Type-safe translations
- Automatic locale routing

### Why HttpOnly Cookies for Auth?

- XSS protection (JavaScript cannot access)
- Automatic inclusion in requests
- SSR-compatible

### Why Axios over Fetch?

- Interceptors for request/response
- Automatic JSON parsing
- Better error handling
- Request/response transformation

### Why Standalone Output?

- Smaller Docker images
- Self-contained deployment
- All dependencies included

## Contributing

1. Follow the existing code structure
2. Use TypeScript strict mode
3. Add translations for new UI text
4. Test both English and Arabic locales
5. Run linting before committing

## License

[Your License Here]

## Support

For issues or questions, please open an issue on GitHub.
