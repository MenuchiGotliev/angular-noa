import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', loadChildren: () => import('./login-page/login-page.module').then(c => c.LoginPageModule) },
    { path: 'recipe', loadChildren: () => import('./recipe/recipe.module').then(r => r.RecipeModule) },
];
