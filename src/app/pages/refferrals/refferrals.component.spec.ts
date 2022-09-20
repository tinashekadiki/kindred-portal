import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefferralsComponent } from './refferrals.component';

describe('RefferralsComponent', () => {
  let component: RefferralsComponent;
  let fixture: ComponentFixture<RefferralsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefferralsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefferralsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
