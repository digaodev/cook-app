import { Component, Input, OnInit } from '@angular/core';
import { RecipeService } from './../../recipe.service';
import { Recipe } from '../../../shared/recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipeItem: Recipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }


  onSelected() {
    this.recipeService.recipeSelected.emit(this.recipeItem);
  }
}
