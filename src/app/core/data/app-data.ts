import { ListRecipeDto } from "@core/interfaces/recipe.interface";
import { InventoryItemDto } from "@core/interfaces/inventory-item.interface";

export interface SidebarItem {
    label: string;
    icon: string;
    path: string;
}

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
    { label: 'Especiales', icon: '✨', path: '/home/main' },
    { label: 'De temporada', icon: '🍂', path: '/home/main' },
    { label: 'Personalizados', icon: '🎨', path: '/home/main' },
    { label: 'Recetas de la Casa', icon: '📖', path: '/home/recipes' }
];
