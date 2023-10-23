import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';
import { DilemmaComponent } from './dilemma/dilemma.component';



@NgModule({
  declarations: [
    DilemmaComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
  ],
  exports:[
    DilemmaComponent
  ]
})
export class DilemmaModule { }
