import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { shoppingListUrl } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
import { RecipesFeatureState } from './store/recipe.reducer';
import { Store } from '@ngrx/store';
import { SaveRecipes } from './store/recipe.actions';

export const recipesUrl =
  'https://ng-recipe-book-f5fd9.firebaseio.com/recipes.json';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[];

  constructor(
    private httpClient: HttpClient,
    private store: Store<RecipesFeatureState>
  ) {
    this.initRecipes();
  }

  initRecipes() {
    const recipes: Recipe[] = [
      new Recipe(
        1,
        'Recipe 1',
        'test recipe',
        'https://www.google.at/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
        [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
      ),
      new Recipe(
        2,
        'Recipe 2',
        'test recipe 2',
        'https://www.google.at/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
        [new Ingredient('Bun', 2), new Ingredient('Meat', 1)]
      )
    ];
    // this.httpClient
    //   .put(recipesUrl, recipes)
    //   .subscribe(
    //     response => console.log(response),
    //     error => console.log(error)
    //   );
    this.recipes = recipes;
  }

  getRecipes(): Recipe[] {
    this.httpClient
      .get<Recipe[]>(recipesUrl, {
        // params: new HttpParams().set('auth', this.authService.getToken())
      })
      .subscribe(
        response => {
          this.recipes = response;
          this.recipesChanged.next(this.recipes.slice());
        },
        error => {
          alert('could not get recipes from server due to an error');
          console.error(error);
        }
      );
    return this.recipes.slice();
  }

  onRecipesChanged() {
    this.recipes.sort((a, b) => a.id - b.id);
    this.saveRecipes();
  }

  saveRecipes() {
    // this.httpClient
    //   .put(recipesUrl, this.recipes, {
    //     params: new HttpParams().set('auth', this.authService.getToken())
    //   })
    //   .subscribe(
    //     response => {
    //       console.log(response);
    //       this.recipesChanged.next(this.recipes.slice());
    //     },
    //     error => {
    //       alert('could not save recipes due to an error');
    //       console.error(error);
    //     }
    //   );
    this.store.dispatch(new SaveRecipes());
  }
}
