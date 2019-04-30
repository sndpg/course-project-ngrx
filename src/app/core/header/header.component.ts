import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Logout } from 'src/app/auth/store/auth.actions';
import { AppState } from 'src/app/store/app.reducer';
import * as fromAuth from '../../auth/store/auth.reducer';
import { RecipeService } from '../../recipes/recipe.service';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import {
  FetchRecipes,
  SaveRecipes
} from 'src/app/recipes/store/recipe.actions';
import {
  SaveShoppingList,
  FetchShoppingList
} from 'src/app/shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onLogout() {
    this.store.dispatch(new Logout());
  }

  onSaveData() {
    this.store.dispatch(new SaveShoppingList());
    this.store.dispatch(new SaveRecipes());
  }

  onFetchData() {
    this.store.dispatch(new FetchShoppingList());
    this.store.dispatch(new FetchRecipes());
  }
}
