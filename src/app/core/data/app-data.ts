import { ListRecipeDto } from "@core/interfaces/recipe.interface";
import { InventoryItemDto, IngredientDto } from "@core/interfaces/inventory-item.interface";
import { NewsArticle } from "@core/interfaces/news-article.interface";

export interface SidebarItem {
    label: string;
    icon: string;
    path: string;
}

export const INGREDIENTS_DATA: IngredientDto[] = [
    { id: 'ing-001', name: 'Harina de Trigo', category: 'Harinas', description: 'Harina de trigo refinada para pastelería.' },
    { id: 'ing-002', name: 'Azúcar Blanca', category: 'Azúcares', description: 'Azúcar refinada estándar.' },
    { id: 'ing-003', name: 'Mantequilla', category: 'Lácteos', description: 'Mantequilla sin sal de alta calidad.' },
    { id: 'ing-004', name: 'Chocolate 70%', category: 'Chocolates', description: 'Chocolate negro con 70% de cacao.' },
    { id: 'ing-005', name: 'Huevos', category: 'Lácteos', description: 'Huevos frescos de granja.' },
    { id: 'ing-006', name: 'Levadura Fresca', category: 'Levaduras', description: 'Levadura natural prensada.' },
    { id: 'ing-007', name: 'Leche Entera', category: 'Lácteos', description: 'Leche de vaca fresca.' },
    { id: 'ing-008', name: 'Sal Marina', category: 'Especias', description: 'Sal natural fina.' }
];

export const NEWS_DATA: NewsArticle[] = [
    {
        id: '660e8400-e29b-41d4-a716-446655440001',
        title: '¡Nueva Apertura en el Centro!',
        date: '15 Mar 2026',
        category: 'Evento',
        author: 'Ana Martínez',
        summary: 'Estamos emocionados de anunciar nuestra nueva sucursal en el corazón de la ciudad.',
        content: `Próximamente estaremos atendiendo a todos nuestros clientes en la Calle Mayor, con el mismo sabor artesanal de siempre.
        
        Nuestra nueva tienda contará con un espacio de degustación donde podrás probar nuestras últimas creaciones antes que nadie. Además, los primeros 50 clientes en la gran apertura recibirán un pack de bienvenida con nuestros famosos macarons.
        
        No te lo pierdas, ¡te esperamos!`
    },
    {
        id: '660e8400-e29b-41d4-a716-446655440002',
        title: 'Taller de Masa Madre: Nivel Básico',
        date: '10 Mar 2026',
        category: 'Taller',
        author: 'Carlos Ruiz',
        summary: 'Aprende los secretos de la fermentación natural con nuestro maestro panadero.',
        content: `Inscríbete en nuestro próximo taller donde aprenderás a crear tu propia masa madre desde cero. 
        
        En este taller de 4 horas, cubriremos:
        1. Selección de harinas
        2. El proceso de fermentación paso a paso
        3. Técnicas de amasado y formado
        4. Horneado perfecto en casa
        
        Incluye todos los materiales y un tarro con masa madre de 50 años de antigüedad de nuestra familia.`
    },
    {
        id: '660e8400-e29b-41d4-a716-446655440003',
        title: 'Pastel de la Temporada: Otoño Dulce',
        date: '05 Mar 2026',
        category: 'Producto',
        author: 'Elena Gómez',
        summary: 'Llega nuestro especial de calabaza y especias para endulzar tus tardes.',
        content: `Una combinación perfecta de texturas y sabores cálidos para esta época del año. 
        
        Nuestro equipo ha trabajado durante meses para perfeccionar esta receta que combina calabaza asada, canela de Ceilán, jengibre y una base de galleta crujiente de mantequilla. 
        
        Es el acompañamiento ideal para un café caliente en una tarde de lluvia.`
    }
];

