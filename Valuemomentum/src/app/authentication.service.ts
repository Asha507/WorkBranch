import { Injectable } from '@angular/core';
import {Http} from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

  constructor(private http:Http) { }

  Authenticate():Observable<any>
  {
   return  this.http.post('/api/authenticate',
   {"email":'asha',"password":"asha"}).map((res)=>{
     return res.json();
    });
  }

}
