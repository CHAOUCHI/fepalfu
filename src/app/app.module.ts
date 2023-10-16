import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './screens/home/home.module';
import { AddPlayersModule } from './screens/add-players/add-players.module';
import { NewTurnModule } from './screens/new-turn/new-turn.module';
import { DilemmaModule } from './screens/dilemma/dilemma.module';
import { RollDiceProbaToDrinkModule } from './screens/roll-dice-proba-to-drink/roll-dice-proba-to-drink.module';
import { DilemmaDrinkModule } from './screens/dilemma-drink/dilemma-drink.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    AddPlayersModule,
    NewTurnModule,
    RollDiceProbaToDrinkModule,
    DilemmaModule,
    DilemmaDrinkModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
