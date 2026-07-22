# PasteleryApp

A bakery management and storefront web application built with Angular 22 and integrated with a .NET 8 REST API. The application supports public content (news, recipes, about), e-commerce flows (cart, payment), and authenticated back-office operations (inventory, ingredients, storage locations, profile).

**Author:** Feith Noir

---

## Executive Summary

PasteleryApp follows a layered architecture with strict separation between infrastructure (`core/`), authentication views (`auth/`), public pages (`pages/`), and reusable UI (`shared/`). Detailed engineering rules are documented in `architecture_guidelines.md`. Visual and CSS standards are documented in `design_guidelines.md`.

Both guideline files are maintained locally and excluded from version control.

---

## Design Overview

The interface follows a warm, organic design language:

- Earth-tone palette with CSS custom properties (cream, sand, terracotta, sage, ink).
- Typography: `Fraunces` for display and headings, `Inter` for UI and body text.
- Mobile-first layout with progressive breakpoints at 641px and 901px.
- Spacing managed through `gap` and `padding`; relative units in `rem` (`1rem = 10px`).
- Subtle motion with breathing-style animations and reduced-motion support.
- BEM-inspired CSS naming and a linen grain overlay for tactile depth.

Refer to `design_guidelines.md` for tokens, component patterns, form standards, accessibility rules, and the full UI checklist.

---

## Architecture Overview

| Layer | Folder | Role |
|-------|--------|------|
| Core | `src/app/core/` | Services, models, guards, and shared data |
| Auth | `src/app/auth/` | Authentication views (login, register, password recovery) |
| Pages | `src/app/pages/` | Public views that do not require authentication |
| Features | `src/app/features/` | Authenticated business views (inventory, profile, payment) |
| Shared | `src/app/shared/` | Reusable UI components (header, card, modal, cart) |

Key conventions:

- All services live in `core/services/`. No service files belong elsewhere.
- All interfaces and DTOs live in `core/models/`. Components and services must not define types inline.
- Authentication routes are never protected by guards.
- Protected business routes use `authGuard` and redirect to `/home/login`.
- Components target 200 to 250 lines; oversized components are split into child or shared components.
- New work must follow Angular 22+ practices (standalone components, signals, `inject()`, lazy routes) and SOLID, DRY, and KISS principles.

Refer to `architecture_guidelines.md` for the complete structure, routing rules, refactoring guidelines, and feature checklist.

---

## Technology Stack

| Technology | Version / Usage |
|------------|-----------------|
| Angular | 22.0.7 |
| TypeScript | 6.0.3 |
| Supabase | Auth, Database, RLS |
| RxJS | 7.8.x |
| SweetAlert2 | Custom alerts via `AlertService` |
| Karma / Jasmine | Unit testing |

---

## Current Features

- REST API integration with standardized `ApiResponse<T>` responses.
- Supabase backend: Auth, PostgreSQL tables, and RLS policies.
- Environment configuration via `.env` (local) and Vercel environment variables (production).
- JWT-based authentication: login, registration, forgot password, reset password.
- Public news section with article detail views.
- Recipe catalog with cart and checkout flow.
- Authenticated inventory, ingredient, and storage location management.
- Custom alert system through SweetAlert2.
- Warm organic design system with Fraunces/Inter typography and design tokens.
- Form fields with indicative icons and password visibility toggles in auth flows.
- Type-safe models centralized in `core/models/`.
- Authenticated features isolated under `features/`.

---

## Backend Integration

The application uses **Supabase** for authentication, PostgreSQL data storage, and Row Level Security (RLS).

- **Supabase URL:** Configured through the `SUPABASE_URL` environment variable.
- **Supabase publishable key:** Configured through the `SUPABASE_KEY` environment variable.
- **Database schema:** Defined in `supabase/migrations/`.
- **Seed data:** `supabase/migrations/20260722150000_seed_app_data.sql` (ingredients, recipes, news, inventory).
- **Image storage:** Supabase bucket `assets` with WebP optimization via `ImageUploadService` and `scripts/upload-public-images.mjs`.
- **Security:** Only the publishable key belongs in the frontend. Never commit service role keys.

Legacy .NET API endpoint specifications may still be documented in `API_INSTRUCTIONS.md` (local reference, git-ignored).

---

## Installation and Usage

### Prerequisites

- Node.js 24+
- npm 11+
- Angular CLI 22+

### Setup

```bash
# Install dependencies
npm install

# Copy environment template and adjust values
cp .env.template .env

# Start development server
npm start
```

Open `http://localhost:4200`.

### Database seed and images

Apply Supabase migrations (schema, storage bucket, seed data) through the Supabase CLI or dashboard SQL editor.

To upload and optimize legacy assets to Supabase Storage (one-time admin task):

```bash
# Place PNG/JPEG files in public/, add SUPABASE_SERVICE_ROLE_KEY to .env temporarily
npm run upload:images
```

This converts assets to WebP, resizes them, and uploads them to the `assets` bucket. Recipe and news seed rows reference storage paths such as `recipes/bread-01.webp`. Day-to-day uploads use the in-app `ImageUploadService`.

### Build

```bash
npm run build
```

Output is generated in `dist/PasteleryApp/browser`.

### Vercel Deployment

1. Connect the repository to Vercel.
2. Set `SUPABASE_URL` and `SUPABASE_KEY` environment variables for production.
3. Deploy. The build runs `prebuild` to generate environment files automatically.

---

## Testing

```bash
# Run all tests
npm run test

# Run with coverage
ng test --code-coverage

# Run in CI mode (headless)
ng test --watch=false --browsers=ChromeHeadlessCI
```

---

## Planned Features

The following items are identified for future implementation:

- Migrate unit tests from Karma to Vitest (optional Angular 22 migration).
- Role-based authorization beyond the current authentication guard.
- Order history and customer account management.
- Admin dashboard with analytics and reporting.
- Social media icon fields across admin tables and data models.
- Internationalization (i18n) support.
- Progressive Web App (PWA) capabilities.

---

## Documentation

| File | Description | Version control |
|------|-------------|-----------------|
| `README.md` | Executive summary and project reference | Committed |
| `architecture_guidelines.md` | Architecture, structure, and engineering rules | Local only |
| `design_guidelines.md` | Visual language, CSS tokens, and UI patterns | Local only |
| `.env.template` | Environment variable template | Committed |
| `API_INSTRUCTIONS.md` | Backend API reference | Local only |

After any significant change, update the README and the relevant guideline file.
