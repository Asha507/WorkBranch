import { Component, OnInit } from '@angular/core';
import {MenuServiceService} from '../menu-service.service';
import {Item} from '../Item';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css','../CSS/morris.css','../CSS/bootstrap.min.css','../CSS/font-awesome.css','../CSS/icon-font.min.css','../CSS/style.css']
})
export class MenuComponent implements OnInit {

  constructor(private menuService :MenuServiceService) {}
  public categories:any;
  public subCategories:any;
  public items:Item[];
  public showSubCategory:boolean=false;
  public showItems:boolean=false;
  public selectedCategory:String;
  public selectedSubCategory:String;
  ngOnInit() {
    this.GetCategories();
  }

  GetBackgroundImage(category:String)
  {
    let classes:any;
    if(category=="Veg")
    {
      classes= "VegimgBack";
    }
    else if(category=="Non-Veg")
    {
      classes= "NonVegimgBack";
    }
    else if(category=="Indian-Bread")
    {
      classes= "IBimgBack";
    }
    return classes;
  }

  SelectSubCategory(category:String)
   {  
    debugger; 
    this.showItems=false;
     this.selectedCategory=category;
   this.menuService.GetSubCategories(category).subscribe(response=>{  
     this.subCategories=response.result;
   });
   this.showSubCategory=true;
  }
  SelectItems(subCategory:String)
  { 
    this.selectedSubCategory=subCategory
   debugger;
  this.menuService.GetItems(this.selectedCategory,this.selectedSubCategory).subscribe(response=>{  
    debugger;
    this.items=response.result;
  });
  this.showItems=true;
 }
  GetCategories()
  {
    this.menuService.GetMenuCategories().subscribe(response=>{
      this.categories=response.result;
    })
  }
}
