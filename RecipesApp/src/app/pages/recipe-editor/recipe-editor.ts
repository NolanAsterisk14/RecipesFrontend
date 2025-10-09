import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RecipeForm } from '../../components/recipe-form/recipe-form';
// import { Recipe } from '../../models/recipe';
// import { RecipeService } from '../../services/recipe-service';
// import { ActivatedRoute } from '@angular/router';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-editor',
  imports: [/*FormsModule*/ RecipeForm],
  templateUrl: './recipe-editor.html',
  styleUrl: './recipe-editor.scss'
})
export class RecipeEditor /*implements OnInit*/ {
  // @ViewChild('ingredientsTextarea') ingredientsTextarea!: ElementRef<HTMLTextAreaElement>;
  // @ViewChild('stepsTextarea') stepsTextarea!: ElementRef<HTMLTextAreaElement>;

  // isEditMode = false;

  // recipe: Recipe = {
  //   id: 0,
  //   title: '',
  //   description: '',
  //   ingredients: '• ',
  //   steps: '1. ',
  //   notes: ''
  // };

  // constructor(
  //   private recipeService: RecipeService,
  //   private route: ActivatedRoute,
  //   private router: Router
  // ) {}

  // ngOnInit(){
  //   const id = this.route.snapshot.paramMap.get('id');
  //   if (id) {
  //       this.isEditMode = true;
  //       this.recipeService.getRecipe(+id).subscribe({
  //         next: (recipe) => {
  //           Object.assign(this.recipe, recipe);
  //           this.recipe.ingredients = this.recipe.ingredients.replaceAll(';', '\n• ');
  //           this.recipe.steps = this.recipe.steps
  //             .split(';')
  //             .map((step, idx) => `${idx + 1}. ${step.trim()}`)
  //             .join('\n');
  //         },
  //         error: (err) => {
  //           console.error('Error getting recipe: ', err);
  //         }
  //     });
  //   }
  // }

  // onSubmit(form: any) {
  //   if (form.valid){
  //     // Clean up ingredients: remove bullets and use ';' as separator
  //     this.recipe.ingredients = this.recipe.ingredients.replace(/\n•\s*/g, ';').replace(/^•\s*/, '');

  //     // Clean up steps: remove leading numbers and dots, use ';' as separator
  //     this.recipe.steps = this.recipe.steps
  //       .split('\n')
  //       .map(line => line.replace(/^\d+\.\s*/, '')) // Remove leading number-dot-space
  //       .filter(line => line.trim() !== '')         // Remove empty lines
  //       .join(';');

  //     console.log(this.recipe);
      
  //     if (this.isEditMode){
  //       const id = this.route.snapshot.paramMap.get('id');
  //       if (id){
  //         this.recipeService.updateRecipe(+id, this.recipe).subscribe({
  //           next: (result) => {
  //             console.log('Recipe updated:', result);
  //             alert('Recipe has been updated!');
  //             this.router.navigateByUrl(`/recipe/${id}`);
  //           },
  //           error: (err) => {
  //             console.error('Error updating recipe:', err);
  //           }
  //         });
  //       }
  //     }
  //     else {
  //       this.recipeService.addRecipe(this.recipe).subscribe({
  //         next: (result) => {
  //           console.log('Recipe added:', result);
  //           alert('Recipe has been added!');
  //           this.router.navigateByUrl('/');
  //         },
  //         error: (err) => {
  //           console.error('Error adding recipe:', err);
  //         }
  //       });
  //     }
      
  //   }
  // }

  // //Behavior for bulleted and numbered lists directly in the textarea element
  // onIngredientsKeyDown(event: KeyboardEvent) {
  //   if (event.key === 'Enter') {
  //     event.preventDefault();
  //     const textarea = this.ingredientsTextarea.nativeElement;
  //     const value = textarea.value;
  //     const selectionStart = textarea.selectionStart;
  //     const before = value.substring(0, selectionStart);
  //     const after = value.substring(selectionStart);
  //     const bullet = '\n• ';
  //     textarea.value = before + bullet + after;
  //     this.recipe.ingredients = textarea.value;
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
  //     textarea.value = before + numbered + after;
  //     this.recipe.steps = textarea.value;
  //     // Move caret after the number
  //     const newPos = before.length + numbered.length;
  //     setTimeout(() => textarea.setSelectionRange(newPos, newPos), 0);
  //   } 
  // }

  // //Behavior for growing a textarea as the text overflows
  // autoGrow(target: EventTarget | null) {
  //   const textArea = target as HTMLTextAreaElement;
  //   if (textArea){
  //     textArea.style.height = 'auto';
  //     textArea.style.height = textArea.scrollHeight + 'px';
  //   }
    
  // }
}
