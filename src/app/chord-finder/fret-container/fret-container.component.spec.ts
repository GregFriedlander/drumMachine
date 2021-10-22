import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FretContainerComponent } from './fret-container.component';

describe('FretContainerComponent', () => {
  let component: FretContainerComponent;
  let fixture: ComponentFixture<FretContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FretContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FretContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
