import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSpecialityComponent } from './new-speciality.component';

describe('NewSpecialityComponent', () => {
  let component: NewSpecialityComponent;
  let fixture: ComponentFixture<NewSpecialityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSpecialityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSpecialityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
