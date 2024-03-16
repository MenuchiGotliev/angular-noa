import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../../../entities/recipe.model';
import { RecipeService } from '../../../recipe.service';
import { CategoryService } from '../../../category.service';
@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipeId: number;
  recipe: Recipe;
  isOwner: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.recipeId = Number(this.route.snapshot.paramMap.get('recipeId'));
    this.loadRecipeDetails();
  }

  loadRecipeDetails(): void {
    this.recipeService.getRecipeById(this.recipeId).subscribe({
      next: (recipe: Recipe) => {
        this.recipe = recipe;
        console.log(recipe?.imageRouting)        // Check if the current user is the owner of the recipe
        this.isOwner = this.recipe.userId === this.getCurrentUserId();
      },
      error: (error) => {
        console.error('Error fetching recipe details:', error);
      }
    });
  }

  getCurrentUserId(): number {
    // Implement logic to get the current user ID
    return 1; // Placeholder for demonstration
  }

  deleteRecipe(): void {
    if (confirm('Are you sure you want to delete this recipe?')) {
      this.recipeService.deleteRecipe(this.recipeId).subscribe({
        next: () => {
          console.log('Recipe deleted successfully.');
          // Redirect to a different page after deletion
          this.router.navigate(['/recipes']);
        },
        error: (error) => {
          console.error('Error deleting recipe:', error);
        }
      });
    }
  }
}
