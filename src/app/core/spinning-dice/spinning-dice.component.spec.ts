import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinningDiceComponent } from './spinning-dice.component';

describe('SpinningDiceComponent', () => {
  let component: SpinningDiceComponent;
  let fixture: ComponentFixture<SpinningDiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpinningDiceComponent]
    });
    fixture = TestBed.createComponent(SpinningDiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
