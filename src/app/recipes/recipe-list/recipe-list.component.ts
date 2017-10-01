import { Recipe } from '../../shared/recipe.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [new Recipe('testRecipe',
    'recipe description',
    'https://static.pexels.com/photos/592939/pexels-photo-592939.jpeg'),
  new Recipe('testRecipe2',
    'recipe2 description',
    'https://static.pexels.com/photos/592939/pexels-photo-592939.jpeg'),
  new Recipe('testRecipe3',
    'recipe3 description',
    'https://static.pexels.com/photos/592939/pexels-photo-592939.jpeg')];

  constructor() { }

  ngOnInit() {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }

}
