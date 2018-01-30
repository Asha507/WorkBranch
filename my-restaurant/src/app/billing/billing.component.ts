import { Component, OnInit } from '@angular/core';
import {TableService} from  '../table.service'
import {Table} from '../Table';
@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css','../CSS/bootstrap.min.css','../CSS/font-awesome.css','../CSS/icon-font.min.css','../CSS/style.css'],
})
export class BillingComponent implements OnInit {

  Numbers:any;
  Tables:Table[];
    constructor(private tableService:TableService) {
    
    }
 
  ngOnInit() {
    debugger;
    this.tableService.GetTableStatus().subscribe(response => {
   this.Numbers=Array(response.result.length).map((x,i)=>i);
   this.Tables=response.result;
   });
  }

  SetClasses(status:String)
  {
    let classes: any
      if(status=="Order Completed")
      {
        classes='four-two'
      }
      else if(status=="Table Occupied")
      {
        classes='four-one'
      }
      else if(status=="Table Empty")
      {
        classes='four-three'
      }
      else if(status=="Order Placed")
      {
        classes='four-four'
      }
    return classes;
    
}
}
