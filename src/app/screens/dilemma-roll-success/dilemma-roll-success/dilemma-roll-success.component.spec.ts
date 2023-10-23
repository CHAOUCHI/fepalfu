import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DilemmaRollSuccessComponent } from './dilemma-roll-success.component';

describe('DilemmaRollSuccessComponent', () => {
  let component: DilemmaRollSuccessComponent;
  let fixture: ComponentFixture<DilemmaRollSuccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DilemmaRollSuccessComponent]
    });
    fixture = TestBed.createComponent(DilemmaRollSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
