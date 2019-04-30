import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export enum RecipeAction {
  SetRecipes = 'SET_RECIPES',
  AddRecipe = 'ADD_RECIPE',
  UpdateRecipe = ' UPDATE_RECIPES',
  DeleteRecipe = 'DELETE_RECIPE',
  FetchRecipes = 'FETCH_RECIPES',
  SaveRecipes = 'SAVE_RECIPES'
}

export class SetRecipes implements Action {
  readonly type = RecipeAction.SetRecipes;

  constructor(public payload: Recipe[]) {}
}

export class AddRecipe implements Action {
  readonly type = RecipeAction.AddRecipe;

  constructor(public payload: Recipe) {}
}

export class UpdateRecipe implements Action {
  readonly type = RecipeAction.UpdateRecipe;

  constructor(public payload: { id: number; recipe: Recipe }) {}
}

export class DeleteRecipe implements Action {
  readonly type = RecipeAction.DeleteRecipe;

  constructor(public payload: number) {}
}

export class FetchRecipes implements Action {
  readonly type = RecipeAction.FetchRecipes;
}

export class SaveRecipes implements Action {
  readonly type = RecipeAction.SaveRecipes;
}

export type RecipeActions =
  | SetRecipes
  | AddRecipe
  | UpdateRecipe
  | DeleteRecipe
  | FetchRecipes
  | SaveRecipes;
