import { Component, OnInit } from '@angular/core';
import { ShopModel } from '../ShopModel';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  shopItem:ShopModel;
  totalAmount:number;
  constructor() { }

  ngOnInit() {
    debugger;
    this.shopItem=JSON.parse(sessionStorage.getItem("Item"));
    this.totalAmount=(+this.shopItem.cost)+(+this.shopItem.insuranceRecord.DailyPrice);
  }

}
