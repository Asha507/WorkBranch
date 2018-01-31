import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css','../CSS/morris.css','../CSS/bootstrap.min.css','../CSS/font-awesome.css','../CSS/icon-font.min.css','../CSS/style.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

  public showSubCategory:boolean=false;
  public showItems:boolean=false;
  ngOnInit() {
  }
SelectSubCategory(category:String)
{
  this.showSubCategory=true;
  if(category=="Non-Veg")
  {
    
  }
}
}
