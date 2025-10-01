import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Recipe } from '../../models/recipe';
import { RecipeService } from '../../services/recipe-service';

@Component({
  selector: 'app-recipe-add',
  imports: [FormsModule],
  templateUrl: './recipe-add.html',
  styleUrl: './recipe-add.scss'
})
export class RecipeAdd {
  @ViewChild('ingredientsTextarea') ingredientsTextarea!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('stepsTextarea') stepsTextarea!: ElementRef<HTMLTextAreaElement>;

  recipe: Recipe = {
    id: 0,
    title: '',
    description: '',
    ingredients: '• ',
    steps: '1. ',
    notes: ''
  };

  constructor(private recipeService: RecipeService) {}

  onSubmit(form: any) {
    if (form.valid){
      // Clean up ingredients: remove bullets and use ';' as separator
      this.recipe.ingredients = this.recipe.ingredients.replace(/\n•\s*/g, ';').replace(/^•\s*/, '');

      // Clean up steps: remove leading numbers and dots, use ';' as separator
      this.recipe.steps = this.recipe.steps
        .split('\n')
        .map(line => line.replace(/^\d+\.\s*/, '')) // Remove leading number-dot-space
        .filter(line => line.trim() !== '')         // Remove empty lines
        .join(';');

      console.log(this.recipe);
      
      this.recipeService.addRecipe(this.recipe).subscribe({
        next: (result) => {
          console.log('Recipe added:', result);
          alert("Recipe has been added!");
          form.resetForm();
          this.recipe = {
            id: 0,
            title: '',
            description: '',
            ingredients: '• ',
            steps: '1. ',
            notes: ''
          };
        },
        error: (err) => {
          console.error('Error adding recipe:', err);
        }
      });
    }
  }

  //Behavior for bulleted and numbered lists directly in the textarea element
  onIngredientsKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const textarea = this.ingredientsTextarea.nativeElement;
      const value = textarea.value;
      const selectionStart = textarea.selectionStart;
      const before = value.substring(0, selectionStart);
      const after = value.substring(selectionStart);
      const bullet = '\n• ';
      textarea.value = before + bullet + after;
      this.recipe.ingredients = textarea.value;
      // Move caret after the bullet
      const newPos = before.length + bullet.length;
      setTimeout(() => textarea.setSelectionRange(newPos, newPos), 0);
    }
  }

  onStepsKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const textarea = this.stepsTextarea.nativeElement;
      const value = textarea.value;
      const selectionStart = textarea.selectionStart;
      const before = value.substring(0, selectionStart);
      const after = value.substring(selectionStart);

      // Count lines to determine next number
      const lines = value.substring(0, selectionStart).split('\n');
      const nextNumber = lines.length + 1;
      const numbered = `\n${nextNumber}. `;
      textarea.value = before + numbered + after;
      this.recipe.steps = textarea.value;
      // Move caret after the number
      const newPos = before.length + numbered.length;
      setTimeout(() => textarea.setSelectionRange(newPos, newPos), 0);
    } 
  }

  //Behavior for growing a textarea as the text overflows
  autoGrow(target: EventTarget | null) {
    const textArea = target as HTMLTextAreaElement;
    if (textArea){
      textArea.style.height = 'auto';
      textArea.style.height = textArea.scrollHeight + 'px';
    }
    
  }
}
