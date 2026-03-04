import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Apiservices } from '../services/apiservices';
import { Router ,RouterLink} from '@angular/router';
import { SearchPipe } from '../pipes/search-pipe';
import {NgxPaginationModule} from 'ngx-pagination'; 
@Component({
  selector: 'app-recipe',
  imports: [CommonModule, FormsModule,SearchPipe,NgxPaginationModule],
  templateUrl: './recipe.html',
  styleUrl: './recipe.css',
})
export class Recipe implements OnInit{
    p: number = 1;
   token:any=""
   recipes:any=[]
   cuisinetype:any=[]
   dummyRecipe:any=[]
   nestedMealArray:any=[]
   singleMealArray:any=[]
   updatedMealArray:any=[]
   searchKey:string=''

  constructor(private api:Apiservices,
    private route:Router
  ){}
  ngOnInit(): void {
    this.getRecipe()
    this.token=sessionStorage.getItem('token')
  }
    
  getRecipe(){
    this.api.getRecipeAPI().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.recipes=res.response
        //cuisinetype
        this.dummyRecipe=res.response
        this.recipes.forEach((item:any)=>{
          !this.cuisinetype.includes(item.cuisine) && this.cuisinetype.push(item.cuisine)
            
        })
        console.log(this.cuisinetype)
        //mealtype
        this.nestedMealArray=this.recipes.map((item:any)=>item.mealType)
        console.log(this.nestedMealArray);
        this.singleMealArray=this.nestedMealArray.flat()
        console.log(this.singleMealArray);
        this.singleMealArray.map((item:any)=>{
         !this.updatedMealArray.includes(item)&&this.updatedMealArray.push(item)
        })
        console.log(this.updatedMealArray);    
      },
  
      
    error:(err)=>{
      console.log("api error "+err);     
    }      
    })
  }
  viewrecipe(id:any){
    console.log(id);
    if(this.token){
          this.route.navigateByUrl(`viewrecipe/${id}`)
    }
    else{
      alert("Please login to see Recipe")
    }
  }
  filterRecipe(key:any,value:any){
   this.recipes=this.dummyRecipe.filter((item:any)=>item[key].includes(value))
  }
  // searchText = '';

}
