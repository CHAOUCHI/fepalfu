import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';
import { DilemmaRollSuccessComponent } from './dilemma-roll-success/dilemma-roll-success.component';



@NgModule({
  declarations: [
    DilemmaRollSuccessComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ]
})
export class DilemmaRollSuccessModule { }
