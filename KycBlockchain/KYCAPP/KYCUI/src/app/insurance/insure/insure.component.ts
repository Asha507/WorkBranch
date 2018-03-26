import { Component, OnInit } from '@angular/core';
import {IMyDpOptions} from 'mydatepicker';
import { ShopModel } from '../ShopModel';

@Component({
  selector: 'app-insure',
  templateUrl: './insure.component.html',
  styleUrls: ['./insure.component.css']
})
export class InsureComponent implements OnInit {
  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
};

// Initialized to specific date (09.10.2018).
public startDate: any ;
public endDate: any ;
contract:string;
dailyPrice:string;
contractTerms:string;
theftProtection:string;
firstName:string;
lastName:string;
email:string;
item:ShopModel;

  constructor() { }

  ngOnInit() {
    debugger;
    this.item=JSON.parse(sessionStorage.getItem("Item"));
  }
  NextClick()
  {
    debugger;
   this.item.insuranceRecord.StartDate=this.startDate;
   this.item.insuranceRecord.LastDate=this.endDate;
  }
}
