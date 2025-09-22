import { Component, Input } from '@angular/core';
import { Recipe } from '../../models/recipe';
import { RecipePreview } from "../recipe-preview/recipe-preview";

@Component({
  selector: 'app-recipe-list',
  imports: [RecipePreview],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.scss'
})
export class RecipeList {
  @Input() recipes: Recipe[] = [];
}
