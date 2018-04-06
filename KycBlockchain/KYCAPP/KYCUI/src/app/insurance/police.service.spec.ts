import { TestBed, inject } from '@angular/core/testing';

import { PoliceService } from './police.service';

describe('PoliceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PoliceService]
    });
  });

  it('should be created', inject([PoliceService], (service: PoliceService) => {
    expect(service).toBeTruthy();
  }));
});
