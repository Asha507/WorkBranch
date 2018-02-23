import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class MenuService {

constructor(private http:Http) { }

IsAdmin(id:number):Observable<any>
{
  return this.http.get('/api/Configuration/CheckIfAdmin?id='+id).map((res) => {
    return res.json();       
  });
}

}
