import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';


@Injectable()
export class ShopService {

  constructor(private http:Http) { }
  UploadData(formData):Observable<any>
  {
    return this.http.post(environment.shopapi+'/api/Shop/SaveData', formData)  
    .map(res =>
      { 
        debugger;
        return res.json()
      }).catch((error)=> {
        debugger;
      return Observable.throw(
        new Error(`${ error.status } ${ error.statusText }`));
      });  
    
  }

  GetProduct(ubn)
  {
    return this.http.get(environment.shopapi+'/api/Shop/GetProduct?ubn='+ubn)  
    .map(res =>
      { 
        debugger;
        return res.json()
      }).catch((error)=> {
        debugger;
      return Observable.throw(
        new Error(`${ error.status } ${ error.statusText }`));
      });  
  }

}
