import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Recipe } from '../../models/recipe';
import { RecipeService } from '../../services/recipe-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-recipe-form',
  imports: [ReactiveFormsModule],
  templateUrl: './recipe-form.html',
  styleUrl: './recipe-form.scss'
})
export class RecipeForm implements OnInit {
  // @ViewChild('ingredientsTextarea') ingredientsTextarea!: ElementRef<HTMLTextAreaElement>;
  // @ViewChild('stepsTextarea') stepsTextarea!: ElementRef<HTMLTextAreaElement>;

  isEditMode = false;
  recipeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    public location: Location
  ) {
    this.recipeForm = this.fb.group({
      id: [0],
      title: ['', Validators.required],
      description: ['', Validators.required],
      ingredients: this.fb.array([this.fb.control('', Validators.required)]),
      steps: this.fb.array([this.fb.control('', Validators.required)]),
      notes: ['']
    });
  }

  get ingredientsArray() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get stepsArray() {
    return this.recipeForm.get('steps') as FormArray;
  }

  addIngredient() {
    this.ingredientsArray.push(this.fb.control('', Validators.required));
  }

  removeIngredient(index: number) {
    this.ingredientsArray.removeAt(index);
  }

  addStep() {
    this.stepsArray.push(this.fb.control('', Validators.required));
  }

  removeStep(index: number) {
    this.stepsArray.removeAt(index);
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
    this.isEditMode = true;
    this.recipeService.getRecipe(+id).subscribe({
      next: (recipe) => {
        // Create FormArray controls with proper validation
        const ingredientControls = recipe.ingredients
          .split(';')
          .filter(ingredient => ingredient.trim() !== '')
          .map(ingredient => this.fb.control(ingredient.trim(), Validators.required));
        
        const stepControls = recipe.steps
          .split(';')
          .filter(step => step.trim() !== '')
          .map(step => this.fb.control(step.trim(), Validators.required));

        // Replace the FormArray instances
        this.recipeForm.setControl('ingredients', this.fb.array(ingredientControls));
        this.recipeForm.setControl('steps', this.fb.array(stepControls));
        
        // Ensure new values are reflected
        this.recipeForm.updateValueAndValidity();

        // Update the primitive fields
        this.recipeForm.patchValue({
          id: recipe.id,
          title: recipe.title,
          description: recipe.description,
          notes: recipe.notes
        });
      },
      error: (err) => {
        console.error('Error getting recipe: ', err);
      }
    });
  }
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      const formValue = this.recipeForm.value;

      const recipe: Recipe = {
        ...formValue,
        ingredients: formValue.ingredients.join(';'),
        steps: formValue.steps.join(';')
      };

      console.log(recipe);
      
      if (this.isEditMode) {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
          this.recipeService.updateRecipe(+id, recipe).subscribe({
            next: (result) => {
              console.log('Recipe updated:', result);
              alert('Recipe has been updated!');
              this.router.navigateByUrl(`/recipe/${id}`);
            },
            error: (err) => {
              console.error('Error updating recipe:', err);
            }
          });
        }
      } else {
        this.recipeService.addRecipe(recipe).subscribe({
          next: (result) => {
            console.log('Recipe added:', result);
            alert('Recipe has been added!');
            this.router.navigateByUrl('/');
          },
          error: (err) => {
            console.error('Error adding recipe:', err);
          }
        });
      }
    }
  }

  // Behavior for bulleted and numbered lists directly in the textarea element
  // onIngredientsKeyDown(event: KeyboardEvent) {
  //   if (event.key === 'Enter') {
  //     event.preventDefault();
  //     const textarea = this.ingredientsTextarea.nativeElement;
  //     const value = textarea.value;
  //     const selectionStart = textarea.selectionStart;
  //     const before = value.substring(0, selectionStart);
  //     const after = value.substring(selectionStart);
  //     const bullet = '\n• ';
  //     const newValue = before + bullet + after;
      
  //     // Update the form control
  //     this.recipeForm.patchValue({ ingredients: newValue });
      
  //     // Move caret after the bullet
  //     const newPos = before.length + bullet.length;
  //     setTimeout(() => textarea.setSelectionRange(newPos, newPos), 0);
  //   }
  // }

  // onStepsKeyDown(event: KeyboardEvent) {
  //   if (event.key === 'Enter') {
  //     event.preventDefault();
  //     const textarea = this.stepsTextarea.nativeElement;
  //     const value = textarea.value;
  //     const selectionStart = textarea.selectionStart;
  //     const before = value.substring(0, selectionStart);
  //     const after = value.substring(selectionStart);

  //     // Count lines to determine next number
  //     const lines = value.substring(0, selectionStart).split('\n');
  //     const nextNumber = lines.length + 1;
  //     const numbered = `\n${nextNumber}. `;
  //     const newValue = before + numbered + after;
      
  //     // Update the form control
  //     this.recipeForm.patchValue({ steps: newValue });
      
  //     // Move caret after the number
  //     const newPos = before.length + numbered.length;
  //     setTimeout(() => textarea.setSelectionRange(newPos, newPos), 0);
  //   } 
  // }

  // Behavior for growing a textarea as the text overflows
  autoGrow(target: EventTarget | null) {
    const textArea = target as HTMLTextAreaElement;
    if (textArea) {
      textArea.style.height = 'auto';
      textArea.style.height = textArea.scrollHeight + 'px';
    }
  }
}