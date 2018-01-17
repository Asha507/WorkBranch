import { Injectable } from '@angular/core';
import {Http} from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class NewsService {
  constructor(private http:Http) { }
  
    GetNews(limit:number):Observable<any>
    {
      return this.http.get('/api/News',{"params":{"limit":limit}}).map((res)=>{
       return res.json();
      });
    }
}
