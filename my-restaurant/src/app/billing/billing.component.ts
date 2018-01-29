import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css','../CSS/bootstrap.min.css','../CSS/font-awesome.css','../CSS/icon-font.min.css','../CSS/style.css'],
})
export class BillingComponent implements OnInit {

  Numbers:any;
    constructor() {
      this.Numbers = Array(20).fill(0).map((x,i)=>i);
    }
 
  ngOnInit() {
  }

}
