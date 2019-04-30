import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

export enum ShoppingListAction {
  AddIngredient = 'ADD_INGREDIENT',
  AddIngredients = 'ADD_INGREDIENTS',
  UpdateIngredient = 'UPDATE_INGREDIENT',
  DeleteIngredient = 'DELETE_INGREDIENT',
  StartEditing = 'START_EDITING',
  StopEditing = 'STOP_EDITING',
  FetchShoppingList = 'FETCH_SHOPPING_LIST',
  SaveShoppingList = 'SAVE_SHOPPING_LIST',
  SetShoppingList = 'SET_SHOPPING_LIST'
}

export class AddIngredient implements Action {
  readonly type = ShoppingListAction.AddIngredient;

  constructor(public payload: Ingredient) {}
}

export class AddIngredients implements Action {
  readonly type = ShoppingListAction.AddIngredients;

  constructor(public payload: Ingredient[]) {}
}

export class UpdateIngredient implements Action {
  readonly type = ShoppingListAction.UpdateIngredient;

  constructor(public payload: Ingredient) {}
}

export class DeleteIngredient implements Action {
  readonly type = ShoppingListAction.DeleteIngredient;
}

export class StartEditing implements Action {
  readonly type = ShoppingListAction.StartEditing;

  constructor(public payload: number) {}
}

export class StopEditing implements Action {
  readonly type = ShoppingListAction.StopEditing;
}

export class FetchShoppingList implements Action {
  readonly type = ShoppingListAction.FetchShoppingList;
}

export class SaveShoppingList implements Action {
  readonly type = ShoppingListAction.SaveShoppingList;
}

export class SetShoppingList implements Action {
  readonly type = ShoppingListAction.SetShoppingList;

  constructor(public payload: Ingredient[]) {}
}

export type ShoppingListActions =
  | AddIngredient
  | AddIngredients
  | UpdateIngredient
  | DeleteIngredient
  | StartEditing
  | StopEditing
  | FetchShoppingList
  | SaveShoppingList
  | SetShoppingList;
