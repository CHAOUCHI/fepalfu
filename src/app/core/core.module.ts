import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInnerShadowComponent } from './text-inner-shadow/text-inner-shadow.component';
import { PrimaryButtonComponent } from './primary-button/primary-button.component';
import { LogoComponent } from './logo/logo.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    LogoComponent,
    PrimaryButtonComponent,
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
    AppRoutingModule
  ]
})
export class CoreModule { }
