import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Category } from '../../../../entities/category.model';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../../recipe.service';
import { CategoryService } from '../../../category.service';
import { Recipe } from '../../../../entities/recipe.model';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrl: './edit-recipe.component.css'
})
export class EditRecipeComponent implements OnInit {
  addRecipeForm!: FormGroup;
  recipeToUp: Recipe | undefined;
  categories: Category[] = [];
  recipeId: number;
  r: Recipe[];
  constructor(private route: ActivatedRoute, private _categoryService: CategoryService, private fb: FormBuilder, private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.recipeId = Number(this.route.snapshot.paramMap.get('recipeId'));
    console.log(this.recipeId)
    this.recipeService.getRecipeById(this.recipeId).subscribe({
      next: (res) => {
        this.recipeToUp = res;
        this.addRecipeForm = this.fb.group({

          recipeName: [this.recipeToUp ? this.recipeToUp.recipeName : '', Validators.required],
          categoryId: [this.recipeToUp ? this.recipeToUp.categoryId : '', Validators.required],
          preparationTime: [this.recipeToUp ? this.recipeToUp.preparationTime : '', Validators.required],
          difficultyLevel: [this.recipeToUp ? this.recipeToUp.difficultyLevel : '', [Validators.required]],
          ingredients: this.fb.array([]),
          preparationSteps: this.fb.array([]),
          userId: [this.recipeToUp ? this.recipeToUp.userId : '', Validators.required],
          imageRouting: [this.recipeToUp ? this.recipeToUp.imageRouting = '0' : 'ertyui']

        });


        this.initForm();
        console.log(this.addRecipeForm.value.recipeName, 'sdfgh')
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        console.log('finish');
      }
    })
    this.getCategories();

  }
  private initForm() {

    if (this.recipeToUp) {
      this.recipeToUp.ingredients.forEach((ingredient: string) => {
        this.addIngredientFieldWithValue(ingredient);
      });

      this.recipeToUp.preparationSteps.forEach((instruction: string) => {
        this.addInstructionFieldWithValue(instruction);
      });
    }
  }


  get ingredientsArray() {
    return this.addRecipeForm.get('ingredients') as FormArray;

  }

  get preparationStepsArray() {
    return this.addRecipeForm.get('preparationSteps') as FormArray;
  }
  addIngredientFieldWithValue(value: string) {
    this.ingredientsArray.push(this.fb.control(value));
  }

  addInstructionFieldWithValue(value: string) {
    this.preparationStepsArray.push(this.fb.control(value));
  }

  getCategories() {
    this._categoryService.getCategories().subscribe(categories => {
      this.categories = categories.map(category => ({
        id: category.id,
        name: category.name
      }));
    });
  }

  addIngredient() {
    this.ingredientsArray.push(this.fb.control(''));
  }


  removeIngredient(i: number) {
    this.ingredientsArray.removeAt(i);
  }

  addInstruction() {
    this.preparationStepsArray.push(this.fb.control(''));
  }

  removeInstruction(i: number) {
    this.preparationStepsArray.removeAt(i);
  }
  onInstructionsValueChanged(index: number) {
    const currentControl = this.preparationStepsArray.at(index);
    const nextControl = this.preparationStepsArray.at(index + 1);

    if (currentControl.value === '' && nextControl) {
      // אם התיבה הנוכחית ריקה ויש תיבה הבאה, מחק את התיבה הבאה
      this.preparationStepsArray.removeAt(index + 1);
    }
  }

  onIngredientValueChanged(index: number) {
    const currentControl = this.ingredientsArray.at(index);
    const nextControl = this.ingredientsArray.at(index + 1);

    if (currentControl.value === '' && nextControl) {
      // אם התיבה הנוכחית ריקה ויש תיבה הבאה, מחק את התיבה הבאה
      this.ingredientsArray.removeAt(index + 1);
    }
  }
  onSubmit() {
    console.log(this.addRecipeForm.valid)

    if (this.addRecipeForm.valid) {
      const recipe = this.addRecipeForm.value as Recipe;
     

      this.recipeService.updateRecipe(recipe, this.recipeId).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'המתכון התעדכן בהצלחה!',
          showConfirmButton: false,
          timer:1500
        });



      });
    }
  }
}
