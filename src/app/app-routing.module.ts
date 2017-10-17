import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './core/home/home.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

import { AuthGuard } from './auth/auth-guard.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'recipes',
    loadChildren: './recipes/recipes.module#RecipesModule',
    canActivate: [AuthGuard] // Refactor: component is still loaded if link is clicked. Use canLoad
  },
  {
    path: 'shopping-list',
    component: ShoppingListComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
