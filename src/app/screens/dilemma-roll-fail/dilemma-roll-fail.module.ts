import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';
import { DilemmaRollFailComponent } from './dilemma-roll-fail/dilemma-roll-fail.component';



@NgModule({
  declarations: [
    DilemmaRollFailComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ]
})
export class DilemmaRollFailModule { }
