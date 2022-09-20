import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefhomeComponent } from './refhome.component';

describe('RefhomeComponent', () => {
  let component: RefhomeComponent;
  let fixture: ComponentFixture<RefhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefhomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
