import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ShoppingItemComponent } from './shopping-item/shopping-item.component';
import { ShoppingListComponent } from './shopping-list.component';
import { EffectsModule } from '@ngrx/effects';
import { ShoppingListEffects } from './store/shopping-list.effects';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingItemComponent],
  imports: [
    SharedModule,
    FormsModule,
    EffectsModule.forRoot([ShoppingListEffects])
  ]
})
export class ShoppingListModule {}
