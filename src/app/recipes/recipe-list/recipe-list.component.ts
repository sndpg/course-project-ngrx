import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Store } from '@ngrx/store';
import { RecipesFeatureState } from '../store/recipe.reducer';
import * as fromRecipe from '../store/recipe.reducer';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipesState: Observable<fromRecipe.State>;

  constructor(
    public recipeService: RecipeService,
    private router: Router,
    private store: Store<RecipesFeatureState>
  ) {}

  ngOnInit() {
    this.recipesState = this.store.select('recipes');
  }

  onSelectRecipe(recipe: Recipe) {
    this.router.navigate(['/recipes', recipe.id]);
  }
}
