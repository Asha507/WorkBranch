import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css','../CSS/morris.css','../CSS/bootstrap.min.css','../CSS/font-awesome.css','../CSS/icon-font.min.css','../CSS/style.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {

  menuState:string='in';
  constructor() { }

  ngOnInit() {
  }
  Load()
  {
    alert('Hello i am working');
  }

}
