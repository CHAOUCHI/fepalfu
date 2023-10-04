import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextInnerShadowComponent } from './text-inner-shadow.component';

describe('TextInnerShadowComponent', () => {
  let component: TextInnerShadowComponent;
  let fixture: ComponentFixture<TextInnerShadowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TextInnerShadowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextInnerShadowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
