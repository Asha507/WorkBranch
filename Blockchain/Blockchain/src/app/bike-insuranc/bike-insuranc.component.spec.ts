import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeInsurancComponent } from './bike-insuranc.component';

describe('BikeInsurancComponent', () => {
  let component: BikeInsurancComponent;
  let fixture: ComponentFixture<BikeInsurancComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BikeInsurancComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BikeInsurancComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
