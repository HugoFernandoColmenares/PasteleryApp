import { SidebarItem } from '@core/models/sidebar.model';

export const SIDEBAR_PUBLIC_ITEMS: SidebarItem[] = [
  { label: 'Inicio', icon: '🧁', path: '/home/main' },
  { label: 'Foro de Noticias', icon: '📰', path: '/home/news' },
  { label: 'Sobre Nosotros', icon: '👩‍🍳', path: '/home/about' },
];

export const SIDEBAR_AUTHENTICATED_ITEMS: SidebarItem[] = [
  { label: 'Mis Pedidos', icon: '📦', path: '/home/orders' },
  { label: 'Recetas', icon: '📋', path: '/home/recipes' },
];

export function getSidebarItems(isAuthenticated: boolean): SidebarItem[] {
  return isAuthenticated
    ? [...SIDEBAR_PUBLIC_ITEMS, ...SIDEBAR_AUTHENTICATED_ITEMS]
    : SIDEBAR_PUBLIC_ITEMS;
}
