import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../../../entities/recipe.model'; 
import { Router } from '@angular/router';
import { recipeRoutingModule } from '../../recipe-routing.module';
@Component({
  selector: 'app-small-recipe',
  templateUrl: './small-recipe.component.html',
  styleUrls: ['./small-recipe.component.css'] 
})
export class SmallRecipeComponent  {
  constructor(private router:Router,private recipeRouter:recipeRoutingModule) { }
 

  @Input()
  public recipe?: Recipe; 
  toEdit()
  {
    
      this.router.navigate(['/recipe/editRecipe', this.recipe?.recipeId]);
     
  }

  toDetails()
  {
    this.router.navigate(['/recipe/detailsRecipe', this.recipe?.recipeId]);
  }
  }
