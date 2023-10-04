import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryButtonComponent } from './primary-button.component';
import { TextInnerShadowComponent } from '../text-inner-shadow/text-inner-shadow.component';

describe('PrimaryButtonComponent', () => {
  let component: PrimaryButtonComponent;
  let fixture: ComponentFixture<PrimaryButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        PrimaryButtonComponent,
      ],
      imports : [
        TextInnerShadowComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimaryButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
