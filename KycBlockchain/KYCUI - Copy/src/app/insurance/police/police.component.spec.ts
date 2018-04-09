import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliceComponent } from './police.component';

describe('PoliceComponent', () => {
  let component: PoliceComponent;
  let fixture: ComponentFixture<PoliceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoliceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