export const RECIPES_DATA: ListRecipeDto[] = [
    {
        id: '550e8400-e29b-41d4-a716-446655440001',
        name: 'Pan Artesanal de Masa Madre',
        suggestedPrice: 8.50,
        totalCost: 3.50,
        imageUrl: 'bread-01.png',
        description: 'Pan artesanal fermentado naturalmente para un sabor y textura inigualables.',
    },
    {
        id: '550e8400-e29b-41d4-a716-446655440002',
        name: 'Baguette Tradicional',
        suggestedPrice: 4.20,
        totalCost: 1.80,
        imageUrl: 'bread-02.png',
        description: 'Crocante por fuera y tierno por dentro, el clásico francés en tu mesa.',
    },
    {
        id: '550e8400-e29b-41d4-a716-446655440003',
        name: 'Hogaza de Cereales',
        suggestedPrice: 6.80,
        totalCost: 2.90,
        imageUrl: 'bread-03.png',
        description: 'Nutritiva mezcla de cereales y semillas en una hogaza rústica.',
    },
    {
        id: '550e8400-e29b-41d4-a716-446655440004',
        name: 'Delicia de Chocolate',
        suggestedPrice: 15.00,
        totalCost: 6.50,
        imageUrl: 'dessert_1.png',
        description: 'Intenso bizcocho de chocolate con capas de ganache suave.',
    },
    {
        id: '550e8400-e29b-41d4-a716-446655440005',
        name: 'Tarta de Frutos Rojos',
        suggestedPrice: 18.50,
        totalCost: 8.00,
        imageUrl: 'dessert_2.png',
        description: 'Base crujiente con crema pastelera y una selección de frutos del bosque.',
    },
    {
        id: '550e8400-e29b-41d4-a716-446655440006',
        name: 'Cheesecake de Vainilla',
        suggestedPrice: 22.00,
        totalCost: 10.00,
        imageUrl: 'dessert_3.png',
        description: 'Clásico cheesecake al estilo New York con un toque de vainilla natural.',
    },
    {
        id: '550e8400-e29b-41d4-a716-446655440007',
        name: 'Pastel Especial de Otoño',
        suggestedPrice: 35.00,
        totalCost: 15.00,
        imageUrl: 'dessert_4.png',
        description: 'Combinación única de especias, calabaza y nueces para la temporada.',
    },
    {
        id: '550e8400-e29b-41d4-a716-446655440008',
        name: 'Capricho Cremoso',
        suggestedPrice: 12.00,
        totalCost: 5.00,
        imageUrl: 'hero.png',
        description: 'Nuestra especialidad de la casa, una explosión de sabores dulces.',
    }
];

export const INVENTORY_DATA: InventoryItemDto[] = [
    {
        id: 'inv-001',
        ingredientId: 'ing-001',
        ingredient: { id: 'ing-001', name: 'Harina de Trigo' },
        quantity: 50,
        unit: 'kg',
        location: 'Almacén Principal',
        lastUpdated: new Date().toISOString()
    },
    {
        id: 'inv-002',
        ingredientId: 'ing-002',
        ingredient: { id: 'ing-002', name: 'Azúcar Blanca' },
        quantity: 20,
        unit: 'kg',
        location: 'Almacén Principal',
        lastUpdated: new Date().toISOString()
    },
    {
        id: 'inv-003',
        ingredientId: 'ing-003',
        ingredient: { id: 'ing-003', name: 'Mantequilla' },
        quantity: 15,
        unit: 'kg',
        location: 'Cámara Frigorífica',
        lastUpdated: new Date().toISOString()
    },
    {
        id: 'inv-004',
        ingredientId: 'ing-004',
        ingredient: { id: 'ing-004', name: 'Chocolate 70%' },
        quantity: 5,
        unit: 'kg',
        location: 'Almacén Seco',
        lastUpdated: new Date().toISOString()
    }
];

export const SIDEBAR_ITEMS: SidebarItem[] = [
    { label: 'Nuestros Productos', icon: '🧁', path: '/home/main' },
    { label: 'Foro de Noticias', icon: '📰', path: '/home/news' },
    { label: 'Sobre Nosotros', icon: '👩‍🍳', path: '/home/about' }
];
