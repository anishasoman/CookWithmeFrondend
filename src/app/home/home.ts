import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Apiservices } from '../services/apiservices';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [CommonModule,RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
recipes: any[] = [];
  feedbacks: any[] = [];  

  constructor(private api: Apiservices) {}

  ngOnInit(): void {
    this.loadApprovedFeedbacks(); 
     this.getAllRecipes();
  }
  getAllRecipes() {
    this.api.getRecipeAPI().subscribe((res: any) => {
      this.recipes = res.response;
     
    });
  }
  loadApprovedFeedbacks() {
    this.api.getApprovedFeedbacksAPI().subscribe({
      next: (res: any) => {
        this.feedbacks = res.feedbacks;
      },
      error: (err) => console.log(err)
    });
  }
}
