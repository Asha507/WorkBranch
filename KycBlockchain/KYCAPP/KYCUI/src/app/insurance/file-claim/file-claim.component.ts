import { Component, OnInit } from '@angular/core';
import { ClaimsService } from '../claims.service';
import { BlockService } from '../block.service';
import { Router } from '@angular/router';
import { ClaimModel } from '../ClaimModel';
import { PoliceModel } from '../PoliceModel';
import { ShopService } from '../shop.service';
@Component({
  selector: 'app-file-claim',
  templateUrl: './file-claim.component.html',
  styleUrls: ['./file-claim.component.css']
})
export class FileClaimComponent implements OnInit {

  theft: boolean = false;
  description: string;
  claimNumber:string;
  constructor(private shopService: ShopService, private claimsService: ClaimsService, private blockService: BlockService, private router: Router) { }

  ngOnInit() {
  }
  SubmitClaim() {
    let status = this.theft ? "Sent for Police verification" : "Claim Submitted";
    let claimData = new FormData();
    claimData.append("UBN", sessionStorage.getItem("ClaimUBN"));
    claimData.append("theft", this.theft.toString());
    claimData.append("Desciption", this.description);
    claimData.append("Status", status);
    this.claimsService.RaiseClaim(claimData).subscribe(response => {    
      this.claimNumber=JSON.stringify(response).split(',')[0];
        let claim = new ClaimModel();
        claim.UBN = sessionStorage.getItem("ClaimUBN");
        claim.theftProtection = this.theft.toString();
        claim.Description = this.description;
        claim.CreationDate = JSON.stringify(response).split(',')[1];
        claim.ClaimStatus = status;
        claim.ClaimNumber = this.claimNumber;
        claim.Reimbursable = "0";
        let blockData = new FormData();
        blockData.append("Data", JSON.stringify(claim));
        blockData.append("UBN", sessionStorage.getItem("ClaimUBN"));
        blockData.append("peer", "InsuranceCompany");
        this.blockService.AddBlock(blockData).subscribe(blockresponse => {
          alert('Claim Submitted Successfully to Insurance Company');  
          debugger;
          if(this.theft)
          {
         this.GetProductDetailsFromShop();        
      }      
        },
          err => {

          });
      });
     
   
  }
  GetProductDetailsFromShop() {
    this.shopService.GetProduct(sessionStorage.getItem("ClaimUBN")).subscribe(response => {
      let police = new PoliceModel();
      let shopData=JSON.parse(response);
      police.UBN=sessionStorage.getItem("ClaimUBN");
      police.Item=shopData.Item;
      police.ClaimNumber=this.claimNumber;
      police.Name=shopData.Name;
      police.Model=shopData.Model;  
      police.SerialNumber=shopData.SerialNumber;
      police.Description=this.description;
      this.claimsService.PoliceVerification(police).subscribe(policeresponse => {
        alert('Claim sent to Police for Verification'); 
          let blockData = new FormData();
        blockData.append("Data", JSON.stringify(police));
        blockData.append("UBN", police.UBN);
        blockData.append("peer", "Police");
        this.blockService.AddBlock(blockData).subscribe(blockresponse => {
          debugger;
          console.log('Block added for police theft record')
        },
          err => {

          });
        this.router.navigate(['insurance/self-service/contracts']);       
    });
     });
  }
}

