import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service'
import { JwtauthenticationService } from '../services/jwtauthentication.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [JwtauthenticationService]
})
export class AdminComponent implements OnInit {
  public data: any = [];
  public keys: string[] = [];
  rowsOnPage: number = 5;
  public filterQuery = "";
  public showApproveButton:boolean=true;
  public showRejectButton:boolean=true;
  public remark:any =[];
  loading:boolean=true;
  appError:boolean=false;
index:number=0;
  constructor(private adminService: AdminService,private jwtauthenticationService:JwtauthenticationService) {
   this.loading=true;
    this.adminService.GetExcelData().subscribe(response => {
      response=JSON.parse(this.jwtauthenticationService.decode(response).PayloadData);
      if(response!="")
      {
      this.data = JSON.parse(response);
      this.keys = Object.keys(this.data[0]);
      this.loading=false;
      }
      else
      {
        this.loading=false;
      }
    },
    err=>{  
      this.appError = true;
      this.loading=false;
    });
   
  }

  ngOnInit() {

  }
  ApproveRequest(item) {
    this.loading=true;
    this.adminService.ApproveRecord(item).subscribe(response => {
      response=JSON.parse(this.jwtauthenticationService.decode(response).PayloadData);
      if(response=="Success")
      {
        item.Status="Approved";
        this.loading=false;
      }
      else
      {
        this.loading=false;
      }
    },
    err=>{  
      this.appError = true;
      this.loading=false;
    }
    );
   
  }

  RejectRequest(item) {
    this.loading=true;
    this.adminService.RejectRecord(item).subscribe(response => {
      response=JSON.parse(this.jwtauthenticationService.decode(response).PayloadData);
      if(response=="Success")
      {
        item.Status="Rejected";
        this.loading=false;
      }
      else
      {
        this.loading=false;
      }
    },
    err=>{  
      this.appError = true;
       this.loading=false;
    }
    );
  
  }

  ShouldDisable(item,Status)
  {    
    if(item.Status == "Approved" && Status == "Approved")
    {
      return true;
    }
    if(item.Status == "Rejected" && Status == "Approved")
    {
      return false;
    }
    if(item.Status == "Approved"  && Status == "Rejected")
    {
      return false;
    }
    if(item.Status == "Rejected"  && Status == "Rejected")
    {
      return true;
    }
    if(item.Status == "Pending")
    {
      return false;
    }
  }

  AddRemark(item,key,index)
  {
    item[key]=this.remark[index];
  }
}
