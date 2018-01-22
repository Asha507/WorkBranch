import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

  constructor(private http:Http) { }

  Authenticate(userid:string,pwd:string):Observable<any>
  {
    debugger;
    return  this.http.post('/api/authenticate',
   {"UserID":userid,"password":pwd}).map((res)=>{
     return res.json();
    });
  }
}
