import { Component, Input } from '@angular/core';
import { Recipe } from '../../models/recipe';
import { RouterLink} from '@angular/router';

@Component({
  selector: 'app-recipe-preview',
  imports: [RouterLink],
  templateUrl: './recipe-preview.html',
  styleUrl: './recipe-preview.scss'
})
export class RecipePreview {
  @Input() recipe!: Recipe;
}
