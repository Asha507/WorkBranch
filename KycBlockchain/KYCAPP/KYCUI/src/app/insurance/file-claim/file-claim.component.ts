import { Component, OnInit } from '@angular/core';
import { ClaimsService } from '../claims.service';

@Component({
  selector: 'app-file-claim',
  templateUrl: './file-claim.component.html',
  styleUrls: ['./file-claim.component.css']
})
export class FileClaimComponent implements OnInit {

  theft:boolean;
  description:string;
  constructor(private claimsService:ClaimsService) { }

  ngOnInit() {
  }
  SubmitClaim()
  {
  let claimData=new FormData();
  claimData.append("UBN",sessionStorage.getItem("ClaimUBN"));
  claimData.append("theft",this.theft.toString());
  claimData.append("Desciption",this.description);
  claimData.append("Status","Claim Submitted");
  this.claimsService.RaiseClaim(claimData).subscribe(response=>{});
  }
}
