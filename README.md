# PasteleriaApp - Sistema de Gestión de Panadería 🥐

Aplicación moderna para la gestión de inventario, recetas y ventas de una pastelería artesanal, construida con Angular e integrada con un backend .NET 8.

## 🚀 Características Recientes

- **Gestión de Ingredientes**: Nuevo módulo maestro para administrar la base de datos de ingredientes (Harinas, Lácteos, etc.) de forma independiente al stock.
- **Selector de Stock Inteligente**: Mejora en el formulario de inventario con un **Combobox buscable** para seleccionar ingredientes de la base maestra, eliminando la entrada manual de IDs.
- **Foro de Noticias y Artículos**: Sección pública de noticias con vista de detalle para artículos específicos, utilizando rutas dinámicas con GUIDs.
- **Sistema de Alertas Neobrutalista**: Integración de **SweetAlert2** personalizada con el estilo visual de la marca (bordes gruesos, sombras marcadas) gestionado mediante un `AlertService`.
- **Sidebar Dinámico**: Navegación reestructurada que prioriza las secciones públicas: Productos, Noticias y Sobre Nosotros.

## 🛠️ Tecnologías

- **Angular 19** (Signals, Standalone Components, Control Flow, toSignal)
- **TypeScript** (Interfaces estrictas y DTOs)
- **SweetAlert2**: Alertas y confirmaciones personalizadas.
- **RxJS**: Manejo de flujos de datos y simulación de latencia de API.
- **CSS3** (Diseño Neobrutalista con CSS Variables)
- **Reactive Forms**: Validaciones avanzadas y selectores dinámicos.

## 📂 Estructura del Proyecto

- **Core**: 
  - `services/`: AlertService, NewsService, IngredientService, InventoryService, AuthService.
  - `interfaces/`: Modelos de datos compartidos (NewsArticle, IngredientDto, etc).
  - `data/`: `app-data.ts` con Mock Data para desarrollo sin backend.
- **Pages**: 
  - `news/` & `article/`: Foro público y detalle de noticias.
  - `ingredient/`: Gestión maestra de ingredientes.
  - `inventory/`: Control de stock con selector buscable.
  - `auth/`: Login estilizado con feedback de SweetAlert2.

## 🔌 Integración con Backend

La aplicación está preparada para conectarse a una API REST. Consulta el archivo `API_INSTRUCTIONS.md` para ver la especificación de los endpoints y el formato de datos requerido.

## 🎨 Estilo Visual

La aplicación utiliza un estilo **Neobrutalista** caracterizado por:
- Sombras negras pronunciadas (`box-shadow: 12px 12px 0px var(--accent-color)`).
- Bordes gruesos y definidos.
- Colores pastel vibrantes (Muted Rose, Creamy Vanilla).
- Tipografía: 'Quicksand' para lectura y 'Playfair Display' para títulos.

## 🚀 Instalación y Uso

1. Instalar dependencias: `npm install`
2. Iniciar servidor: `npm start`
3. Abrir `http://localhost:4200`

---
Desarrollado con ❤️ para amantes de la buena repostería.
