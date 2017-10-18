import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import 'rxjs/add/operator/map';

import { RecipeService } from './../recipes/recipe.service';

import { Recipe } from './recipe.model';

import { Config } from '../shared/config';

@Injectable()
export class DataStorageService {
  private _recipesDatabaseURL = `https://${Config.getFirebaseDatabaseDomain()}/recipes.json`;

  constructor(private _httpClient: HttpClient,
    private _recipeService: RecipeService,
    private _authService: AuthService) { }

  storeRecipes() {
    const token = this._authService.getToken();

    return this._httpClient.put(
      // `${this._recipesDatabaseURL}?auth=${token}`,
      this._recipesDatabaseURL,
      this._recipeService.getRecipes(),
      {
        params: new HttpParams().set('auth', token)
      });
  }

  getRecipes() {
    const token = this._authService.getToken();

    this._httpClient.get<Recipe[]>(`${this._recipesDatabaseURL}?auth=${token}`)
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
