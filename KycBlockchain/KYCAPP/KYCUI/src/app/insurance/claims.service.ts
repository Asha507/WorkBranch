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

}
