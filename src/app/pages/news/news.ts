import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: string;
  summary: string;
  content: string;
}

@Component({
  selector: 'app-news',
  imports: [CommonModule],
  templateUrl: './news.html',
  styleUrl: './news.css',
})
export class News {
  public news = signal<NewsItem[]>([
    {
      id: 1,
      title: '¡Nueva Apertura en el Centro!',
      date: '15 Mar 2026',
      category: 'Evento',
      summary: 'Estamos emocionados de anunciar nuestra nueva sucursal en el corazón de la ciudad.',
      content: 'Próximamente estaremos atendiendo a todos nuestros clientes en la Calle Mayor, con el mismo sabor artesanal de siempre.'
    },
    {
      id: 2,
      title: 'Taller de Masa Madre: Nivel Básico',
      date: '10 Mar 2026',
      category: 'Taller',
      summary: 'Aprende los secretos de la fermentación natural con nuestro maestro panadero.',
      content: 'Inscríbete en nuestro próximo taller donde aprenderás a crear tu propia masa madre desde cero.'
    },
    {
      id: 3,
      title: 'Pastel de la Temporada: Otoño Dulce',
      date: '05 Mar 2026',
      category: 'Producto',
      summary: 'Llega nuestro especial de calabaza y especias para endulzar tus tardes.',
      content: 'Una combinación perfecta de texturas y sabores cálidos para esta época del año.'
    }
  ]);
}
