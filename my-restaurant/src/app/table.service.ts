import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class TableService {

  constructor(private http:Http) { }

GetTableStatus():Observable<any>
{
  return  this.http.get('/api/GetTableStatus').map((res)=>{
    return res.json();
   });
}
}
