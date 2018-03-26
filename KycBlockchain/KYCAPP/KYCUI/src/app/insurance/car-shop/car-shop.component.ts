import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShopModel } from '../ShopModel';
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
  carShopItem:ShopModel;
  model:string;
  constructor(private router:Router) { 
    this.carShopItem =new ShopModel();
    this.carShopItem.Item="Car";
  }

  ngOnInit() {
  }
  Cost(event) {
    debugger;
    this.sNumber = this.GenerateRandomNumber();
    switch (event.target.selectedIndex) {
      case 1:
        this.costS = "6L";
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
    debugger;
    this.carShopItem.Name="Suziki swift";
    this.carShopItem.Model=event.target.value;
    this.carShopItem.cost=this.costS;
    this.carShopItem.SerialNumber=this.sNumber.toString();
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
    this.carShopItem.Name="Suziki swift Dezir";
    this.carShopItem.cost=this.costSD;
    this.carShopItem.SerialNumber=this.sdNumber.toString();
  }
  NextClick()
  {
    debugger;
    sessionStorage.setItem("Item",JSON.stringify(this.carShopItem));
   this.router.navigate(['insurance/shop/car-shop/insure']); 
  }
 
}