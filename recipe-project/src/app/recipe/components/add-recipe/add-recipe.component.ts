import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl,FormArray } from '@angular/forms';
import { Category } from '../../../../entities/category.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { RecipeService } from '../../../recipe.service';
import { CategoryService } from '../../../category.service';
import { Recipe } from '../../../../entities/recipe.model';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {
  addRecipeForm!: FormGroup;
  categories: Category[] = [];
r:Recipe[];
  constructor(private _categoryService: CategoryService,private fb: FormBuilder, private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.getCategories();

    this.addRecipeForm = this.fb.group({
      recipeName: ['', ],
      categoryId: [null],
      preparationTime: ['', Validators.required],
      difficultyLevel: ['', Validators.required],
      ingredients: this.fb.array([this.fb.control('')]),
      preparationSteps: this.fb.array([this.fb.control('')]),
      userId:5,//Number(sessionStorage.getItem('id')),
      imageRouting:"nmjkjj",
    
    });
  }

  get ingredients() {
    return this.addRecipeForm.get('ingredients') as FormArray;
  }

  get preparationSteps() {
    return this.addRecipeForm.get('preparationSteps') as FormArray;
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
    this.ingredients.push(this.fb.control(''));
  }

  removeIngredient(i: number) {
    this.ingredients.removeAt(i);
  }

  addInstruction() {
    this.preparationSteps.push(this.fb.control(''));
  }

  removeInstruction(i: number) {
    this.preparationSteps.removeAt(i);
  }

  onSubmit() {
    console.log(this.addRecipeForm.valid)

    if (this.addRecipeForm.valid) {
      const recipe = this.addRecipeForm.value as Recipe;
      console.log(recipe)
      const r = { ...this.addRecipeForm.value, recipeId:9 };
      this.recipeService.setNewRecipe(recipe).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'המתכון נוסף בהצלחה!',
          showConfirmButton: false,
          timer:1500
        });
       this.recipeService.getRecipeList().subscribe(r => {
        this.r = r;
        console.log("r: ", r);})
        
      
      });
    }
  }
}

