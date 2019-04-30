import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import { ActivatedRoute } from '@angular/router';
import { findComponentView } from '@angular/core/src/render3/util';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, OnDestroy {
  ngOnInit() {}
  ngOnDestroy() {}

  // selectedRecipe: Recipe;
  // paramsSubscription: Subscription;

  // constructor(
  //   private recipeService: RecipeService,
  //   private route: ActivatedRoute
  // ) {}

  // ngOnInit() {
  //   this.recipeService.recipeSelected.subscribe(
  //     recipe => (this.selectedRecipe = recipe)
  //   );

  //   // const recipeId: number = this.route.snapshot.params['id'];
  //   this.paramsSubscription = this.route.params.subscribe(params =>
  //     this.findSelectedRecipe(params['id'])
  //   );
  // }

  // ngOnDestroy() {
  //   this.paramsSubscription.unsubscribe();
  // }

  // findSelectedRecipe(recipeId: number) {
  //   if (recipeId !== undefined && recipeId > -1) {
  //     this.selectedRecipe = this.recipeService
  //       .getRecipes()
  //       .find(recipe => recipe.id == recipeId);
  //   }
  // }
}
