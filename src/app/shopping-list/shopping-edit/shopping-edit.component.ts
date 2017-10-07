import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Ingredient } from './../../shared/ingredient.model';

import { ShoppingListService } from '../shopping-list.service';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  // @ViewChild('nameInput') nameInputRef: ElementRef;
  // @ViewChild('amountInput') amountInputRef: ElementRef;
  nameInput;
  amountInput;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }

  onAddIngredient() {
    this.shoppingListService.
      addIngredient(new Ingredient(this.nameInput, this.amountInput));
  }
}
