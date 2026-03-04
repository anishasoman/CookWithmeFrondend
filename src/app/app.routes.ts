import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { Recipe } from './recipe/recipe';
import { ViewRecipe } from './view-recipe/view-recipe';
import { Profile } from './profile/profile';
import { Pnf } from './pnf/pnf';
import { Register } from './register/register';
import { Login } from './login/login';
import { SavedRecipes } from './saved-recipes/saved-recipes';

export const routes: Routes = [
    //lazy loaded module: // http://localhost:4200/admin/
    {
        path:'admin' , loadChildren:()=>import('./admin/admin-module').then(m=>m.AdminModule)
    },
{
    path:'', component:Home
},
{
    path:'about', component:About
},
{
    path:'contact', component:Contact
},
{
    path:'register', component:Register
},
{
    path:'login', component:Login
},
{
    path:'allrecipes', component:Recipe
},
{
    path:'savedrecipes', component:SavedRecipes
},
{
    path:'viewrecipe/:id', component:ViewRecipe
},
{
    path:'profile', component:Profile
},
{
    path:'**', component:Pnf
},

];
