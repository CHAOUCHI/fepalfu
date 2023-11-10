import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsComponent } from './results/results.component';
import { CoreModule } from 'src/app/core/core.module';



@NgModule({
  declarations: [
    ResultsComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ]
})
export class ResultsModule { }
