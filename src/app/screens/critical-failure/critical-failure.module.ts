import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';
import { CriticalFailureComponent } from './critical-failure/critical-failure.component';



@NgModule({
  declarations: [
    CriticalFailureComponent
  ],
  exports:[
    CriticalFailureComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ]
})
export class CriticalFailureModule { }
