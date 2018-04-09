import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairShopComponent } from './repair-shop.component';

describe('RepairShopComponent', () => {
  let component: RepairShopComponent;
  let fixture: ComponentFixture<RepairShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepairShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
