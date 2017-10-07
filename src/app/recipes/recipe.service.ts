import { EventEmitter } from '@angular/core';
import { Recipe } from '../shared/recipe.model';

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [new Recipe('testRecipe',
    'recipe description',
    'https://static.pexels.com/photos/592939/pexels-photo-592939.jpeg'),
  new Recipe('testRecipe2',
    'recipe2 description',
    'https://static.pexels.com/photos/592939/pexels-photo-592939.jpeg'),
  new Recipe('testRecipe3',
    'recipe3 description',
    'https://static.pexels.com/photos/592939/pexels-photo-592939.jpeg')];

  getRecipes() {
    return this.recipes.slice();
  }

}
