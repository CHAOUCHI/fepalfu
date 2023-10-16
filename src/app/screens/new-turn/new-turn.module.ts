import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';
import { NewTurnComponent } from './new-turn/new-turn.component';



@NgModule({
  declarations: [
    NewTurnComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ],
  exports:[
    NewTurnComponent
  ]
})
export class NewTurnModule { }
