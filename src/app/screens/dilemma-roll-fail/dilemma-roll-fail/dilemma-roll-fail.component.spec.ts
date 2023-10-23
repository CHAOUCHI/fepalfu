import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DilemmaRollFailComponent } from './dilemma-roll-fail.component';

describe('DilemmaRollFailComponent', () => {
  let component: DilemmaRollFailComponent;
  let fixture: ComponentFixture<DilemmaRollFailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DilemmaRollFailComponent]
    });
    fixture = TestBed.createComponent(DilemmaRollFailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
