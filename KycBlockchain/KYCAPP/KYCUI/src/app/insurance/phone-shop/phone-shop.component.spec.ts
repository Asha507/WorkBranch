import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneShopComponent } from './phone-shop.component';

describe('PhoneShopComponent', () => {
  let component: PhoneShopComponent;
  let fixture: ComponentFixture<PhoneShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
