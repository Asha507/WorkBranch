import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css','../CSS/morris.css','../CSS/bootstrap.min.css','../CSS/font-awesome.css','../CSS/icon-font.min.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3D(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3D(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})
export class DashboardComponent implements OnInit {

  menuState:string='out';
  constructor() { }

  ngOnInit() {
  }
  ToggleMenu()
  {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
    
  }

}
