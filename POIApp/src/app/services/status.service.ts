import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class StatusService {

  constructor(private http:Http) {  }

  GetStatus(id:number):Observable<any>
  {
    if(id!=undefined)
    {
    return this.http.get(environment.api+'/api/File/GetEmployeeData?id='+id).map(res=>
    {
      return res.json();
    }
    ).catch((error)=> {
      return Observable.throw(
        new Error(`${ error.status } ${ error.statusText }`));
      });
    }
  }

  GetFilesStatus(id:number):Observable<any>
  {
    if(id!=undefined)
    {
    return this.http.get(environment.api+'/api/File/GetEmployeeFiles?id='+id).map(res=>
    {
      return res.json();
    }
    ).catch((error)=> {
      return Observable.throw(
        new Error(`${ error.status } ${ error.statusText }`));
      });
    }
  }

  

}
