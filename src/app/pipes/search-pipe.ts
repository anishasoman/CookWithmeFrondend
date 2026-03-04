import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(recipes:any[], searckKey:string): any {
    let result:any=[]
          if(!recipes || searckKey==''){
        return recipes
      }
      else{
        result=recipes.filter((item:any)=>item.name.toLowerCase().trim().includes(searckKey.toLocaleLowerCase().trim()))
        return result
      }
  }

}
