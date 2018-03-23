import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceLayoutComponent } from './insurance-layout.component';

describe('InsuranceLayoutComponent', () => {
  let component: InsuranceLayoutComponent;
  let fixture: ComponentFixture<InsuranceLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
