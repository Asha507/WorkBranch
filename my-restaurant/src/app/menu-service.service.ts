import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class MenuServiceService {

  constructor(private http:Http) { }
  
  GetMenuCategories():Observable<any>
  {
    return  this.http.get('/api/GetCategories').map((res)=>{
      return res.json();
     });
  }

  GetSubCategories(category:String):Observable<any>
  {
    return  this.http.get('/api/GetSubCategories?category='+category).map((res)=>{
      return res.json();
     });
  }
  GetItems(category:String,subCategory:String):Observable<any>
  {
    return  this.http.get('/api/GetItems?category='+category+'&subCategory='+subCategory).map((res)=>{
      return res.json();
     });
  }
}
