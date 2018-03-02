import { Component, OnInit } from '@angular/core';
import {MenuService} from '../services/menu.service';
import { JwtauthenticationService } from '../services/jwtauthentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers:[JwtauthenticationService]
})
export class MenuComponent implements OnInit {
show:boolean=false;
  constructor(private menuService:MenuService,private jwtauthenticationService:JwtauthenticationService) { }

  ngOnInit() {
    this.IsAdmin();
  }
  IsAdmin()
  {
    let VamID=sessionStorage.getItem("VamID");
    this.menuService.IsAdmin(+VamID).subscribe(response=>{
      response=JSON.parse(this.jwtauthenticationService.decode(response).PayloadData);
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
