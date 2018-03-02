import { Injectable } from '@angular/core';
import * as jsjwt from 'jsrsasign';
import * as jwt_decode from 'jwt-decode';
@Injectable()
export class JwtauthenticationService {
  secret = "werxhqb98rpaxn39848xrunpaw3489ruxnpa98w4rxn";

  constructor() {
    
  }

  encode(data) {

    var oHeader = { alg: 'HS256', typ: 'JWT' };

    var oPayload = {
      PayloadData: JSON.stringify(data),
      iss: null,
      iat: null,
      exp: null,
      aud: null
    };
    var tNow = jsjwt.KJUR.jws.IntDate.get('now');
    var tEnd = jsjwt.KJUR.jws.IntDate.get('now + 1day');
    oPayload.iss = "http://localhost";
    oPayload.iat = tNow;
    oPayload.exp = tEnd;
    oPayload.aud = "http://localhost";
    var sHeader = JSON.stringify(oHeader);
    var sPayload = JSON.stringify(oPayload);
    var encryptedJWT = jsjwt.KJUR.jws.JWS.sign("HS256", sHeader, sPayload, this.secret);// Header

    return encryptedJWT;
  };

  decode(encodedJwt) {
    return jwt_decode(encodedJwt);
  }

}
