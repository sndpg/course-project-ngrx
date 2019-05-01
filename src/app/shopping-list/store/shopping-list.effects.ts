import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  ShoppingListAction,
  FetchShoppingList,
  SaveShoppingList
} from './shopping-list.actions';
import { switchMap, map, withLatestFrom, tap } from 'rxjs/operators';
import { from } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';

export const shoppingListUrl =
  'https://ng-recipe-book-f5fd9.firebaseio.com/shopping-list.json';

@Injectable()
export class ShoppingListEffects {
  @Effect()
  fetchShoppingList = this.actions$.pipe(
    ofType(ShoppingListAction.FetchShoppingList),
    switchMap((action: FetchShoppingList) => {
      return this.httpClient.get<Ingredient[]>(shoppingListUrl, {
        // params: new HttpParams().set('auth', this.authService.getToken())
      });
    }),
    map((ingredients: Ingredient[]) => {
      return {
        type: ShoppingListAction.SetShoppingList,
        payload: ingredients
      };
    })
  );

  @Effect({
    dispatch: false
  })
  saveShoppingList = this.actions$.pipe(
    ofType(ShoppingListAction.SaveShoppingList),
    withLatestFrom(this.store.select('shoppingList')),
    switchMap(([action, state]) => {
      return this.httpClient.put(shoppingListUrl, state.ingredients, {
        // params: new HttpParams().set('auth', this.authService.getToken())
      });
    }),
    tap(
      response => {
        console.log(response);
      },
      error => {
        alert('could not save shopping list due to an error');
        console.error(error);
      }
    )
  );

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private store: Store<AppState>
  ) {}
}
