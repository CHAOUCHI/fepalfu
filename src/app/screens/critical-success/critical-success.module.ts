import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';
import { CriticalSuccessComponent } from './critical-success/critical-success.component';

@NgModule({
  declarations: [
    CriticalSuccessComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ],
  exports:[
    CriticalSuccessComponent
  ]
})
export class CriticalSuccessModule { }
