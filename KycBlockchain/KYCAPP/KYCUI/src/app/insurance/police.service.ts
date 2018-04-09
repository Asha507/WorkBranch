import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class PoliceService {

  constructor(private http:Http) { }
  GetTheftDetails()
  {
    return this.http.get(environment.policeApi+'api/Police/GetTheftDetails')  
    .map(res =>{ 
     return res.json()})
    .catch((error)=> { 
     return Observable.throw(
       new Error(`${ error.status } ${ error.statusText }`));
     }); 
  }

  UpdateClaim(claimData)
  {
    debugger;
    return this.http.post(environment.policeApi+'api/Status/UpdateTheftDetails',claimData)  
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
