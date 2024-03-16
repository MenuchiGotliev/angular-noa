import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../entities/recipe.model';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  getRecipeList(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>('https://localhost:7137/api/Recipe')
  }

  getRecipeById(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`https://localhost:7137/api/Recipe/${id}`)
  }

  setNewRecipe(Recipe: Recipe): Observable<Recipe> {
    return this.http.post("https://localhost:7137/api/Recipe", Recipe)
  }

  updateRecipe(Recipe: Recipe, id: number): Observable<Recipe> {
    return this.http.put(`https://localhost:7137/api/Recipe/${id}`, Recipe)
  }
  deleteRecipe(id: number): Observable<Recipe> {
    return this.http.delete<Recipe>(`https://localhost:7137/api/Recipe/${id}`);
  }
}