import { Injectable } from '@angular/core';
import {Http} from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminService {
  constructor(private http:Http) { }

  GetExcelData():Observable<any>
  {
    return this.http.get('/api/File/GetExcelData').map(res=>
      {
        return res.json();
      });
  }

  ApproveRecord(item):Observable<any>
  {
    debugger;
    return this.http.post('/api/File/UpdateStatus',{"VamID":item.VamID,"Status":"Approve"}).map(res=>
      {
        return res.json();
      });
  }

  RejectRecord(item):Observable<any>
  {
    return this.http.post('/api/File/UpdateStatus',{"VamID":item.VamID,"Status":"Reject"}).map(res=>
      {
        return res.json();
      });
  }

}
