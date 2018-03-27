import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class BlockService {

  constructor(private http:Http) { }
  AddBlock(formData):Observable<any>
  {
    return this.http.post(environment.blockapi+'/api/BlockChain/AddBlock', formData)  
    .map(res =>{ return res.json()}).catch((error)=> {
      return Observable.throw(
        new Error(`${ error.status } ${ error.statusText }`));
      });  
    
  }
}
