import { Component, OnInit } from '@angular/core';
import {TableService} from  '../table.service'
import {Table} from '../Table';
import {Router,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css','../CSS/bootstrap.min.css','../CSS/font-awesome.css','../CSS/icon-font.min.css','../CSS/style.css'],
})
export class BillingComponent implements OnInit {

  Numbers:any;
  Tables:Table[];
    constructor(private tableService:TableService,private router:Router,private route:ActivatedRoute) {
    
    }
 
  ngOnInit() {
    debugger;
    this.tableService.GetTableStatus().subscribe(response => {
   this.Numbers=Array(response.result.length).map((x,i)=>i);
   this.Tables=response.result;
   });
  }
GetCategories()
{

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
SetSubClasses(status:String)
{
  let classes: any
  if(status=="Order Completed")
  {
    classes='sub-two'
  }
  else if(status=="Table Occupied")
  {
    classes='sub-one'
  }
  else if(status=="Table Empty")
  {
    classes='sub-three'
  }
  else if(status=="Order Placed")
  {
    classes='sub-four'
  }
return classes;

}

UpdateStatus(status:String)
{
  debugger;
  if(status=="Order Completed")
  {
   this.router.navigate(['../Settlement'],{relativeTo:this.route});
  }
  else if(status=="Table Occupied")
  {
    this.router.navigate(['../Orders'],{relativeTo:this.route});
  }
  else if(status=="Table Empty")
  {
    this.router.navigate(['../Menu'],{relativeTo:this.route});
  }
  else if(status=="Order Placed")
  {
    this.router.navigate(['../Serve'],{relativeTo:this.route});
  }
}
}
