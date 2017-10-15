import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';

import { RecipeService } from './../recipes/recipe.service';

import { Recipe } from './recipe.model';

@Injectable()
export class DataStorageService {

  private _endpointURL = 'https://cook-app-c4e8d.firebaseio.com';

  constructor(private _http: Http,
    private _recipeService: RecipeService) { }

  storeRecipes() {
    return this._http.put(`${this._endpointURL}/recipes.json`,
      this._recipeService.getRecipes());
  }

  getRecipes() {
    return this._http.get(`${this._endpointURL}/recipes.json`)
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
