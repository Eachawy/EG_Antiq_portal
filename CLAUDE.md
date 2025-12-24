# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Egyptian Antiquities Portal built with Next.js 15, TypeScript, SASS, and custom Webpack configuration. The project uses React 19 and follows the Next.js App Router architecture.

**Application Structure:**
The portal provides information about Egyptian historical sites with the following sections:
- Home: Landing page
- Sites: Collection of historical and cultural sites
- Map: Geographic visualization
- Tour Guides: Tour guide information
- About: Project information
- Contact: Contact form

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Architecture

### Custom Webpack Integration

This project uses a hybrid approach combining Next.js's built-in webpack configuration with custom webpack configs:

- **next.config.ts**: Merges custom webpack configurations into Next.js's default webpack config
- **webpack/webpack.common.js**: Base configuration shared between dev and prod
  - Configures asset loaders for images (png, jpg, jpeg, gif, svg, webp)
  - Configures font loaders (woff, woff2, eot, ttf, otf)
  - Sets up `@/` path alias pointing to project root
- **webpack/webpack.dev.js**: Development-specific configuration
  - Uses `eval-source-map` for debugging
  - Disables minimization
  - Enables filesystem caching
- **webpack/webpack.prod.js**: Production-specific configuration
  - Enables minimization and code splitting
  - Splits vendor code into separate chunks
  - Sets performance budgets (512KB for entrypoints and assets)

The webpack merge happens in next.config.ts:5-43, where custom webpack rules are selectively merged based on environment (dev/prod) and whether it's a server or client build.

### Project Structure

- **app/**: Next.js App Router directory
  - **layout.tsx**: Root layout file that re-exports from shared/layout/layout.tsx (required by Next.js)
  - **page.tsx**: Home page file that re-exports from modules/homepage/page.tsx (required by Next.js)
  - **shared/**: Shared components and layouts
    - **layout/**: Layout components
      - **layout.tsx**: Root layout implementation with global SCSS import and Navigation component
    - **components/**: Reusable UI components
      - **Navigation.tsx**: Client component ('use client') providing site-wide navigation with active route highlighting using usePathname
  - **modules/**: Application feature modules
    - **homepage/**: Home page component and styles
    - **sites/**: Sites page component and styles
    - **map/**: Map page component and styles
    - **tour-guides/**: Tour guides page component and styles
    - **about/**: About page component and styles
    - **contact/**: Contact page component and styles
    - Each module contains page.tsx (component) and page.module.scss (styles)
  - **content/**: Content and styling resources
    - **scss/**: Global SCSS files
      - **main.scss**: Main global stylesheet imported by root layout
- **public/**: Static assets
- **webpack/**: Custom webpack configurations

### Component Patterns

**Server vs Client Components:**
- Pages are server components by default (faster initial load)
- Navigation is a client component (marked with 'use client') because it uses usePathname hook for active route highlighting
- Use client components only when needed for interactivity, hooks, or browser APIs

**Navigation Component:**
The Navigation component (app/shared/components/Navigation.tsx) uses:
- 'use client' directive for client-side rendering
- usePathname() hook to detect current route
- Dynamic active state styling based on pathname
- Centralized navigation items array for easy maintenance

**Layout and Page Organization:**
- **app/layout.tsx**: Re-exports the layout from app/shared/layout/layout.tsx (required by Next.js App Router)
- **app/shared/layout/layout.tsx**: Contains the actual RootLayout implementation with metadata, Navigation component, and global SCSS import (main.scss)
- **app/page.tsx**: Re-exports the home page from app/modules/homepage/page.tsx (required by Next.js App Router)
- **app/modules/homepage/page.tsx**: Contains the actual Home page component implementation

**Module Organization:**
- All application features are organized in the **app/modules/** directory
- Each module (homepage, sites, map, tour-guides, about, contact) is self-contained with its page component and styles

### TypeScript Configuration

- Target: ES2017
- Module resolution: bundler (Next.js bundler-specific)
- Path alias: `@/*` maps to project root (tsconfig.json:21-23)
- Strict mode enabled

### Styling

The project uses SASS with CSS Modules:
- Global styles: app/content/scss/main.scss (imported in app/shared/layout/layout.tsx:3)
- Component-scoped styles: *.module.scss files co-located with components
- SASS include paths configured in next.config.ts:45-47

## Key Patterns

### Webpack Configuration

When modifying webpack configuration, ensure changes are made in the appropriate file:
- Shared config → webpack/webpack.common.js
- Dev-only → webpack/webpack.dev.js
- Prod-only → webpack/webpack.prod.js

The merge logic in next.config.ts ensures Next.js's built-in webpack config is preserved while adding custom rules.

### Adding New Pages

To add a new route following the established pattern:
1. Create a new directory under `app/modules/` with the route name (e.g., `app/modules/artifacts/`)
2. Add `page.tsx` for the page component (server component by default)
3. Add `page.module.scss` for component-scoped styles
4. Update the `navItems` array in `app/shared/components/Navigation.tsx` to include the new route
5. Import and use the styles in your component: `import styles from './page.module.scss'`
