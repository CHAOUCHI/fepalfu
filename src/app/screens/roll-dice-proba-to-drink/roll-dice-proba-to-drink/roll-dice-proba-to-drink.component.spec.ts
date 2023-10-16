import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollDiceProbaToDrinkComponent } from './roll-dice-proba-to-drink.component';

describe('RollDiceProbaToDrinkComponent', () => {
  let component: RollDiceProbaToDrinkComponent;
  let fixture: ComponentFixture<RollDiceProbaToDrinkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RollDiceProbaToDrinkComponent]
    });
    fixture = TestBed.createComponent(RollDiceProbaToDrinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
