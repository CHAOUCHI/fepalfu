import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriticalSuccessComponent } from './critical-success.component';

describe('CriticalSuccessComponent', () => {
  let component: CriticalSuccessComponent;
  let fixture: ComponentFixture<CriticalSuccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CriticalSuccessComponent]
    });
    fixture = TestBed.createComponent(CriticalSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
