import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './screens/home/home.module';
import { AddPlayersModule } from './screens/add-players/add-players.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    AddPlayersModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
