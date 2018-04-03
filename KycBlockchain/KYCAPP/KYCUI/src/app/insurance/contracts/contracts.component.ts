import { Component, OnInit } from '@angular/core';
import { ClaimsService } from '../claims.service';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent implements OnInit {

  email:string;
  constructor(private claimsService:ClaimsService) { }

  ngOnInit() {
    this.claimsService.GetContracts(this.email).subscribe(response=>{});
  }

}
