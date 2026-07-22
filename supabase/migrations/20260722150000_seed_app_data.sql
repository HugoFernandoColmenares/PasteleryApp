-- Seed data migrated from app-data.ts
-- Image paths reference Supabase Storage bucket "assets" (run scripts/upload-public-images.mjs first).

insert into public.ingredients (id, name, category, description) values
  ('11111111-1111-1111-1111-111111111001', 'Harina de Trigo', 'Harinas', 'Harina de trigo refinada para pastelería.'),
  ('11111111-1111-1111-1111-111111111002', 'Azúcar Blanca', 'Azúcares', 'Azúcar refinada estándar.'),
  ('11111111-1111-1111-1111-111111111003', 'Mantequilla', 'Lácteos', 'Mantequilla sin sal de alta calidad.'),
  ('11111111-1111-1111-1111-111111111004', 'Chocolate 70%', 'Chocolates', 'Chocolate negro con 70% de cacao.'),
  ('11111111-1111-1111-1111-111111111005', 'Huevos', 'Lácteos', 'Huevos frescos de granja.'),
  ('11111111-1111-1111-1111-111111111006', 'Levadura Fresca', 'Levaduras', 'Levadura natural prensada.'),
  ('11111111-1111-1111-1111-111111111007', 'Leche Entera', 'Lácteos', 'Leche de vaca fresca.'),
  ('11111111-1111-1111-1111-111111111008', 'Sal Marina', 'Especias', 'Sal natural fina.')
on conflict (id) do nothing;

insert into public.storage_locations (id, name, code, description, is_active) values
  ('22222222-2222-2222-2222-222222222001', 'Almacén Principal', 'MAIN', 'Bodega principal de ingredientes secos.', true),
  ('22222222-2222-2222-2222-222222222002', 'Cámara Frigorífica', 'COLD', 'Refrigeración para lácteos y mantequilla.', true),
  ('22222222-2222-2222-2222-222222222003', 'Almacén Seco', 'DRY', 'Zona seca para chocolate y especias.', true)
on conflict (id) do nothing;

insert into public.recipes (id, name, description, instructions, suggested_price, total_cost, image_url) values
  ('550e8400-e29b-41d4-a716-446655440001', 'Pan Artesanal de Masa Madre', 'Pan artesanal fermentado naturalmente para un sabor y textura inigualables.', 'Fermentar, amasar y hornear a 220°C durante 35 minutos.', 8.50, 3.50, 'recipes/bread-01.webp'),
  ('550e8400-e29b-41d4-a716-446655440002', 'Baguette Tradicional', 'Crocante por fuera y tierno por dentro, el clásico francés en tu mesa.', 'Formar baguette, reposar y hornear con vapor inicial.', 4.20, 1.80, 'recipes/bread-02.webp'),
  ('550e8400-e29b-41d4-a716-446655440003', 'Hogaza de Cereales', 'Nutritiva mezcla de cereales y semillas en una hogaza rústica.', 'Incorporar semillas en el segundo amasado y hornear lentamente.', 6.80, 2.90, 'recipes/bread-03.webp'),
  ('550e8400-e29b-41d4-a716-446655440004', 'Delicia de Chocolate', 'Intenso bizcocho de chocolate con capas de ganache suave.', 'Preparar bizcocho húmedo y cubrir con ganache de chocolate 70%.', 15.00, 6.50, 'recipes/dessert_1.webp'),
  ('550e8400-e29b-41d4-a716-446655440005', 'Tarta de Frutos Rojos', 'Base crujiente con crema pastelera y una selección de frutos del bosque.', 'Hornea la base, añade crema pastelera y decora con frutos frescos.', 18.50, 8.00, 'recipes/dessert_2.webp'),
  ('550e8400-e29b-41d4-a716-446655440006', 'Cheesecake de Vainilla', 'Clásico cheesecake al estilo New York con un toque de vainilla natural.', 'Hornea a baño maría y enfría completamente antes de servir.', 22.00, 10.00, 'recipes/dessert_3.webp'),
  ('550e8400-e29b-41d4-a716-446655440007', 'Pastel Especial de Otoño', 'Combinación única de especias, calabaza y nueces para la temporada.', 'Integrar puré de calabaza y especias en la masa del bizcocho.', 35.00, 15.00, 'recipes/dessert_4.webp'),
  ('550e8400-e29b-41d4-a716-446655440008', 'Capricho Cremoso', 'Nuestra especialidad de la casa, una explosión de sabores dulces.', 'Montar crema, armar capas y decorar con fruta de temporada.', 12.00, 5.00, 'recipes/hero.webp')
on conflict (id) do nothing;

insert into public.news_articles (id, title, date, category, summary, content, author, image_url) values
  (
    '660e8400-e29b-41d4-a716-446655440001',
    'Nueva Apertura en el Centro!',
    '15 Mar 2026',
    'Evento',
    'Estamos emocionados de anunciar nuestra nueva sucursal en el corazón de la ciudad.',
    E'Próximamente estaremos atendiendo a todos nuestros clientes en la Calle Mayor, con el mismo sabor artesanal de siempre.\n\nNuestra nueva tienda contará con un espacio de degustación donde podrás probar nuestras últimas creaciones antes que nadie.',
    'Ana Martínez',
    'recipes/hero.webp'
  ),
  (
    '660e8400-e29b-41d4-a716-446655440002',
    'Taller de Masa Madre: Nivel Básico',
    '10 Mar 2026',
    'Taller',
    'Aprende los secretos de la fermentación natural con nuestro maestro panadero.',
    E'Inscríbete en nuestro próximo taller donde aprenderás a crear tu propia masa madre desde cero.\n\nIncluye todos los materiales y un tarro con masa madre de 50 años de antigüedad de nuestra familia.',
    'Carlos Ruiz',
    'recipes/bread-01.webp'
  ),
  (
    '660e8400-e29b-41d4-a716-446655440003',
    'Pastel de la Temporada: Otoño Dulce',
    '05 Mar 2026',
    'Producto',
    'Llega nuestro especial de calabaza y especias para endulzar tus tardes.',
    E'Una combinación perfecta de texturas y sabores cálidos para esta época del año.\n\nEs el acompañamiento ideal para un café caliente en una tarde de lluvia.',
    'Elena Gómez',
    'recipes/dessert_4.webp'
  )
on conflict (id) do nothing;

insert into public.inventory_items (id, ingredient_id, quantity, unit, location, last_updated) values
  ('33333333-3333-3333-3333-333333333001', '11111111-1111-1111-1111-111111111001', 50, 'kg', 'Almacén Principal', now()),
  ('33333333-3333-3333-3333-333333333002', '11111111-1111-1111-1111-111111111002', 20, 'kg', 'Almacén Principal', now()),
  ('33333333-3333-3333-3333-333333333003', '11111111-1111-1111-1111-111111111003', 15, 'kg', 'Cámara Frigorífica', now()),
  ('33333333-3333-3333-3333-333333333004', '11111111-1111-1111-1111-111111111004', 5, 'kg', 'Almacén Seco', now())
on conflict (id) do nothing;
