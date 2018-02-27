import { Component, OnInit } from '@angular/core';
import { StatusService } from '../services/status.service'
@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  public data:any; 
  public item:any;
  public keys:string[]=[];
  loading:boolean=true;
  hasData:boolean=false;
  constructor(private statusService: StatusService) { }

  ngOnInit() {    
   debugger;
      this.statusService.GetStatus(+sessionStorage.getItem("VamID")).subscribe(response=>
      { 
         if(!(response=="[]"))
          {           
            this.data=Array.of(JSON.parse(response))[0];
            this.item=this.data[0];
            this.keys=Object.keys(this.data[0]);
            this.loading=false;
            this.hasData=true;
          }
          else
          {
            this.loading=false;
          }
      });
  }

  checkIfNull(item:string):boolean
  {
    if(item != "--")
    {
      return true;
    }
    else
    {
      return false;
    }
  }

}
