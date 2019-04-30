import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { StartEditing } from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';
import { FetchRecipes } from '../recipes/store/recipe.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingListState: Observable<{ ingredients: Ingredient[] }>;

  selectedIngredientId: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.store.dispatch(new FetchRecipes());
    this.shoppingListState = this.store.select('shoppingList');
  }

  navigateToRecipes() {
    this.router.navigate(['/recipes']);
  }

  onReload() {
    this.router.navigate(['test'], { relativeTo: this.route });
  }

  onEditItem(index: number) {
    this.store.dispatch(new StartEditing(index));
  }
}
