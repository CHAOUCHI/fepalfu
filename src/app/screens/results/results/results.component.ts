import { Component } from '@angular/core';
import { Player } from 'src/app/core/Classes/Player';
import { GameService } from 'src/app/game.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {
  public players :Player[] = [];
  constructor(private gameService : GameService){
    this.gameService.players.then(players=>this.players = players).catch(error=>console.error(error));
    this.gameService.results.then(results=>{
      console.log(results);
    })
  }
}
