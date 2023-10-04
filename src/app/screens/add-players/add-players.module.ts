import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';
import { AddPlayersComponent } from './add-players/add-players.component';
import { TextInnerShadowComponent } from 'src/app/core/text-inner-shadow/text-inner-shadow.component';
import { AddPlayersFormComponent } from './add-players-form/add-players-form.component';



@NgModule({
  declarations: [
    AddPlayersComponent,
    AddPlayersFormComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ],
  exports:[
    AddPlayersComponent
  ]
})
export class AddPlayersModule { }
