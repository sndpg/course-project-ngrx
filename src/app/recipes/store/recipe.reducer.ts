import { Ingredient } from 'src/app/shared/ingredient.model';
import { AppState } from 'src/app/store/app.reducer';
import { Recipe } from '../recipe.model';
import { RecipeAction, RecipeActions } from './recipe.actions';

export interface RecipesFeatureState extends AppState {
  recipes: State;
}

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [
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
  ]
};

export function recipesReducer(state = initialState, action: RecipeActions) {
  switch (action.type) {
    case RecipeAction.SetRecipes: {
      return { ...state, recipes: [...action.payload] };
    }

    case RecipeAction.AddRecipe: {
      return { ...state, recipes: [...state.recipes, action.payload] };
    }

    case RecipeAction.UpdateRecipe: {
      const updatedRecipes = [...state.recipes];

      updatedRecipes.splice(
        updatedRecipes.findIndex(r => r.id == action.payload.recipe.id),
        1
      );
      updatedRecipes.push(action.payload.recipe);
      sortRecipes(updatedRecipes);

      return { ...state, recipes: updatedRecipes };
    }

    case RecipeAction.DeleteRecipe: {
      const updatedRecipes = [...state.recipes];

      updatedRecipes.splice(
        updatedRecipes.findIndex(r => r.id == action.payload),
        1
      );
      sortRecipes(updatedRecipes);

      return { ...state, recipes: updatedRecipes };
    }
    default:
      return state;
  }
}

function sortRecipes(recipes: Recipe[]) {
  recipes.sort((a, b) => a.id - b.id);
}
