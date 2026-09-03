create index if not exists inventory_items_ingredient_id_idx on public.inventory_items(ingredient_id);
create index if not exists order_items_recipe_id_idx on public.order_items(recipe_id);
create index if not exists recipe_ingredients_ingredient_id_idx on public.recipe_ingredients(ingredient_id);
create index if not exists recipe_ingredients_recipe_id_idx on public.recipe_ingredients(recipe_id);

drop policy if exists "recipe_ingredients_authenticated_all" on public.recipe_ingredients;
drop policy if exists "recipe_ingredients_authenticated_write" on public.recipe_ingredients;
drop policy if exists "recipe_ingredients_authenticated_update" on public.recipe_ingredients;
drop policy if exists "recipe_ingredients_authenticated_delete" on public.recipe_ingredients;

create policy "recipe_ingredients_authenticated_write" on public.recipe_ingredients
  for insert to authenticated with check (true);

create policy "recipe_ingredients_authenticated_update" on public.recipe_ingredients
  for update to authenticated using (true) with check (true);

create policy "recipe_ingredients_authenticated_delete" on public.recipe_ingredients
  for delete to authenticated using (true);
