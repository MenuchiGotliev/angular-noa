import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../../recipe.service';
import { Recipe } from '../../../../entities/recipe.model';
import { Category } from '../../../../entities/category.model';
import { CategoryService } from '../../../category.service';


@Component({
  selector: 'app-all-recipes',
  templateUrl: './all-recipes.component.html',
  styleUrls: ['./all-recipes.component.css']
})
export class AllRecipesComponent implements OnInit {
  recipeList: Recipe[] = [];
  categoryList: Category[] = [];
  filteredRecipes: Recipe[] = this.recipeList;
  selectedCategories: number[] = [];
  categorySelection: { [key: number]: boolean } = {}; 
  preparationTime: number = 120;
  difficultyLevel: number = 5;
  filterByName:string=''
  constructor(private recipeService: RecipeService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.recipeService.getRecipeList().subscribe({
      next: (res) => {
        this.recipeList = res;
        this.filteredRecipes = [...this.recipeList];
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.categoryService.getCategories().subscribe({
      next: (res) => {
        this.categoryList = res;
        this.selectedCategories != this.categoryList.find(c => c.name)
      },
      error: (err) => {
        console.log(err);
      }
    });

  }


  filterAll(): void {
    this.filteredRecipes = this.recipeList.filter(recipe => {
      const time = this.preparationTime === 0 || recipe.preparationTime <= this.preparationTime;
      const difficulty = this.difficultyLevel === 0 || recipe.difficultyLevel <= this.difficultyLevel;
      const category = this.selectedCategories.length === 0 || this.selectedCategories.includes(recipe.categoryId);
      const name = this.filterByName === '' || recipe.recipeName.toLowerCase().includes(this.filterByName.toLowerCase());
      return time && difficulty && category && name;
      
    });
  }
 

  
  filterCategory(category: number): void {
    const index = this.selectedCategories.indexOf(category);
    if (index !== -1) {
      this.selectedCategories.splice(index, 1);
    } else {
      this.selectedCategories.push(category);
    }
    this.filterAll();
  }
 
    resetFilters() {
      this.filterByName=''
      this.preparationTime =  120;
      this.difficultyLevel = 5;
      this.selectedCategories = [];

      this.filteredRecipes = [...this.recipeList]; 
    }
  }


 