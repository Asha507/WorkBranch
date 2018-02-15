import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service'
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public data: any = [];
  public keys: string[] = [];
  rowsOnPage: number = 5;
  public filterQuery = "";
  public showApproveButton:boolean=true;
  public showRejectButton:boolean=true;

  constructor(private adminService: AdminService) {
    this.adminService.GetExcelData().subscribe(response => {
      this.data = JSON.parse(response);
      this.keys = Object.keys(this.data[0]);
    })
  }

  ngOnInit() {

  }

  ApproveRequest(item) {
    this.adminService.ApproveRecord(item).subscribe(response => {
      if(response=="Success")
      {
        item.Status="Approve";
      }
    }
    );
  }

  RejectRequest(item) {
    this.adminService.RejectRecord(item).subscribe(response => {
      if(response=="Success")
      {
        item.Status="Reject";
      }
    }
    );
  }

  ShouldDisable(item,Status)
  {
    if(item.Status == "Approve" && Status == "Approve")
    {
      return true;
    }
    if(item.Status == "Reject" && Status == "Approve")
    {
      return false;
    }
    if(item.Status == "Approve"  && Status == "Reject")
    {
      return false;
    }
    if(item.Status == "Reject"  && Status == "Reject")
    {
      return true;
    }
  }
}
