import { Injectable } from '@angular/core';
import {Http} from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class NewsService {
 public news;
  constructor(private http:Http) { }
  
    getNews():Observable<any>
    {
      this.http.get('/api/News').map((res)=>{
        alert(res);
      });
      return  this.http.get('/api/News').map((res)=>{
        res;
      });
    }
  

}
