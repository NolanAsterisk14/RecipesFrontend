import { Component, OnInit } from '@angular/core';
import { RecipeList } from '../../components/recipe-list/recipe-list';
import { Recipe } from '../../models/recipe';
import { RecipeService } from '../../services/recipe-service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [RecipeList, AsyncPipe, RouterModule],
  templateUrl: './recipes.html',
  styleUrl: './recipes.scss'
})
export class Recipes implements OnInit{
  recipes$!:  Observable<Recipe[]>;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipes$ = this.recipeService.getRecipes();
  }
}
