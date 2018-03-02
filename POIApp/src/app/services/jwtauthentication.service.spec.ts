import { TestBed, inject } from '@angular/core/testing';

import { JwtauthenticationService } from './jwtauthentication.service';

describe('JwtauthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JwtauthenticationService]
    });
  });

  it('should be created', inject([JwtauthenticationService], (service: JwtauthenticationService) => {
    expect(service).toBeTruthy();
  }));
});
