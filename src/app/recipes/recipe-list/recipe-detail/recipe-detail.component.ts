import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { AddIngredients } from 'src/app/shopping-list/store/shopping-list.actions';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';
import { DeleteRecipe } from '../../store/recipe.actions';
import * as fromRecipe from '../../store/recipe.reducer';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipesState: Observable<fromRecipe.State>;
  recipe: Recipe;

  constructor(
    private recipeService: RecipeService,
    public shoppingListService: ShoppingListService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRecipe.RecipesFeatureState>
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log('RecipeDetailComponent.ngOnit: recipe.id = ' + params.id);
      const recipeId = +params.id;
      this.recipesState = this.store.select('recipes');
      this.recipesState
        .pipe(take(1))
        .subscribe(
          recipesState =>
            (this.recipe = recipesState.recipes.find(
              recipe => recipe.id == recipeId
            ))
        );
    });
  }

  addIngredientsToShoppingList() {
    this.store
      .select('recipes')
      .pipe(take(1))
      .subscribe((recipesState: fromRecipe.State) => {
        this.store.dispatch(
          new AddIngredients(
            recipesState.recipes.find(
              recipe => recipe.id == this.recipe.id
            ).ingredients
          )
        );
      });
  }

  onDelete() {
    this.store.dispatch(new DeleteRecipe(this.recipe.id));
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
