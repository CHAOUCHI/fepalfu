import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlayersComponent } from './add-players.component';
import { LogoComponent } from 'src/app/core/logo/logo.component';
import { TextInnerShadowComponent } from 'src/app/core/text-inner-shadow/text-inner-shadow.component';
import { PrimaryButtonComponent } from 'src/app/core/primary-button/primary-button.component';
import { AddPlayersFormComponent } from '../add-players-form/add-players-form.component';

describe('AddPlayersComponent', () => {
  let component: AddPlayersComponent;
  let fixture: ComponentFixture<AddPlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        AddPlayersComponent,
        LogoComponent,
        PrimaryButtonComponent,
        AddPlayersFormComponent
      ],
      imports : [
        TextInnerShadowComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
