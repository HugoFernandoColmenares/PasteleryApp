-- Orders schema for checkout MVP

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'confirmed',
  total_amount numeric(10,2) not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  recipe_id uuid not null references public.recipes(id) on delete restrict,
  recipe_name text not null,
  unit_price numeric(10,2) not null,
  quantity integer not null check (quantity > 0),
  line_total numeric(10,2) not null
);

create index if not exists orders_user_id_idx on public.orders(user_id);
create index if not exists order_items_order_id_idx on public.order_items(order_id);
create index if not exists order_items_recipe_id_idx on public.order_items(recipe_id);

grant select, insert on public.orders to authenticated;
grant select, insert on public.order_items to authenticated;

alter table public.orders enable row level security;
alter table public.order_items enable row level security;

create policy "orders_select_own" on public.orders
  for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "orders_insert_own" on public.orders
  for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "order_items_select_own" on public.order_items
  for select to authenticated
  using (
    exists (
      select 1
      from public.orders o
      where o.id = order_items.order_id
        and o.user_id = (select auth.uid())
    )
  );

create policy "order_items_insert_own" on public.order_items
  for insert to authenticated
  with check (
    exists (
      select 1
      from public.orders o
      where o.id = order_items.order_id
        and o.user_id = (select auth.uid())
    )
  );
