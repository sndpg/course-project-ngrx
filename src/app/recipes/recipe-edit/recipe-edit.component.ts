import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  AbstractControl
} from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';
import * as fromRecipe from '../store/recipe.reducer';
import { Store } from '@ngrx/store';
import { UpdateRecipe, AddRecipe } from '../store/recipe.actions';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  ingredientAmountValidators = [
    Validators.required,
    Validators.pattern(/^[1-9]+[0-9]*$/)
  ];

  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private store: Store<fromRecipe.RecipesFeatureState>
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(
        'RecipeEditComponent.ngOnInit: route params.id = ' + params.id
      );
      this.id = +params.id;
      this.editMode = params.id != null;
      this.initForm();
    });
  }

  onSubmit() {
    console.log(this.recipeForm);
    const recipe = new Recipe(
      this.id,
      this.recipeForm.value.name,
      this.recipeForm.value.description,
      this.recipeForm.value.imagePath,
      this.recipeForm.value.ingredients.map(
        ingredient =>
          new Ingredient(ingredient.ingredientName, ingredient.ingredientAmount)
      )
    );

    if (this.editMode) {
      this.store.dispatch(new UpdateRecipe({ id: this.id, recipe }));
    } else {
      recipe.id =
        this.recipeService
          .getRecipes()
          .reduce((previous, current) =>
            current.id > previous.id ? current : previous
          ).id + 1;
      this.store.dispatch(new AddRecipe(recipe));
    }
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  getIngredientsControls(): AbstractControl[] {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        ingredientName: new FormControl(null, Validators.required),
        ingredientAmount: new FormControl(null, this.ingredientAmountValidators)
      })
    );
  }

  onDeleteIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      this.store
        .select('recipes')
        .pipe(take(1))
        .subscribe(recipesState => {
          const currentRecipe = recipesState.recipes.find(
            // tslint:disable-next-line: triple-equals
            recipe => recipe.id == this.id
          );
          recipeName = currentRecipe.name;
          recipeImagePath = currentRecipe.imagePath;
          recipeDescription = currentRecipe.description;

          if (currentRecipe.ingredients) {
            currentRecipe.ingredients.forEach((ingredient: Ingredient) => {
              recipeIngredients.push(
                new FormGroup({
                  ingredientName: new FormControl(
                    ingredient.name,
                    Validators.required
                  ),
                  ingredientAmount: new FormControl(
                    ingredient.amount,
                    this.ingredientAmountValidators
                  )
                })
              );
            });
          }
        });
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath),
      description: new FormControl(recipeDescription),
      ingredients: recipeIngredients
    });
  }
}
