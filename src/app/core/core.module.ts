import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInnerShadowComponent } from './text-inner-shadow/text-inner-shadow.component';
import { PrimaryButtonComponent } from './primary-button/primary-button.component';
import { LogoComponent } from './logo/logo.component';
import { AppRoutingModule } from '../app-routing.module';
import { SpinningDiceComponent } from './spinning-dice/spinning-dice.component';
import { DistributeComponent } from './distribute/distribute.component';



@NgModule({
  declarations: [
    LogoComponent,
    PrimaryButtonComponent,
    SpinningDiceComponent,
    DistributeComponent,
  ],
  imports: [
    CommonModule,
    TextInnerShadowComponent,
    AppRoutingModule
  ],
  exports:[
    LogoComponent,
    PrimaryButtonComponent,
    TextInnerShadowComponent,
    AppRoutingModule,
    SpinningDiceComponent,
    DistributeComponent
  ]
})
export class CoreModule { }
