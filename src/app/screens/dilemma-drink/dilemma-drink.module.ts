import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';
import { DilemmaDrinkComponent } from './dilemma-drink/dilemma-drink.component';



@NgModule({
  declarations: [
    DilemmaDrinkComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ],
  exports:[
    DilemmaDrinkComponent
  ]
})
export class DilemmaDrinkModule { }
