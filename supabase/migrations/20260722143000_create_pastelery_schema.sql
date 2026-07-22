-- PasteleryApp core schema
-- Apply via Supabase Dashboard SQL editor or `supabase db push`

create table if not exists public.ingredients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  category text,
  created_at timestamptz not null default now()
);

create table if not exists public.storage_locations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  code text not null unique,
  description text not null default '',
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.recipes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  instructions text not null default '',
  suggested_price numeric(10,2) not null default 0,
  total_cost numeric(10,2) not null default 0,
  image_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.recipe_ingredients (
  id uuid primary key default gen_random_uuid(),
  recipe_id uuid not null references public.recipes(id) on delete cascade,
  ingredient_id uuid not null references public.ingredients(id) on delete restrict,
  amount numeric(10,2) not null default 0,
  unit text not null default 'kg'
);

create table if not exists public.inventory_items (
  id uuid primary key default gen_random_uuid(),
  ingredient_id uuid not null references public.ingredients(id) on delete restrict,
  quantity numeric(10,2) not null default 0,
  unit text not null default 'kg',
  location text,
  last_updated timestamptz not null default now()
);

create table if not exists public.news_articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  date text not null,
  category text not null,
  summary text not null,
  content text not null,
  author text not null,
  image_url text,
  icon_url text,
  created_at timestamptz not null default now()
);

grant select on public.recipes, public.news_articles to anon, authenticated;
grant select, insert, update, delete on public.ingredients to authenticated;
grant select, insert, update, delete on public.storage_locations to authenticated;
grant select, insert, update, delete on public.recipe_ingredients to authenticated;
grant select, insert, update, delete on public.inventory_items to authenticated;
grant insert, update, delete on public.recipes to authenticated;

alter table public.ingredients enable row level security;
alter table public.storage_locations enable row level security;
alter table public.recipes enable row level security;
alter table public.recipe_ingredients enable row level security;
alter table public.inventory_items enable row level security;
alter table public.news_articles enable row level security;

create policy "ingredients_authenticated_all" on public.ingredients
  for all to authenticated using (true) with check (true);

create policy "storage_locations_authenticated_all" on public.storage_locations
  for all to authenticated using (true) with check (true);

create policy "recipes_public_read" on public.recipes
  for select to anon, authenticated using (true);

create policy "recipes_authenticated_write" on public.recipes
  for insert to authenticated with check (true);

create policy "recipes_authenticated_update" on public.recipes
  for update to authenticated using (true) with check (true);

create policy "recipes_authenticated_delete" on public.recipes
  for delete to authenticated using (true);

create policy "recipe_ingredients_authenticated_all" on public.recipe_ingredients
  for all to authenticated using (true) with check (true);

create policy "recipe_ingredients_public_read" on public.recipe_ingredients
  for select to anon, authenticated using (true);

create policy "inventory_items_authenticated_all" on public.inventory_items
  for all to authenticated using (true) with check (true);

create policy "news_public_read" on public.news_articles
  for select to anon, authenticated using (true);

create policy "news_authenticated_write" on public.news_articles
  for insert to authenticated with check (true);

create policy "news_authenticated_update" on public.news_articles
  for update to authenticated using (true) with check (true);

create policy "news_authenticated_delete" on public.news_articles
  for delete to authenticated using (true);
