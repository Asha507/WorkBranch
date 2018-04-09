import { Component, OnInit } from '@angular/core';
import { PoliceModel } from '../PoliceModel';
import { PoliceService } from '../police.service';
import { ClaimsService } from '../claims.service';
import { BlockService } from '../block.service';

@Component({
  selector: 'app-police',
  templateUrl: './police.component.html',
  styleUrls: ['./police.component.css']
})
export class PoliceComponent implements OnInit {

  thefts: PoliceModel;
  hasrecords: boolean = false;
  constructor(private blockService: BlockService, private policeService: PoliceService, private claimsService: ClaimsService) { }

  ngOnInit() {
    this.policeService.GetTheftDetails().subscribe(response => {
      debugger;
      if (response != "[]") {
        this.hasrecords = true;
        this.thefts = JSON.parse(response);
      }

    });
  }
  updateclaim(status, theft) {
    let claimData = new FormData();
    if (theft.FIRNumber != null) {
      status = status + "FIR Number : " + theft.FIRNumber;
    }
    claimData.append('Status', status);
    claimData.append('ClaimNumber', theft.ClaimNumber);
    claimData.append('FirNumber', theft.FIRNumber);
    this.policeService.UpdateClaim(claimData).subscribe(response => {
      if (response == "Updated Claim Status") {
        this.claimsService.UpdateClaimStatus(claimData).subscribe(response => {
        });
      }
    });
    this.policeService.GetTheftDetails().subscribe(response => {
      this.thefts = JSON.parse(response);
      let blockData = new FormData();
      blockData.append("Data", JSON.stringify(theft));
      blockData.append("UBN", sessionStorage.getItem("ClaimUBN"));
      blockData.append("peer", "InsuranceCompany");
      this.blockService.AddBlock(blockData).subscribe(blockresponse => { });
    });
  }
}
