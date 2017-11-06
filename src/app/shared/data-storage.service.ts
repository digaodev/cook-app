import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import 'rxjs/add/operator/map';

import { RecipeService } from './../recipes/recipe.service';
import { AuthService } from './../auth/auth.service';

import { Recipe } from './recipe.model';

import { Config } from '../shared/config';

@Injectable()
export class DataStorageService {
  private _recipesDatabaseURL = `https://${Config.getFirebaseDatabaseDomain()}/recipes.json`;

  constructor(private _httpClient: HttpClient,
    private _recipeService: RecipeService,
    private _authService: AuthService) { }

  storeRecipes() {
    return this._httpClient.put(
      // `${this._recipesDatabaseURL}?auth=${token}`,
      this._recipesDatabaseURL,
      this._recipeService.getRecipes());
  }

  getRecipes() {
    this._httpClient.get<Recipe[]>(this._recipesDatabaseURL)
      .map((recipes) => {
        for (const recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      })
      .subscribe((recipes: Recipe[]) => {
        this._recipeService.setRecipes(recipes);
      });
  }
}
