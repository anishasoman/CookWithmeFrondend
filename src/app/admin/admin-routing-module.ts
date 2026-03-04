import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { DownloadList } from './download-list/download-list';
import { UserList } from './user-list/user-list';
import { RecipeList } from './recipe-list/recipe-list';
import { RequestList } from './request-list/request-list';
import { ManageRecipe } from './manage-recipe/manage-recipe';
import { Add } from './add/add';

const routes: Routes = [
   {
    path:'', component:Dashboard   
   },
   {
    path:'downloadlist', component:DownloadList   
   },
   {
    path:'userlist', component:UserList  
   },   
   {
    path:'recipelist', component:RecipeList  
   },
      {
    path:'add', component:Add  
   },   
   {
    path:'requestlist', component:RequestList  
   },   
   {
    path:'recipeupdate/:id', component:ManageRecipe  
   },  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { 

}
