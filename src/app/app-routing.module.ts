import { NgModule } from '@angular/core';
import { RouterModule,Routes} from '@angular/router';
import { HomeComponent } from './screens/home/home/home.component';
import { AddPlayersComponent } from './screens/add-players/add-players/add-players.component';
import { NewTurnComponent } from './screens/new-turn/new-turn/new-turn.component';
import { RollDiceProbaToDrinkComponent } from './screens/roll-dice-proba-to-drink/roll-dice-proba-to-drink/roll-dice-proba-to-drink.component';
import { DilemmaComponent } from './screens/dilemma/dilemma/dilemma.component';
import { DilemmaDrinkComponent } from './screens/dilemma-drink/dilemma-drink/dilemma-drink.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"add-players",component:AddPlayersComponent},
  {path:"new-turn",component:NewTurnComponent},
  {path:"roll-dice-proba",component:RollDiceProbaToDrinkComponent},
  {path:"dilemma",component:DilemmaComponent},
  {path:"dilemma-drink",component:DilemmaDrinkComponent},
  {path:"**",component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
