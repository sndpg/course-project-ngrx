import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

export const shoppingListUrl =
  'https://ng-recipe-book-f5fd9.firebaseio.com/shopping-list.json';

@Injectable()
export class ShoppingListService {
  // subscribe so ingredientsChanged in components which need to get the data from it...
  // e.g. in ngOnit of the component: ingredientsChanged.subscribe(...)
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [];

  constructor(private httpClient: HttpClient) {}

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  updateIngredient(index: number, updatedIngredient: Ingredient) {
    this.ingredients[index] = updatedIngredient;
    this.onShoppingListUpdate();
  }

  getFormattedIngredient(ingredient: Ingredient) {
    return ingredient.name.concat(
      ingredient.amount.toString().trim() !== ''
        ? ' (' + ingredient.amount + ')'
        : ''
    );
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.onShoppingListUpdate();
  }

  onShoppingListUpdate() {
    this.saveShoppingList();
  }

  getShoppingList() {
    this.getShoppingListObservable().subscribe(
      response => {
        if (response != null) {
          this.ingredients = response;
        }
        this.ingredientsChanged.next(this.ingredients.slice());
      },
      error => {
        alert('could not get shopping list from server due to an error');
        console.error(error);
      }
    );
  }

  getShoppingListObservable() {
    return this.httpClient.get<Ingredient[]>(shoppingListUrl, {
      // params: new HttpParams().set('auth', this.authService.getToken())
    });
  }

  saveShoppingList() {
    this.httpClient
      .put(shoppingListUrl, this.ingredients, {
        // params: new HttpParams().set('auth', this.authService.getToken())
      })
      .subscribe(
        response => {
          console.log(response);
          this.ingredientsChanged.next(this.ingredients.slice());
        },
        error => {
          alert('could not save shopping list due to an error');
          console.error(error);
        }
      );
  }
}
