import { IngredientDto, InventoryItemDto } from '@core/models/inventory-item.model';
import { NewsArticle } from '@core/models/news-article.model';
import { CreateOrderItemDto, OrderDto, OrderItemDto, OrderStatus } from '@core/models/order.model';
import {
  CreateRecipeDto,
  ListRecipeDto,
  RecipeDto,
  RecipeIngredientDto,
} from '@core/models/recipe.model';
import { CreateStorageLocationDto, StorageLocationDto } from '@core/models/storage-location.model';

export interface IngredientRow {
  id: string;
  name: string;
  description: string | null;
  category: string | null;
}

export interface StorageLocationRow {
  id: string;
  name: string;
  code: string;
  description: string;
  is_active: boolean;
}

export interface RecipeRow {
  id: string;
  name: string;
  description: string;
  instructions: string;
  suggested_price: number;
  total_cost: number;
  image_url: string | null;
}

export interface RecipeIngredientRow {
  id: string;
  recipe_id: string;
  ingredient_id: string;
  amount: number;
  unit: string;
  ingredients?: Pick<IngredientRow, 'name'> | null;
}

export interface InventoryItemRow {
  id: string;
  ingredient_id: string;
  quantity: number;
  unit: string;
  location: string | null;
  last_updated: string;
  ingredients?: IngredientRow | null;
}

export interface NewsArticleRow {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  content: string;
  author: string;
  image_url: string | null;
  icon_url: string | null;
}

export interface OrderRow {
  id: string;
  user_id: string;
  status: OrderStatus;
  total_amount: number;
  created_at: string;
}

export interface OrderItemRow {
  id: string;
  order_id: string;
  recipe_id: string;
  recipe_name: string;
  unit_price: number;
  quantity: number;
  line_total: number;
}

export function mapIngredientRow(row: IngredientRow): IngredientDto {
  return {
    id: row.id,
    name: row.name,
    description: row.description ?? undefined,
    category: row.category ?? undefined,
  };
}

export function mapStorageLocationRow(row: StorageLocationRow): StorageLocationDto {
  return {
    id: row.id,
    name: row.name,
    code: row.code,
    description: row.description,
    isActive: row.is_active,
  };
}

export function mapRecipeListRow(row: RecipeRow): ListRecipeDto {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    suggestedPrice: Number(row.suggested_price),
    totalCost: Number(row.total_cost),
    imageUrl: row.image_url ?? undefined,
  };
}

export function mapRecipeIngredientRow(row: RecipeIngredientRow): RecipeIngredientDto {
  return {
    id: row.id,
    recipeId: row.recipe_id,
    ingredientId: row.ingredient_id,
    amount: Number(row.amount),
    unit: row.unit,
    ingredientName: row.ingredients?.name,
  };
}

export function mapRecipeRow(
  row: RecipeRow,
  ingredients: RecipeIngredientRow[] = [],
): RecipeDto {
  return {
    ...mapRecipeListRow(row),
    instructions: row.instructions,
    recipeIngredients: ingredients.map(mapRecipeIngredientRow),
  };
}

export function mapInventoryItemRow(row: InventoryItemRow): InventoryItemDto {
  return {
    id: row.id,
    ingredientId: row.ingredient_id,
    ingredient: row.ingredients ? mapIngredientRow(row.ingredients) : undefined,
    quantity: Number(row.quantity),
    unit: row.unit,
    location: row.location ?? undefined,
    lastUpdated: row.last_updated,
  };
}

export function mapNewsArticleRow(row: NewsArticleRow): NewsArticle {
  return {
    id: row.id,
    title: row.title,
    date: row.date,
    category: row.category,
    summary: row.summary,
    content: row.content,
    author: row.author,
    imageUrl: row.image_url ?? undefined,
    iconUrl: row.icon_url ?? undefined,
  };
}

export function mapOrderItemRow(row: OrderItemRow): OrderItemDto {
  return {
    id: row.id,
    orderId: row.order_id,
    recipeId: row.recipe_id,
    recipeName: row.recipe_name,
    unitPrice: Number(row.unit_price),
    quantity: row.quantity,
    lineTotal: Number(row.line_total),
  };
}

export function mapOrderRow(row: OrderRow, items: OrderItemRow[] = []): OrderDto {
  return {
    id: row.id,
    userId: row.user_id,
    status: row.status,
    totalAmount: Number(row.total_amount),
    createdAt: row.created_at,
    items: items.map(mapOrderItemRow),
  };
}

export function mapCreateOrderPayload(userId: string, totalAmount: number) {
  return {
    user_id: userId,
    status: 'confirmed' as const,
    total_amount: totalAmount,
  };
}

export function mapCreateOrderItemPayload(orderId: string, item: CreateOrderItemDto) {
  return {
    order_id: orderId,
    recipe_id: item.recipeId,
    recipe_name: item.recipeName,
    unit_price: item.unitPrice,
    quantity: item.quantity,
    line_total: item.lineTotal,
  };
}

export function mapCreateRecipePayload(recipe: CreateRecipeDto) {
  return {
    name: recipe.name,
    description: recipe.description,
    instructions: recipe.instructions,
    suggested_price: recipe.suggestedPrice,
    total_cost: 0,
    image_url: recipe.imageUrl,
  };
}

export function mapRecipeIngredientPayload(recipeId: string, ingredient: CreateRecipeDto['recipeIngredients'][number]) {
  return {
    recipe_id: recipeId,
    ingredient_id: ingredient.ingredientId,
    amount: ingredient.amount,
    unit: ingredient.unit,
  };
}

export function mapCreateStorageLocationPayload(location: CreateStorageLocationDto) {
  return {
    name: location.name,
    code: location.code,
    description: location.description,
    is_active: true,
  };
}

export function mapStorageLocationUpdatePayload(location: StorageLocationDto) {
  return {
    name: location.name,
    code: location.code,
    description: location.description,
    is_active: location.isActive,
  };
}

export function mapInventoryInsertPayload(item: Partial<InventoryItemDto>) {
  return {
    ingredient_id: item.ingredientId,
    quantity: item.quantity,
    unit: item.unit,
    location: item.location ?? null,
    last_updated: new Date().toISOString(),
  };
}

export function mapInventoryUpdatePayload(item: InventoryItemDto) {
  return {
    ingredient_id: item.ingredientId,
    quantity: item.quantity,
    unit: item.unit,
    location: item.location ?? null,
    last_updated: new Date().toISOString(),
  };
}

export function mapIngredientInsertPayload(ingredient: Partial<IngredientDto>) {
  return {
    name: ingredient.name,
    description: ingredient.description ?? null,
    category: ingredient.category ?? null,
  };
}

export function mapIngredientUpdatePayload(ingredient: IngredientDto) {
  return {
    name: ingredient.name,
    description: ingredient.description ?? null,
    category: ingredient.category ?? null,
  };
}
