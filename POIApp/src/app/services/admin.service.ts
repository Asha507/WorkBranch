import { Injectable } from '@angular/core';
import {Http} from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class AdminService {
  constructor(private http:Http) { }

  GetExcelData():Observable<any>
  {
    return this.http.get(environment.api+'/api/File/GetExcelData').map(res=>
      {
        return res.json();
      });
  }

  ApproveRecord(item):Observable<any>
  {
    return this.http.post(environment.api+'/api/File/UpdateStatus',{"VamID":item.VamID,"Status":"Approved"}).map(res=>
      {
        return res.json();
      });
  }

  RejectRecord(item):Observable<any>
  {
    return this.http.post('/api/File/UpdateStatus',{"VamID":item.VamID,"Status":"Rejected"}).map(res=>
      {
        return res.json();
      });
  }

}
