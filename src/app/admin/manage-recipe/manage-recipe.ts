import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Apiservices } from '../../services/apiservices';
import { RecipeModel } from '../models/recipeModel';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manage-recipe',
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-recipe.html',
  styleUrl: './manage-recipe.css',
})
export class ManageRecipe  implements OnInit {

  recipeDetails: RecipeModel = {
  };

  recipes: any[] = [];
  cuisinetype: string[] = [];
  updatedMealArray: string[] = [];

  ingredientInput: string = '';
  instructionInput: string = '';
  recipeId:string=""
  constructor(private api: Apiservices, private ar:ActivatedRoute, private router:Router) {}

  ngOnInit(): void {
    this.ar.params.subscribe((res:any)=>{
      console.log(res);
      this.recipeId=res.id
       this.getRecipe();
    })
  }

  getRecipe() {
    this.api.getRecipeAPI().subscribe({
      next: (res: any) => {
        this.recipes = res.response;
        if(this.recipeId){
          this.recipeDetails=this.recipes.find((item:any)=>item._id==this.recipeId)
        }
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

  this.api.updateRecipeAPI(this.recipeId, this.recipeDetails).subscribe({
    next: () => {
      alert("Recipe Updated Successfully");
      this.router.navigate(['/admin/recipelist']);
    },
    error: (err) => {
      alert(err.error.message || "Something went wrong");
    }
  });
}

}