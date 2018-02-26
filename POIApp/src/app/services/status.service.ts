import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class StatusService {

  constructor(private http:Http) {  }

  GetStatus(id:number):Observable<any>
  {
    if(id==null)
    {
      id=0;
    }
    return this.http.get(environment.api+'/api/File/GetExcelData?id='+id).map(res=>
    {
      return res.json();
    }
    )
  }

}
