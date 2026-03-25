import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '@core/services/recipe.service';
import { IngredientService } from '@core/services/ingredient.service';
import { AlertService } from '@core/services/alert.service';
import { RecipeDto, CreateRecipeDto } from '@core/interfaces/recipe.interface';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recipe-form.html',
  styleUrl: './recipe-form.css',
})
export class RecipeForm implements OnInit {
  private fb = inject(FormBuilder);
  private recipeService = inject(RecipeService);
  private ingredientService = inject(IngredientService);
  private alertService = inject(AlertService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  public ingredients = this.ingredientService.ingredients;
  public isEditMode = signal(false);
  public recipeId = signal<string | null>(null);

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

  addIngredient(ri?: any) {
    const ingredientForm = this.fb.group({
      ingredientId: [ri?.ingredientId || '', Validators.required],
      amount: [ri?.amount || 0, [Validators.required, Validators.min(0)]],
      unit: [ri?.unit || 'kg', Validators.required],
    });
    this.recipeIngredients.push(ingredientForm);
  }

  removeIngredient(index: number) {
    this.recipeIngredients.removeAt(index);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.recipeForm.patchValue({ imageUrl: e.target.result });
      };
      reader.readAsDataURL(file);
    }
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
          this.router.navigate(['/recipes']);
        }
      });
    } else {
      const newRecipe: CreateRecipeDto = formData as CreateRecipeDto;
      this.recipeService.createRecipe(newRecipe).subscribe(res => {
        if (res) {
          this.alertService.toast('Receta creada correctamente');
          this.router.navigate(['/recipes']);
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/recipes']);
  }
}
