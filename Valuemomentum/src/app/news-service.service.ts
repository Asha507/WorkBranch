import { Injectable } from '@angular/core';
import {Http,Response} from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class NewsService {

  constructor(private http:Http) { }
  
    getNews():Observable<any>
    {
      debugger;
      var status= this.http.post('/api/authenticate',
      {"UserID":"asha","password":"asha"}).map((res)=>{
        return res.json();
       });
      alert(JSON.stringify(status));
      return status;
    }
  

}
