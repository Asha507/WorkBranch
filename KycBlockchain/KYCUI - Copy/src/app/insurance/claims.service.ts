import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class ClaimsService {

  constructor(private http:Http) { }

  GetContracts(email):Observable<any>
  {
    return this.http.get(environment.shopapi+'api/Contracts/GetContracts?email='+email)  
     .map(res =>{ 
      debugger; 
      return res.json()})
     .catch((error)=> { 
       debugger;
      return Observable.throw(
        new Error(`${ error.status } ${ error.statusText }`));
      });    
    
  }
  RaiseClaim(claimData)
  {
    return this.http.post(environment.insuranceCompanyApi+'api/Claims/NewClaim',claimData)  
    .map(res =>{ 
     debugger; 
     return res.json()})
    .catch((error)=> { 
      debugger;
     return Observable.throw(
       new Error(`${ error.status } ${ error.statusText }`));
     }); 
  }

  GetClaims(viewUbn)
  {
    return this.http.get(environment.insuranceCompanyApi+'api/Claims/GetClaims?ubn='+viewUbn)  
    .map(res =>{ 
     debugger; 
     return res.json()})
    .catch((error)=> { 
      debugger;
     return Observable.throw(
       new Error(`${ error.status } ${ error.statusText }`));
     }); 
  }

  GetUnprocessedClaims()
  {
    return this.http.get(environment.insuranceCompanyApi+'api/Claims/GetUnprocessedClaims')  
    .map(res =>{ 
     debugger; 
     return res.json()})
    .catch((error)=> { 
      debugger;
     return Observable.throw(
       new Error(`${ error.status } ${ error.statusText }`));
     }); 
  }

  PoliceVerification(police)
  {
    let formData=new FormData();
    formData.append("Data",JSON.stringify(police));
    return this.http.post(environment.policeApi+'api/Police/TheftDetails',formData)  
    .map(res =>{ 
     debugger; 
     return res.json()})
    .catch((error)=> { 
      debugger;
     return Observable.throw(
       new Error(`${ error.status } ${ error.statusText }`));
     }); 
  }

  UpdateClaimStatus(formData)
  {
    return this.http.post(environment.insuranceCompanyApi+'api/Claims/UpdateClaim',formData)  
    .map(res =>{ 
     debugger; 
     return res.json()})
    .catch((error)=> { 
      debugger;
     return Observable.throw(
       new Error(`${ error.status } ${ error.statusText }`));
     }); 
  }
  }
