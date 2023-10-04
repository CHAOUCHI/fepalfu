import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';

import { LogoComponent } from 'src/app/core/logo/logo.component';
import { PrimaryButtonComponent } from 'src/app/core/primary-button/primary-button.component';
import { TextInnerShadowComponent } from 'src/app/core/text-inner-shadow/text-inner-shadow.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        HomeComponent,
        LogoComponent,
        PrimaryButtonComponent
      ],
      imports : [
        TextInnerShadowComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it("should print 'Commencer' in the button",()=>{
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("button").textContent).toEqual("Commencer");
  });

  it("should contain 'Jeu à boire' dans le subTitle",()=>{
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("#home__sub_title").textContent).toEqual("Jeu à boire");
  });

  it("should set the button size to large",()=>{
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("button").classList.contains("l")).toBeTruthy();
  })

});
