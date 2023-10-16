import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';
import { RollDiceProbaToDrinkComponent } from './roll-dice-proba-to-drink/roll-dice-proba-to-drink.component';
import { AppRoutingModule } from 'src/app/app-routing.module';



@NgModule({
  declarations: [
    RollDiceProbaToDrinkComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
  ],
  exports:[
    RollDiceProbaToDrinkComponent
  ]
})
export class RollDiceProbaToDrinkModule { }
