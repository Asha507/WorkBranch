import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeInsuranceComponent } from './bike-insurance.component';

describe('BikeInsuranceComponent', () => {
  let component: BikeInsuranceComponent;
  let fixture: ComponentFixture<BikeInsuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BikeInsuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BikeInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
