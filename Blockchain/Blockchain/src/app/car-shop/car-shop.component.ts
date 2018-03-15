import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-shop',
  templateUrl: './car-shop.component.html',
  styleUrls: ['./car-shop.component.css']
})
export class CarShopComponent implements OnInit {
  costS: string = "";
  costSD: string = "";
  sNumber: number = 0;
  sdNumber: number = 0;
  constructor() { }

  ngOnInit() {
  }
  Cost(event) {
    debugger;
    this.sNumber = this.GenerateRandomNumber();
    switch (event.target.selectedIndex) {
      case 1:
        this.costS = "6L"
        break;
      case 2:
        this.costS = "8L"
        break;
      case 3:
        this.costS = "10L"
        break;
      default:
        this.costS = "";
        break;
    }

  }

  GenerateRandomNumber() {
    return Math.floor(Math.random() * (50 - 1 + 1)) + 1;
  }
  CostSD(event) {
    debugger;
    this.sdNumber = this.GenerateRandomNumber();
    switch (event.target.selectedIndex) {
      case 1:
        this.costSD = "6L"
        break;
      case 2:
        this.costSD = "8L"
        break;
      case 3:
        this.costSD = "10L"
        break;
      default:
        this.costSD = "";
        break;
    }
  }
}