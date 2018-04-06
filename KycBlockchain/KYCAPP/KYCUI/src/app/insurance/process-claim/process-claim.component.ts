import { Component, OnInit } from '@angular/core';
import { ClaimsService } from '../claims.service';
import { ClaimModel } from '../ClaimModel';

@Component({
  selector: 'app-process-claim',
  templateUrl: './process-claim.component.html',
  styleUrls: ['./process-claim.component.css']
})
export class ProcessClaimComponent implements OnInit {
 claims:ClaimModel[];
  constructor(private claimsService:ClaimsService) { }

  ngOnInit() {
    this.claimsService.GetUnprocessedClaims().subscribe(response=>{
      debugger;
      this.claims=JSON.parse(response);
    });
  }

  RepairClick(claim)
  {
    debugger;
    claim.claimstatus="Sent for Repair";

  }

  RejectClick(claim)
  {
    debugger;
    claim.claimstatus="Rejected";
    let formData =new FormData();
    formData.append("ClaimNumber",claim.ClaimNumber);
    formData.append("Status","Claim Rejected");
    this.claimsService.UpdateClaimStatus(formData).subscribe(response=>{});
  }

}
