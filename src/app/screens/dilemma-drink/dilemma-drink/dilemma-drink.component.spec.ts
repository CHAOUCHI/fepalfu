import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DilemmaDrinkComponent } from './dilemma-drink.component';

describe('DilemmaDrinkComponent', () => {
  let component: DilemmaDrinkComponent;
  let fixture: ComponentFixture<DilemmaDrinkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DilemmaDrinkComponent]
    });
    fixture = TestBed.createComponent(DilemmaDrinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
