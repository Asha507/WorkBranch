import { Component, OnInit } from '@angular/core';
import { BlockService } from '../block.service';
import { RepairService } from '../repair.service';
import { RepairModel } from '../RepairModel';
import { ClaimsService } from '../claims.service';

@Component({
  selector: 'app-repair-shop',
  templateUrl: './repair-shop.component.html',
  styleUrls: ['./repair-shop.component.css']
})
export class RepairShopComponent implements OnInit {
  hasrecords:boolean=false;
  repairRecords:RepairModel[];
  constructor(private blockService: BlockService,private repairService:RepairService,private claimsService:ClaimsService) { }

  ngOnInit() {
    this.repairService.GetRepairRecords().subscribe(response => {
      debugger;
      if (response != "[]") {
        this.hasrecords = true;
        this.repairRecords = JSON.parse(response);
      }

    });
  }

  RepairCompleted(repair)
  {
    debugger;
    repair.ClaimStatus="Completed";
    let claimNumber=repair.ClaimNumber;
    let repairData=new FormData();
    repairData.append("ClaimNumber",claimNumber);
    repairData.append("Status",repair.ClaimStatus);
    this.repairService.UpdateStatus(repairData).subscribe(response => {
      let claimData =new FormData();
      claimData.append("ClaimNumber",repair.ClaimNumber);
      claimData.append("Status",repair.ClaimStatus);
      this.claimsService.UpdateClaimStatus(claimData).subscribe(response=>{
        let blockData = new FormData();
        blockData.append("Data", JSON.stringify(repair));
        blockData.append("UBN", sessionStorage.getItem("ClaimUBN"));
        blockData.append("peer", "InsuranceCompany");
        this.blockService.AddBlock(blockData).subscribe(blockresponse => {
          console.log("Repaired record is added to block");
          this.repairService.GetRepairRecords().subscribe(response => {
            debugger;
            if (response != "[]") {
              this.hasrecords = true;
              this.repairRecords = JSON.parse(response);
            }
      
          });
        });
      });
      });
  }

}
