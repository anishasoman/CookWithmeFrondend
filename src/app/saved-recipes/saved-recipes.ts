import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Apiservices } from '../services/apiservices';

@Component({
  selector: 'app-saved-recipes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './saved-recipes.html',
  styleUrl: './saved-recipes.css',
})
export class SavedRecipes implements OnInit {

  savedRecipes: any[] = [];

  constructor(private api: Apiservices) {}

  ngOnInit(): void {
    this.getSavedRecipes();
  }

  getSavedRecipes() {
    this.api.getSavedRecipesAPI().subscribe({
      next: (res: any) => {
        console.log("Saved Recipes:", res);
        this.savedRecipes = res.data;   
      },
      error: (err: any) => {
        console.log("Error fetching saved recipes", err);
      }
    });
  }

  deleteRecipe(id: string) {
    this.api.deleteSavedRecipeAPI(id).subscribe({
      next: () => {
        this.savedRecipes = this.savedRecipes.filter(
          (item: any) => item._id !== id
        );
      }
    });
  }
}
