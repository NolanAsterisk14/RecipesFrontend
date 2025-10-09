import { Routes } from '@angular/router';
import { Recipes } from './pages/recipes/recipes';
import { RecipeDetail } from './pages/recipe-detail/recipe-detail';
import { RecipeEditor } from './pages/recipe-editor/recipe-editor';

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
        component: RecipeEditor
    },
    {
        path: 'edit-recipe/:id',
        component: RecipeEditor
    }
];
