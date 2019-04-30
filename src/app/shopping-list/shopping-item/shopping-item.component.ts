import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.css']
})
export class ShoppingItemComponent implements OnInit, OnDestroy {
  @ViewChild('f')
  shoppingListForm: NgForm;

  startedEditingSubscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.startedEditingSubscription = this.store
      .select('shoppingList')
      .subscribe((state: fromShoppingList.State) => {
        if (state.editedIngredientIndex > -1) {
          this.editedItem = state.editedIngredient;
          this.editMode = true;
          this.shoppingListForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        } else {
          this.editMode = false;
        }
      });
  }

  ngOnDestroy() {
    this.store.dispatch(new ShoppingListActions.StopEditing());
    this.startedEditingSubscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    const ingredient = new Ingredient(
      form.control.value.name,
      form.control.value.amount
    );

    if (this.editMode) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(ingredient));
      this.editMode = false;
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient));
    }
    form.reset();
  }

  onClear() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }
}
