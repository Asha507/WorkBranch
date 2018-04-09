import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class RepairService {

  constructor(private http:Http) { }
  SendForRepair(repairData)
  {
    debugger;
    return this.http.post(environment.repairApi+'api/Repair/AddRepairData',repairData)  
    .map(res =>{ 
     debugger; 
     return res.json()})
    .catch((error)=> { 
      debugger;
     return Observable.throw(
       new Error(`${ error.status } ${ error.statusText }`));
     }); 
  }
  GetRepairRecords()
  {
    return this.http.get(environment.repairApi+'api/Repair/GetRepairs')  
    .map(res =>{ 
     return res.json()})
    .catch((error)=> { 
     return Observable.throw(
       new Error(`${ error.status } ${ error.statusText }`));
     }); 
  }
}
