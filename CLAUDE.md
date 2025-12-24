# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application with TypeScript, SASS, and custom Webpack configuration. The project uses React 19 and follows the Next.js App Router architecture.

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
  - **layout.tsx**: Root layout with global SCSS import (app/globals.scss)
  - **page.tsx**: Home page component
  - SCSS modules are co-located with components (e.g., page.module.scss)
- **public/**: Static assets
- **webpack/**: Custom webpack configurations

### TypeScript Configuration

- Target: ES2017
- Module resolution: bundler (Next.js bundler-specific)
- Path alias: `@/*` maps to project root (tsconfig.json:21-23)
- Strict mode enabled

### Styling

The project uses SASS with CSS Modules:
- Global styles: app/globals.scss
- Component-scoped styles: *.module.scss files
- SASS include paths configured in next.config.ts:45-47

## Key Patterns

When modifying webpack configuration, ensure changes are made in the appropriate file:
- Shared config → webpack/webpack.common.js
- Dev-only → webpack/webpack.dev.js
- Prod-only → webpack/webpack.prod.js

The merge logic in next.config.ts ensures Next.js's built-in webpack config is preserved while adding custom rules.
