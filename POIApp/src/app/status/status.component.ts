import { Component, OnInit } from '@angular/core';
import { StatusService } from '../services/status.service'
import { JwtauthenticationService } from '../services/jwtauthentication.service';
@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css'],
  providers:[JwtauthenticationService]
})
export class StatusComponent implements OnInit {
  public data:any; 
  public item:any;
  public keys:string[]=[];
  loading:boolean=true;
  hasData:boolean=false;
  appError:boolean=false;
  files:string[];
  constructor(private statusService: StatusService, private jwtauthenticationService: JwtauthenticationService) { }

  ngOnInit() {    
      this.statusService.GetStatus(+sessionStorage.getItem("VamID")).subscribe(response=>
      { 
        debugger;
        response=JSON.parse(this.jwtauthenticationService.decode(response).PayloadData);
         if(!(response=="[]")&&!(response=="") )
          {           
            this.data=Array.of(JSON.parse(response))[0];
            this.item=this.data[0];
            this.keys=Object.keys(this.data[0]);          
            this.hasData=true;
            this.loading=false;
          }
          else
          {
            this.loading=false;
          }
      },
      err=>{  
        this.loading=false;
      });
      this.statusService.GetFilesStatus(+sessionStorage.getItem("VamID")).subscribe(response=>
        { 
          response=JSON.parse(this.jwtauthenticationService.decode(response).PayloadData);
          debugger;
          if(!(response=="[]")&&!(response=="") )
            {           
            this.files=JSON.stringify(response).split(',');
            }
            else
            {
              this.loading=false;
            }
        },
        err=>{  
          this.loading=false;
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
