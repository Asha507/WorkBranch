import { TestBed, inject } from '@angular/core/testing';

import { MenuServiceService } from './menu-service.service';

describe('MenuServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenuServiceService]
    });
  });

  it('should be created', inject([MenuServiceService], (service: MenuServiceService) => {
    expect(service).toBeTruthy();
  }));
});
