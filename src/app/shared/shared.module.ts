import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';
import { FormatIngredientPipe } from './format-ingredient.pipe';

@NgModule({
  declarations: [DropdownDirective, FormatIngredientPipe],
  exports: [CommonModule, DropdownDirective, FormatIngredientPipe]
})
export class SharedModule {}
