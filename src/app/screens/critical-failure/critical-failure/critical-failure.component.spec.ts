import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriticalFailureComponent } from './critical-failure.component';

describe('CriticalFailureComponent', () => {
  let component: CriticalFailureComponent;
  let fixture: ComponentFixture<CriticalFailureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CriticalFailureComponent]
    });
    fixture = TestBed.createComponent(CriticalFailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
