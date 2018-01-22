import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css','../CSS/morris.css','../CSS/bootstrap.min.css','../CSS/font-awesome.css','../CSS/icon-font.min.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {

  toggle:boolean=true;
  constructor() { }

  ngOnInit() {
  }
  ToggleMenu(event)
  {
    if(this.toggle)
    {
      alert(event.target);
    }
    
  }

}
