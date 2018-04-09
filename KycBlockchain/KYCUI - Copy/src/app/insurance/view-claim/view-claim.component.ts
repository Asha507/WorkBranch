import { Component, OnInit } from '@angular/core';
import { ClaimsService } from '../claims.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-claim',
  templateUrl: './view-claim.component.html',
  styleUrls: ['./view-claim.component.css']
})
export class ViewClaimComponent implements OnInit {

  viewUbn:string;
  claims:any;
  constructor(private claimsService:ClaimsService,private router:Router) { }

  ngOnInit() {
   this.viewUbn=sessionStorage.getItem("ViewUBN");
   this.claimsService.GetClaims(this.viewUbn).subscribe(response=>{
     debugger;
     this.claims=JSON.parse(response);
   });
  }

  Back()
  {
    this.router.navigate(['insurance/self-service/contracts']);
  }

}
