import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefviewComponent } from './refview.component';

describe('RefviewComponent', () => {
  let component: RefviewComponent;
  let fixture: ComponentFixture<RefviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
