import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
@Injectable()
export class InvestmentService {
data:any;
  constructor(private http: Http) { }

  GetJsonData(): Observable<any> {
    return this.http.get('/api/Configuration/GetFields?id='+localStorage.getItem("VamID")).map((res) => {
      return res.json();       
    });
  }

  GetGuidelines(): Observable<any> {
     return this.http.get('/api/Configuration/GetGuideLines').map((res) => {
      return res.json();       
    });
  }

  UploadData(formData):Observable<any>
  {
    return this.http.post('/api/File/UploadFile', formData)  
    .map(res =>{ return res.json()});  
    
  }

GetConfigData():Observable<any>
{
  return this.http.get('/api/Configuration/GetConfiguration').map((res) => {
    return res.json();       
  });
}

}
