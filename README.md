# PasteleriaApp - Sistema de Gestión de Panadería 🥐

Aplicación moderna para la gestión de inventario, recetas y ventas de una pastelería artesanal, construida con Angular e integrada con un backend .NET 8.

## 🚀 Características

- **Catálogo de Productos**: Explora nuestra variedad de panes y pasteles consumidos desde la API de Recetas.
- **Gestión de Inventario**: Control detallado de items de inventario y base de ingredientes conectado al backend.
- **Sistema de Recetas**: Listado de recetas de la casa con cálculo de costos y precios sugeridos.
- **Carrito de Compras**: Selección de productos y simulador de pago.
- **Autenticación**: Registro e inicio de sesión mediante JWT con el módulo de Auth de la API.

## 🛠️ Tecnologías

- **Angular 19** (Signals, Standalone Components, Control Flow)
- **TypeScript**
- **HttpClient**: Comunicación con API REST.
- **CSS3** (Diseño Neobrutalista)
- **Reactive Forms**

## 📂 Estructura del Proyecto

- **Components**: Componentes reutilizables (Card, Cart, Header, etc).
- **Pages**: Vistas principales de la aplicación (Home, Inventory, Recipes).
- **Services**: Comunicación con la API (RecipeService, InventoryService, AuthService, CartService).
- **Interfaces**: Modelos de datos alineados con los DTOs del Backend.

## 🔌 Integración con Backend

La aplicación está configurada para conectarse a una API en `http://localhost:5000/api`.
Los módulos principales integrados son:
- **Recipe Module**: Gestión de recetas y sus ingredientes.
- **Inventory Item Module**: Control de stock.
- **Auth Module**: Autenticación y roles de usuario (Admin, User, Visitor).

## 🎨 Estilo Visual

La aplicación utiliza un estilo **Neobrutalista** caracterizado por:
- Sombras negras pronunciadas.
- Bordes gruesos y definidos.
- Colores vibrantes y contrastantes.
- Tipografía clara y legible.

## 🚀 Instalación y Uso

1. Instalar dependencias: `npm install`
2. Iniciar servidor: `npm start`
3. Asegurarse de tener la API de backend ejecutándose en el puerto 5000.
4. Abrir `http://localhost:4200`

---
Desarrollado con ❤️ para amantes de la buena repostería.
