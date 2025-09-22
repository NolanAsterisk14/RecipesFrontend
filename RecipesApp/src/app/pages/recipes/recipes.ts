import { Component, OnInit } from '@angular/core';
import { RecipeList } from '../../components/recipe-list/recipe-list';
import { Recipe } from '../../models/recipe';
import { RecipeService } from '../../services/recipe-service';

@Component({
  selector: 'app-recipes',
  imports: [RecipeList],
  templateUrl: './recipes.html',
  styleUrl: './recipes.scss'
})
export class Recipes implements OnInit {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe(
      (data: Recipe[]) => {
        this.recipes = data;
      }
    )
  }
}
