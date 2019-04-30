import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import { FetchRecipes, RecipeAction } from './recipe.actions';
import { RecipesFeatureState } from './recipe.reducer';

export const recipesUrl =
  'https://ng-recipe-book-f5fd9.firebaseio.com/recipes.json';

@Injectable()
export class RecipeEffects {
  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipeAction.FetchRecipes),
    switchMap((action: FetchRecipes) => {
      return this.httpClient.get<Recipe[]>(recipesUrl, {
        // params: new HttpParams().set('auth', this.authService.getToken())
      });
    }),
    map((recipes: Recipe[]) => {
      return {
        type: RecipeAction.SetRecipes,
        payload: recipes
      };
    })
  );

  @Effect({
    dispatch: false
  })
  saveRecipes = this.actions$.pipe(
    ofType(RecipeAction.SaveRecipes),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([action, state]) => {
      const request = new HttpRequest('PUT', recipesUrl, state.recipes, {
        reportProgress: true
        //params: new HttpParams().set('auth', this.authService.getToken())
      });
      return this.httpClient.request(request);
    }),
    map(
      response => {
        console.log(response);
      },
      error => {
        alert('could not save recipes due to an error');
        console.error(error);
      }
    )
  );

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private store: Store<RecipesFeatureState>
  ) {}
}
