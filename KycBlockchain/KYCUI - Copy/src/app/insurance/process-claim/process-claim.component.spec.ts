import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessClaimComponent } from './process-claim.component';

describe('ProcessClaimComponent', () => {
  let component: ProcessClaimComponent;
  let fixture: ComponentFixture<ProcessClaimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessClaimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
