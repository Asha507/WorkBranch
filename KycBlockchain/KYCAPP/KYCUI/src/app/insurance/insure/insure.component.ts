import { Component, OnInit } from '@angular/core';
import {IMyDpOptions} from 'mydatepicker';
import { ShopModel } from '../ShopModel';
import { InsuranceModel } from '../InsuranceModel';
import { Router } from '@angular/router';

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
shopitem:ShopModel;

  constructor(private router:Router) { }

  ngOnInit() {
    debugger;
    this.shopitem=JSON.parse(sessionStorage.getItem("Item"));
  }
  NextClick()
  {
    debugger;
    this.shopitem.insuranceRecord=new InsuranceModel();
    this.shopitem.insuranceRecord.Contract=this.contract;
    this.shopitem.insuranceRecord.DailyPrice=this.dailyPrice;
    this.shopitem.insuranceRecord.ContractTerms=this.contractTerms;
    this.shopitem.insuranceRecord.FirstName=this.firstName;
    this.shopitem.insuranceRecord.LastName=this.lastName;
    this.shopitem.insuranceRecord.TheftProtection=this.theftProtection;
   this.shopitem.insuranceRecord.StartDate=this.startDate;
   this.shopitem.insuranceRecord.LastDate=this.endDate;
   sessionStorage.setItem("Item",JSON.stringify(this.shopitem));
   this.router.navigate(['insurance/shop/car-shop/summary']);
  }
}
