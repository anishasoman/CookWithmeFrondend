import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Apiservices } from '../../services/apiservices';
import { RecipeModel } from '../models/recipeModel';
import { Sidebar } from "../sidebar/sidebar";
@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, FormsModule,Sidebar],
  templateUrl: './add.html',
  styleUrl: './add.css',
})
export class Add implements OnInit {

  recipeDetails: RecipeModel = {
    name: '',
    cuisine: '',
    difficulty: '',
    image: '',
    prepTimeMinutes: undefined,
    cookTimeMinutes: undefined,
    servings: undefined,
    caloriesPerServing: undefined,
    ingredients: [],
    instructions: [],
    mealType: []
  };

  recipes: any[] = [];
  cuisinetype: string[] = [];
  updatedMealArray: string[] = [];

  ingredientInput: string = '';
  instructionInput: string = '';

  constructor(private api: Apiservices) {}

  ngOnInit(): void {
    this.getRecipe();
  }

  getRecipe() {
    this.api.getRecipeAPI().subscribe({
      next: (res: any) => {
        this.recipes = res.response;

        // Fetch unique cuisine
        this.recipes.forEach((item: any) => {
          if (item.cuisine && !this.cuisinetype.includes(item.cuisine)) {
            this.cuisinetype.push(item.cuisine);
          }
        });

        // Fetch unique meal types
        const meals = this.recipes.map((item: any) => item.mealType).flat();
        meals.forEach((meal: string) => {
          if (!this.updatedMealArray.includes(meal)) {
            this.updatedMealArray.push(meal);
          }
        });
      },
      error: (err) => {
        console.log("API error:", err);
      }
    });
  }

  addIngredient() {
    if (this.ingredientInput.trim()) {
      this.recipeDetails.ingredients?.push(this.ingredientInput.trim());
      this.ingredientInput = '';
    }
  }

  removeIngredient(index: number) {
    this.recipeDetails.ingredients?.splice(index, 1);
  }

  addInstruction() {
    if (this.instructionInput.trim()) {
      this.recipeDetails.instructions?.push(this.instructionInput.trim());
      this.instructionInput = '';
    }
  }

  removeInstruction(index: number) {
    this.recipeDetails.instructions?.splice(index, 1);
  }

  onMealTypeChange(event: any, type: string) {
    if (event.target.checked) {
      this.recipeDetails.mealType?.push(type);
    } else {
      this.recipeDetails.mealType =
        this.recipeDetails.mealType?.filter(item => item !== type);
    }
  }

  onSubmit() {
    console.log(this.recipeDetails);

    this.api.addRecipeAPI(this.recipeDetails).subscribe({
      next: () => {
        alert("Recipe Added Successfully");
      },
      error: (err) => {
        alert(err.error.message || "Something went wrong");
      }
    });
  }
}
