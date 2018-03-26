import { Component, OnInit } from '@angular/core';
import { ShopModel } from '../ShopModel';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  shopItem:ShopModel;
  constructor() { }

  ngOnInit() {
    this.shopItem=JSON.parse(sessionStorage.getItem("Item"));
  }

}
