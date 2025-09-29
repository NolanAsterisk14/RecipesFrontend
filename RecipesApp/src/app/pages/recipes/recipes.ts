import { Component, OnInit } from '@angular/core';
import { RecipeList } from '../../components/recipe-list/recipe-list';
import { Recipe } from '../../models/recipe';
import { RecipeService } from '../../services/recipe-service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [RecipeList, AsyncPipe],
  templateUrl: './recipes.html',
  styleUrl: './recipes.scss'
})
export class Recipes implements OnInit{
  recipes$!:  Observable<Recipe[]>;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    // this.recipeService.getRecipes().subscribe({
    //   next: (data: Recipe[]) => {
    //     console.log('Recieved recipes:', data);
    //     this.recipes = data;
    //   },
    //   error: (error) => {
    //     console.error('Failed to fetch recipes: ', error);
    //   }
    // });
    this.recipes$ = this.recipeService.getRecipes();
  }
}
