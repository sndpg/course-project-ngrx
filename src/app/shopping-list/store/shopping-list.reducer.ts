import * as ShoppingListActions from './shopping-list.actions';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListAction } from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(
  state = initialState,
  action: ShoppingListActions.ShoppingListActions
) {
  switch (action.type) {
    case ShoppingListAction.AddIngredient:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
        editedIngredient: null,
        editedIngredientIndex: -1
      };

    case ShoppingListAction.AddIngredients:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };

    case ShoppingListAction.UpdateIngredient:
      const ingredientsAfterUpdate = [...state.ingredients];
      ingredientsAfterUpdate[state.editedIngredientIndex] = action.payload;
      return {
        ...state,
        ingredients: ingredientsAfterUpdate,
        editedIngredient: null,
        editedIngredientIndex: -1
      };

    case ShoppingListAction.DeleteIngredient:
      const ingredientsAfterDeletion = [...state.ingredients];
      ingredientsAfterDeletion.splice(state.editedIngredientIndex, 1);
      return {
        ...state,
        ingredients: ingredientsAfterDeletion,
        editedIngredient: null,
        editedIngredientIndex: -1
      };

    case ShoppingListAction.StartEditing:
      return {
        ...state,
        editedIngredient: { ...state.ingredients[action.payload] },
        editedIngredientIndex: action.payload
      };

    case ShoppingListAction.StopEditing:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };

    case ShoppingListAction.SetShoppingList:
      return {
        ...state,
        ingredients: action.payload
      };

    default:
      return state;
  }
}
