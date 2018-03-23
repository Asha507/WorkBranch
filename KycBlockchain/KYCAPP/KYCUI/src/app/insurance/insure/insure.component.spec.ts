import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsureComponent } from './insure.component';

describe('InsureComponent', () => {
  let component: InsureComponent;
  let fixture: ComponentFixture<InsureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
