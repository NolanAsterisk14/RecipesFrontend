import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../services/recipe-service';
import { Recipe } from '../../models/recipe';
import { AsyncPipe } from '@angular/common';
import { Observable, switchMap } from 'rxjs';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [AsyncPipe, RouterModule],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.scss'
})
export class RecipeDetail {
  recipe$: Observable<Recipe>;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {
    this.recipe$ = this.route.params.pipe(
      switchMap(params => this.recipeService.getRecipe(params['id']))
    );
  }

  deleteRecipe() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id){
      if (confirm('Are you sure you want to delete this recipe?')){
        this.recipeService.deleteRecipe(+id).subscribe({
          next: () => {
            this.router.navigateByUrl('/');
          },
          error: (err) => {
            console.error(`Error deleting recipe: `, err)
          }
        })
      }
      
    }
  }
}
