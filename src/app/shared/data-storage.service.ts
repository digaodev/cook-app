import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';

import { RecipeService } from './../recipes/recipe.service';

import { Recipe } from './recipe.model';

import { Config } from '../shared/config';

@Injectable()
export class DataStorageService {
  private _recipesDatabaseURL = `https://${Config.getFirebaseDatabaseDomain()}/recipes.json`;

  constructor(private _http: Http,
    private _recipeService: RecipeService,
    private _authService: AuthService) { }

  storeRecipes() {
    const token = this._authService.getToken();

    return this._http.put(`${this._recipesDatabaseURL}?auth=${token}`,
      this._recipeService.getRecipes());
  }

  getRecipes() {
    const token = this._authService.getToken();

    this._http.get(`${this._recipesDatabaseURL}?auth=${token}`)
      .map((response: Response) => {
        const recipes: Recipe[] = response.json();
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
