import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '@core/services/recipe.service';
import { IngredientService } from '@core/services/ingredient.service';
import { AlertService } from '@core/services/alert.service';
import { ImageUploadService } from '@core/services/image-upload.service';
import { RecipeDto, CreateRecipeDto, RecipeIngredientDto } from '@core/models/recipe.model';
import { StorageSrcDirective } from '@shared/directives/storage-src.directive';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, StorageSrcDirective],
  templateUrl: './recipe-form.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './recipe-form.css',
})
export class RecipeForm implements OnInit {
  private fb = inject(FormBuilder);
  private recipeService = inject(RecipeService);
  private ingredientService = inject(IngredientService);
  private alertService = inject(AlertService);
  private imageUploadService = inject(ImageUploadService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  public ingredients = this.ingredientService.ingredients;
  public isEditMode = signal(false);
  public recipeId = signal<string | null>(null);
  public uploadingImage = signal(false);

  public recipeForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    instructions: ['', Validators.required],
    suggestedPrice: [0, [Validators.required, Validators.min(0)]],
    imageUrl: ['', Validators.required],
    recipeIngredients: this.fb.array([]),
  });

  get recipeIngredients() {
    return this.recipeForm.get('recipeIngredients') as FormArray;
  }

  ngOnInit() {
    this.ingredientService.loadIngredients().subscribe();
    
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.recipeId.set(id);
      this.loadRecipe(id);
    }
  }

  loadRecipe(id: string) {
    this.recipeService.getRecipeById(id).subscribe(recipe => {
      if (recipe) {
        this.recipeForm.patchValue({
          name: recipe.name,
          description: recipe.description,
          instructions: recipe.instructions,
          suggestedPrice: recipe.suggestedPrice,
          imageUrl: recipe.imageUrl || '',
        });
        
        // Load ingredients
        recipe.recipeIngredients.forEach(ri => {
          this.addIngredient(ri);
        });
      }
    });
  }

  addIngredient(ingredient?: RecipeIngredientDto) {
    const ingredientForm = this.fb.group({
      ingredientId: [ingredient?.ingredientId || '', Validators.required],
      amount: [ingredient?.amount || 0, [Validators.required, Validators.min(0)]],
      unit: [ingredient?.unit || 'kg', Validators.required],
    });
    this.recipeIngredients.push(ingredientForm);
  }

  removeIngredient(index: number) {
    this.recipeIngredients.removeAt(index);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    this.uploadingImage.set(true);

    this.imageUploadService
      .uploadOptimized(file, {
        folder: 'recipes',
        fileName: file.name.replace(/\.[^.]+$/, ''),
      })
      .subscribe({
        next: (storagePath) => {
          this.recipeForm.patchValue({ imageUrl: storagePath });
          this.uploadingImage.set(false);
        },
        error: (error: Error) => {
          this.uploadingImage.set(false);
          this.alertService.error('Error de imagen', error.message);
        },
      });
  }

  saveRecipe() {
    if (this.recipeForm.invalid) return;

    const formData = this.recipeForm.value;
    
    if (this.isEditMode()) {
      const updatedRecipe: RecipeDto = {
        id: this.recipeId()!,
        ...formData,
      } as RecipeDto;
      
      this.recipeService.updateRecipe(this.recipeId()!, updatedRecipe).subscribe(res => {
        if (res) {
          this.alertService.toast('Receta actualizada correctamente');
          this.router.navigate(['/home/recipes']);
        }
      });
    } else {
      const newRecipe: CreateRecipeDto = formData as CreateRecipeDto;
      this.recipeService.createRecipe(newRecipe).subscribe(res => {
        if (res) {
          this.alertService.toast('Receta creada correctamente');
          this.router.navigate(['/home/recipes']);
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/home/recipes']);
  }
}
