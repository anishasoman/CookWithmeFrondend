import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Apiservices } from '../services/apiservices';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-viewrecipe',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './view-recipe.html',
  styleUrls: ['./view-recipe.css'],
})
export class ViewRecipe implements OnInit {

  recipeId: any = "";
  recipe: any;
  relatedRecipes: any[] = [];   //store related recipes

  isSaved: boolean = false;   
  savedId: string = "";  

  constructor(
    private ar: ActivatedRoute,
    private api: Apiservices,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.ar.params.subscribe((res: any) => {
      this.recipeId = res.id;
      this.displayRecipe();
    });
  }

  displayRecipe() {
    this.api.viewRecipeAPI(this.recipeId).subscribe({
      next: (res: any) => {
        this.recipe = res;

        //  Call related API AFTER recipe loads
        this.displayRelatedRecipe();

        this.checkIfSaved(); 
      },
      error: (err: any) => {
        console.log("API error " + err);
      }
    });
  }

  displayRelatedRecipe() {
    this.api.getRelatedRecipesAPI(this.recipe.cuisine).subscribe({
      next: (res: any) => {
        // Exclude current recipe
        this.relatedRecipes = res.filter(
          (item: any) => item._id !== this.recipeId
        );
      }
    });
  }
  // ===============================
  // Check if already saved
  // ===============================
checkIfSaved() {
  this.api.getSavedRecipesAPI().subscribe({
    next: (res: any) => {

const found = res.data.find(
  (item: any) => item.recipeId.toString() === this.recipeId
);

      if (found) {
        this.isSaved = true;
        this.savedId = found._id;
      } else {
        this.isSaved = false;
      }
    }
  });
}


toggleSave() {

  if (!this.isSaved) {

    const data = {
      name: this.recipe.name || this.recipe.title,
      image: this.recipe.image
    };

    this.api.saveRecipeAPI(this.recipeId, data).subscribe({
      next: () => {
        this.isSaved = true;
        this.checkIfSaved();
      },
      error: (err) => {
        alert(err.error.message);
      }
    });

  } else {

    this.api.deleteSavedRecipeAPI(this.savedId).subscribe({
      next: () => {
        this.isSaved = false;
      }
    });

  }
}

addDownload() {

  this.api.addDownloadAPI(this.recipeId, this.recipe).subscribe({
    next: (res: any) => {
      this.generatePDF()
      alert(res.message);
    },
    error: (err) => {
      alert(err?.error?.message || "Download failed");
    }
  });
}
generatePDF(){
    //create pdf object
    const pdf = new jsPDF()
    //For styling
    pdf.setFontSize(16)
    pdf.setTextColor("red")
    pdf.text(this.recipe.name,10,10)
    pdf.setFontSize(12)
    pdf.setTextColor("black")
    //pdf contents
    pdf.text(`Cuisine : ${this.recipe.cuisine}`,10,20)
    pdf.text(`Servings : ${this.recipe.servings}`,10,25)
    pdf.text(`Mode of Cooking : ${this.recipe.difficulty}`,10,30)
    pdf.text(`Total Preparation Time : ${this.recipe.prepTimeMinutes} Minutes`,10,35)
    pdf.text(`Total Cooking Time : ${this.recipe.cookTimeMinutes} Minutes`,10,40)
    pdf.text(`Total Calorie Per Servings : ${this.recipe.caloriesPerServing}`,10,45)
    //Table creation
    let head = [['Ingredients Needed','Cooking Instructions']]
    let body = []

    body.push([this.recipe.ingredients,this.recipe.instructions])
    //table generation
    autoTable(pdf,{head,body,startY:50})

    pdf.output('dataurlnewwindow')
    pdf.save('download-recipe.pdf')
        }

  back() {
    this.route.navigateByUrl('/allrecipes');
  }
}

