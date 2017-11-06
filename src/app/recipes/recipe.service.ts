import { UploadImage } from './../shared/uploadImage.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from '../shared/recipe.model';
import { Ingredient } from './../shared/ingredient.model';

import { ShoppingListService } from './../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] =
  [new Recipe('Schnitzel', 'Schnitzel is good',
    [new UploadImage('https://source.unsplash.com/collection/146135/800x600',
      'https://source.unsplash.com/collection/146135/90x60')],
    [
      new Ingredient('Meat', 1),
      new Ingredient('Fries', 20)
    ]),

  new Recipe('Burger', 'Burger is awesome',
    [new UploadImage('https://source.unsplash.com/collection/146135/800x600',
      'https://source.unsplash.com/collection/146135/90x60')],
    [
      new Ingredient('Meat', 1),
      new Ingredient('Bread', 1)
    ]),
  ];

  constructor(private shoppingListService: ShoppingListService) { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this._emitRecipesChanged();
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeById(id: number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this._emitRecipesChanged();
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    // this.recipes[index] = newRecipe;
    this.recipes.splice(index, 1, newRecipe);
    this._emitRecipesChanged();
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this._emitRecipesChanged();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  private _emitRecipesChanged() {
    this.recipesChanged.next(this.recipes.slice());
  }
}
