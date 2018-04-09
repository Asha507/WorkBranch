import { Component, OnInit } from '@angular/core';
import { ShopModel } from '../ShopModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
user:string;
password:string;
  constructor() { }

  ngOnInit() {
   this.user=sessionStorage.getItem("UserName");
   this.password=sessionStorage.getItem("Password");
  }
 
}
