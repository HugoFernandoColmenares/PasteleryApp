# PasteleriaApp - Bakery Management System 🥐

A modern application for inventory management, recipes, and sales of an artisanal bakery, built with Angular and integrated with a .NET 8 backend.

## 🚀 Recent Features

- **Backend Integration**: Fully connected to the .NET 8 API using `HttpClient` and standardized `ApiResponse<T>` models.
- **Environment Configuration**: Multi-environment support (Production/Development) for API endpoints.
- **Authentication System**: Secure Login, Registration, and Password Recovery flows integrated with JWT tokens.
- **Master Ingredient Management**: New module to manage the ingredient database independently from stock.
- **Smart Stock Selector**: Improved inventory form with a searchable combobox to select ingredients from the master database.
- **News & Articles Forum**: Public news section with detail views for specific articles using dynamic routing.
- **Neobrutalist Alert System**: Custom **SweetAlert2** integration styled to match the brand (thick borders, sharp shadows) managed via `AlertService`.

## 🛠️ Technologies

- **Angular 19** (Signals, Standalone Components, Control Flow, `inject()`)
- **TypeScript** (Strict interfaces and DTOs)
- **HttpClient**: Full REST API integration.
- **SweetAlert2**: Custom alerts and confirmations.
- **RxJS**: Data stream management and reactive state.
- **CSS3** (Neobrutalist Design with CSS Variables)
- **Reactive Forms**: Advanced validations and dynamic selectors.

## 📂 Project Structure

- **Core**: 
  - `services/`: `AuthService`, `RecipeService`, `IngredientService`, `InventoryService`, `NewsService`, `AlertService`.
  - `interfaces/`: Standardized `ApiResponse`, `AuthResult`, `RecipeDto`, `IngredientDto`, etc.
  - `environments/`: API configuration for different environments.
- **Pages**: 
  - `news/` & `article/`: Public forum and news details.
  - `ingredient/`: Master ingredient management.
  - `inventory/`: Stock control with searchable selector.
  - `auth/`: Styled login and registration with SweetAlert2 feedback.

## 🔌 Backend Integration

The application is connected to a REST API. For detailed endpoint specifications and data formats, refer to `API_INSTRUCTIONS.md`.

- **Base URL**: `https://localhost:7229/api` (Configurable in `src/environments/`)
- **Standard Response**: All endpoints return an `ApiResponse<T>` object including `data`, `message`, `isSuccess`, and `pagination`.

## 🎨 Visual Style

The application uses a **Neobrutalist** style characterized by:
- Pronounced black shadows (`box-shadow: 12px 12px 0px var(--accent-color)`).
- Thick and defined borders.
- Vibrant pastel colors (Muted Rose, Creamy Vanilla).
- Typography: 'Quicksand' for body text and 'Playfair Display' for headings.

## 🚀 Installation and Usage

1. Install dependencies: `npm install`
2. Start development server: `npm start`
3. Open `http://localhost:4200`

---
Developed with ❤️ for pastry lovers.
