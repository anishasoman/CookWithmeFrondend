import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Apiservices } from '../../services/apiservices';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { Sidebar } from '../sidebar/sidebar';
@Component({
  selector: 'app-recipe-list',
  imports: [CommonModule, FormsModule,NgxPaginationModule,Sidebar],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
})
export class RecipeList implements OnInit {
 p: number = 1;
  recipes: any[] = [];
  filteredRecipes: any[] = [];
  searchText: string = '';

  constructor(private api: Apiservices, private router: Router) {}

  ngOnInit(): void {
    this.getAllRecipes();
  }

  getAllRecipes() {
    this.api.getRecipeAPI().subscribe((res: any) => {
      this.recipes = res.response;
      this.filteredRecipes = this.recipes;
    });
  }

  searchRecipe() {
    this.filteredRecipes = this.recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
addRecipe(){
  this.router.navigate([`/admin/add`]);
}
  // editRecipe(id: string) {
  //   this.router.navigate([`/admin/recipeupdate/${id}`, id]);
  // }
  editRecipe(id: string) {
  this.router.navigate([`/admin/recipeupdate/${id}`]);
}

  deleteRecipe(id: string) {
    if (confirm('Delete this recipe?')) {
      this.api.deleteRecipeAPI(id).subscribe(() => {
        this.getAllRecipes();
      });
    }
  }
}