import { Component, OnInit } from '@angular/core';
import { ClaimsService } from '../claims.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent implements OnInit {

  email: string;
  contracts: any;
  constructor(private claimsService: ClaimsService,private router:Router) { }

  ngOnInit() {
    this.email = sessionStorage.getItem("Email");
    this.claimsService.GetContracts(this.email).subscribe(response => {
      debugger;
      if (response != null) {
        
        this.contracts = JSON.parse(response);
      }
    });
  }

  FileClaim(ubn)
  {
    sessionStorage.setItem("ClaimUBN",ubn);
    this.router.navigate(['insurance/self-service/contracts/file-claim']);
  }

  ViewClaim(ubn)
  {
    sessionStorage.setItem("ViewUBN",ubn);
    this.router.navigate(['insurance/self-service/contracts/view-claim']);
  }
}
