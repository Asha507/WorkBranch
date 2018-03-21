import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockexplorerComponent } from './blockexplorer.component';

describe('BlockexplorerComponent', () => {
  let component: BlockexplorerComponent;
  let fixture: ComponentFixture<BlockexplorerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockexplorerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockexplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
