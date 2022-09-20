import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefcreateComponent } from './refcreate.component';

describe('RefcreateComponent', () => {
  let component: RefcreateComponent;
  let fixture: ComponentFixture<RefcreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefcreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
