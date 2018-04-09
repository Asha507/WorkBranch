import { Component, OnInit } from '@angular/core';
import { ShopModel } from '../ShopModel';
import {ShopService} from '../shop.service'
import { BlockService } from '../block.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  shopItem:ShopModel;
  totalAmount:number;
  ubn:string;
  constructor(private shopService:ShopService,private blockService:BlockService,private router:Router) { }

  ngOnInit() {
    debugger;
    this.shopItem=JSON.parse(sessionStorage.getItem("Item"));
    this.totalAmount=(+this.shopItem.cost)+(+this.shopItem.insuranceRecord.DailyPrice);
    this.shopItem.TotalAmount=this.totalAmount.toString();
  }
  OrderClick()
  {
    debugger;
    let formData=new FormData();
    formData.append("ShopData",JSON.stringify(this.shopItem));
    this.shopService.UploadData(formData).subscribe(response => {    
      debugger; 
      console.log(response);
           this.ubn=response["UBN"];
           sessionStorage.setItem("UserName",response["UserName"])
           sessionStorage.setItem("Password",response["C_password"])
           let blockData=new FormData();
           blockData.append("Data",JSON.stringify(this.shopItem));
           blockData.append("UBN",this.ubn);
           blockData.append("peer","Shop");
           this.blockService.AddBlock(blockData).subscribe(response => {    
                 this.router.navigate(['insurance/shop/car-shop/summary']);
                 },
             err => { 

             });
          },
      err => {     
      });
      
  }
}
