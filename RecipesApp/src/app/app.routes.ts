import { Routes } from '@angular/router';
import { Recipes } from './pages/recipes/recipes';
import { RecipeDetail } from './pages/recipe-detail/recipe-detail';
import { RecipeAdd } from './pages/recipe-add/recipe-add';

export const routes: Routes = [
    { 
        path: '', 
        component: Recipes 
    },
    { 
        path: 'recipe/:id',
        component: RecipeDetail
    },
    {
        path: 'add-recipe',
        component: RecipeAdd
    }
];
