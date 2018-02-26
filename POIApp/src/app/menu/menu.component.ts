import { Component, OnInit } from '@angular/core';
import {MenuService} from '../services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
show:boolean=false;
  constructor(private menuService:MenuService) { }

  ngOnInit() {
    this.IsAdmin();
  }
  IsAdmin()
  {
    let VamID=sessionStorage.getItem("VamID");
    this.menuService.IsAdmin(+VamID).subscribe(response=>{
      if(response=="true")
      {
        this.show=true;
      }
      else
      {
        this.show=false;
      }
    });
   
  }
}
