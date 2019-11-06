import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeqContainerComponent } from './seq-container.component';

describe('SeqContainerComponent', () => {
  let component: SeqContainerComponent;
  let fixture: ComponentFixture<SeqContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeqContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeqContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
