import { Component, Input } from '@angular/core';
import { Recipe } from '../../models/recipe';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recipe-preview',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './recipe-preview.html',
  styleUrl: './recipe-preview.scss'
})
export class RecipePreview {
  @Input() recipe!: Recipe;
}
