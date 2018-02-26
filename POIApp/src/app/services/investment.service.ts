import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
@Injectable()
export class InvestmentService {
data:any;
  constructor(private http: Http) { }



  GetJsonData(): Observable<any> {
    let id=sessionStorage.getItem("VamID")!=null?sessionStorage.getItem("VamID"):0;
    return this.http.get(environment.api+'/api/Configuration/GetFields?id='+id).map((res) => {
      return res.json();       
    });
  }

  GetMonthlyHra():Observable<any>
  {
    let id=sessionStorage.getItem("VamID")!=null?sessionStorage.getItem("VamID"):0;    
    return this.http.get(environment.api+'/api/Configuration/GetHRAFields?id='+id).map((res) => {
      return res.json();       
    });
  }

  GetGuidelines(): Observable<any> {
     return this.http.get(environment.api+'/api/Configuration/GetGuideLines').map((res) => {
      return res.json();       
    });
  }

  UploadData(formData):Observable<any>
  {
    return this.http.post(environment.api+'/api/File/UploadFile', formData)  
    .map(res =>{ return res.json()});  
    
  }

GetConfigData():Observable<any>
{
  return this.http.get(environment.api+'/api/Configuration/GetConfiguration').map((res) => {
    return res.json();       
  });
}
GetMobileEmailDetails(id:number):Observable<any>
{
  return this.http.get(environment.api+'/api/Configuration/GetMobileEmail?id='+id).map((res) => {
    return res.json();       
  });
}
}
