import { Component, OnInit } from '@angular/core';
import { ClaimsService } from '../claims.service';
import { ClaimModel } from '../ClaimModel';
import { BlockService } from '../block.service';
import { ShopService } from '../shop.service';
import { ShopModel } from '../ShopModel';
import { RepairModel } from '../RepairModel';
import { RepairService } from '../repair.service';

@Component({
  selector: 'app-process-claim',
  templateUrl: './process-claim.component.html',
  styleUrls: ['./process-claim.component.css']
})
export class ProcessClaimComponent implements OnInit {
 claims:ClaimModel[];
 shopData:ShopModel;
 repairData:RepairModel;
  constructor(private claimsService:ClaimsService,
              private blockService:BlockService,
              private shopService:ShopService,
            private repairService:RepairService) { }

  ngOnInit() {
    this.claimsService.GetUnprocessedClaims().subscribe(response=>{
      debugger;
      this.claims=JSON.parse(response);
    });
  }
  Show(claim)
  {
    debugger;
    if(claim.claimstatus!='Sent for Police verification' && claim.claimstatus!='Sent for Repair')
    {
      return true;
    }
    else
    {
      return false;
    }
  }
  RepairClick(claim)
  {
    debugger;
    claim.claimstatus="Sent for Repair";
    this.shopService.GetProduct(sessionStorage.getItem("ClaimUBN")).subscribe(response => {
      this.shopData=JSON.parse(response);
      this.repairData=new RepairModel();
      this.repairData.Item=this.shopData.Item;
      this.repairData.ClaimNumber=claim.ClaimNumber;
      this.repairData.Description=claim.Description;
      this.repairData.Model=this.shopData.Model;
      this.repairData.Name=this.shopData.Name;
      this.repairData.SerialNumber=this.shopData.SerialNumber;
      this.repairData.ClaimStatus="New";
      this.repairData.UBN=sessionStorage.getItem("ClaimUBN");
      let repairData=new FormData();
      repairData.append("RepairData",JSON.stringify(this.repairData));
      this.repairService.SendForRepair(repairData).subscribe(response=>{
        let formData =new FormData();
        formData.append("ClaimNumber",claim.ClaimNumber);
        formData.append("Status",claim.claimstatus);
        this.claimsService.UpdateClaimStatus(formData).subscribe(response=>{
          let blockData = new FormData();
          blockData.append("Data", JSON.stringify(claim));
          blockData.append("UBN", sessionStorage.getItem("ClaimUBN"));
          blockData.append("peer", "InsuranceCompany");
          this.blockService.AddBlock(blockData).subscribe(blockresponse => {
    
          });
        });
      });
    });


  }
  Reimburse(claim)
  {
    debugger;
    let formData=new FormData();
    formData.append('ClaimNumber',claim.ClaimNumber);
    formData.append('Amount',claim.Reimbursable);
    formData.append('Status',"Completed");
    this.claimsService.ReimburseAmount(formData).subscribe(response=>{
      let blockData = new FormData();
      blockData.append("Data", JSON.stringify(claim));
      blockData.append("UBN", sessionStorage.getItem("ClaimUBN"));
      blockData.append("peer", "InsuranceCompany");
      this.blockService.AddBlock(blockData).subscribe(blockresponse => {

      });
    });
  }
  RejectClick(claim)
  {
    debugger;
    claim.claimstatus="Claim Rejected";
    let formData =new FormData();
    formData.append("ClaimNumber",claim.ClaimNumber);
    formData.append("Status","Claim Rejected");
    this.claimsService.UpdateClaimStatus(formData).subscribe(response=>{
      let blockData = new FormData();
      blockData.append("Data", JSON.stringify(claim));
      blockData.append("UBN", sessionStorage.getItem("ClaimUBN"));
      blockData.append("peer", "InsuranceCompany");
      this.blockService.AddBlock(blockData).subscribe(blockresponse => {

      });
    });
  }

}
