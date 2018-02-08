import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
@Injectable()
export class InvestmentService {
data:any;
  constructor(private http: Http) { }

  GetJsonData(filename: String): Observable<any> {
    return this.http.get('/assets/'+filename).map((res) => {
      this.data=res.json();
      debugger;
      return this.data;
    });
  }

}
