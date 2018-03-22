import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceHomeComponent } from './insurance-home.component';

describe('InsuranceHomeComponent', () => {
  let component: InsuranceHomeComponent;
  let fixture: ComponentFixture<InsuranceHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
