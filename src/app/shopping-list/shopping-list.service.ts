import { Subject } from 'rxjs/Subject';

import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();

  ingredientStartedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 2)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    // this.ingredientsChanged.next(this.ingredients.slice());
    this._emitIngredientsChanged();
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    // this.ingredientsChanged.next(this.ingredients.slice());
    this._emitIngredientsChanged();
  }

  updateIngredient(index: number, editedIngredient: Ingredient) {
    this.ingredients[index] = editedIngredient;
    // this.ingredientsChanged.next(this.ingredients.slice());
    this._emitIngredientsChanged();
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this._emitIngredientsChanged();
  }
  private _emitIngredientsChanged() {
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}

