import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheoryHelperComponent } from './theory-helper.component';

describe('TheoryHelperComponent', () => {
  let component: TheoryHelperComponent;
  let fixture: ComponentFixture<TheoryHelperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheoryHelperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TheoryHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
