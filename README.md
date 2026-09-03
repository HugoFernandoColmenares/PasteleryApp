# PasteleryApp

A bakery management and storefront web application built with Angular 22 and Supabase. The application supports a public-facing product catalog, e-commerce flows (cart, checkout), and authenticated back-office operations (inventory, ingredients, recipes, storage locations, profile management).

**Author:** Feith Noir

---

## Summary

PasteleryApp follows a layered architecture with strict separation between infrastructure (`core/`), authentication views (`auth/`), public pages (`pages/`), and reusable UI (`shared/`). Engineering rules are documented in `architecture_guidelines.md`. Visual and CSS standards are documented in `design_guidelines.md`. Both files are maintained locally and excluded from version control.

---

## Design Overview

The interface uses a warm, organic design language:

- Earth-tone palette defined as CSS custom properties (cream, sand, terracotta, sage, ink).
- Typography pairing: `Fraunces` for display and headings, `Inter` for UI and body text.
- Mobile-first layout with progressive breakpoints at 641 px and 901 px.
- All sizing uses `rem` (1 rem = 10 px).
- Spacing managed through `gap` and `padding` only. Component styles do not use `margin`; centering uses flex/grid alignment and `width: min(100%, …)`.
- The landing page pairs the introduction and hero image in a horizontal flex row from 641 px upward. Highlight stats sit below as compact horizontal rows.
- Subtle motion using breathing-style animations and reduced-motion support.
- BEM-inspired CSS naming and a linen grain overlay for tactile depth (restricted to the background layer so images remain crisp).

Refer to `design_guidelines.md` for tokens, component patterns, form standards, accessibility rules, and the full UI checklist.

---

## Architecture Overview

| Layer | Folder | Role |
|---|---|---|
| Core | `src/app/core/` | Services, models, guards, and shared data |
| Auth | `src/app/auth/` | Authentication views (login, register, password recovery) |
| Pages | `src/app/pages/` | Public views that do not require authentication |
| Features | `src/app/features/` | Authenticated business views (inventory, profile, payment) |
| Shared | `src/app/shared/` | Reusable UI components (header, sidebar, card, modal, cart) |

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
|---|---|
| Angular | 22.0.7 |
| TypeScript | 6.0.3 |
| Supabase | Auth, Database (PostgreSQL), RLS, Storage |
| RxJS | 7.8.x |
| SweetAlert2 | Custom alerts via `AlertService` |
| Karma / Jasmine | Unit testing |

---

## Features

- Supabase backend: Auth, PostgreSQL tables with Row Level Security, and image storage.
- Environment configuration via `.env` (local) and Vercel environment variables (production).
- JWT-based authentication: login, registration, forgot password, reset password.
- Public news section with article detail views.
- Recipe catalog with cart and checkout flow.
- Authenticated inventory, ingredient, and storage location management.
- Local image fallback when Supabase Storage is unreachable.
- Custom alert system through SweetAlert2.
- Warm organic design system with Fraunces/Inter typography and design tokens.
- Form fields with indicative icons and password visibility toggles in auth flows.
- Type-safe models centralized in `core/models/`.
- Authenticated features isolated under `features/`.

---

## Backend Integration

The application uses Supabase for authentication, data storage, and image hosting.

- **Supabase URL:** Configured through the `SUPABASE_URL` environment variable.
- **Supabase publishable key:** Configured through the `SUPABASE_KEY` environment variable.
- **Database schema:** Defined in `supabase/migrations/`.
- **Seed data:** `supabase/migrations/20260722150000_seed_app_data.sql` (ingredients, recipes, news, inventory).
- **Image storage:** Supabase bucket `assets` with WebP optimization via `ImageUploadService` and `scripts/upload-public-images.mjs`.
- **Security:** Only the publishable (anon) key belongs in the frontend. Never commit service role keys.

---

## Installation and Usage

### Prerequisites

- Node.js 24 or later
- npm 11 or later
- Angular CLI 22 or later

### Setup

```bash
npm install

cp .env.template .env
# Edit .env with your Supabase project URL and anon key

npm start
```

Open `http://localhost:4200`.

### Database and Images

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
3. Deploy. The `prebuild` script creates `src/environments/` (not committed) and writes `environment.ts` from those variables.

---

## Testing

```bash
npm run test

ng test --code-coverage

ng test --watch=false --browsers=ChromeHeadlessCI
```

---

## Planned Work

- Migrate unit tests from Karma to Vitest.
- Role-based authorization beyond the current authentication guard.
- Order history and customer account management.
- Admin dashboard with analytics and reporting.
- Internationalization (i18n) support.
- Progressive Web App (PWA) capabilities.

---

## Documentation

| File | Description | Version Control |
|---|---|---|
| `README.md` | Project reference | Committed |
| `architecture_guidelines.md` | Architecture, structure, and engineering rules | Local only |
| `design_guidelines.md` | Visual language, CSS tokens, and UI patterns | Local only |
| `.env.template` | Environment variable template | Committed |

After any significant change, update the README and the relevant guideline file.
