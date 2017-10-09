import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from '../shared/recipe.model';
import { Ingredient } from './../shared/ingredient.model';

import { ShoppingListService } from './../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] =
  [new Recipe('Schnitzel', 'Schnitzel is good',
    'https://source.unsplash.com/collection/146135/800x600',
    [
      new Ingredient('Meat', 1),
      new Ingredient('Fries', 20)
    ]),

  new Recipe('Burger', 'Burger is awesome',
  'https://source.unsplash.com/collection/146135/800x600',
    [
      new Ingredient('Meat', 1),
      new Ingredient('Bread', 1)
    ]),
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeById(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
