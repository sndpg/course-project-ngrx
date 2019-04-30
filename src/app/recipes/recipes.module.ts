import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-list/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes.component';
import { RecipesRoutingModule } from './recipes.routing.module';
import { StoreModule } from '@ngrx/store';
import { recipesReducer } from './store/recipe.reducer';
import { EffectsModule } from '@ngrx/effects';
import { RecipeEffects } from './store/recipe.effects';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeStartComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeEditComponent
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    StoreModule.forFeature('recipes', recipesReducer),
    EffectsModule.forFeature([RecipeEffects])
  ]
})
export class RecipesModule {}
