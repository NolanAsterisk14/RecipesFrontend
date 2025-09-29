import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../services/recipe-service';
import { Recipe } from '../../models/recipe';
import { AsyncPipe } from '@angular/common';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.scss'
})
export class RecipeDetail {
  recipe$: Observable<Recipe>;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {
    this.recipe$ = this.route.params.pipe(
      switchMap(params => this.recipeService.getRecipe(params['id']))
    );
  }
}
