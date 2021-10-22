import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScalePickerComponent } from './scale-picker.component';

describe('ScalePickerComponent', () => {
  let component: ScalePickerComponent;
  let fixture: ComponentFixture<ScalePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScalePickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScalePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
