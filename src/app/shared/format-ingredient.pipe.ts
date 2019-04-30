import { Pipe, PipeTransform } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Pipe({
  name: 'formatIngredient'
})
export class FormatIngredientPipe implements PipeTransform {
  transform(ingredient: Ingredient, ...args: any[]) {
    return ingredient.name.concat(
      ingredient.amount.toString().trim() !== ''
        ? ' (' + ingredient.amount + ')'
        : ''
    );
  }
}
