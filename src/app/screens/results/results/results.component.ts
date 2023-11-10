import { Component } from '@angular/core';
import { Player } from 'src/app/core/Classes/Player';
import { ResultPlayerData } from 'src/app/core/Classes/ResultPlayerData';
import { GameService } from 'src/app/game.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {
  public players :Player[] = [];
  public results : ResultPlayerData[] = [];
  constructor(private gameService : GameService){
    this.gameService.players.then(players=>this.players = players).catch(error=>console.error(error));
    this.gameService.results.then(results=>{
      this.results = results;
      console.log(results);
    })
  }
  round(value : number){
    return Math.round(value*100);
  }
}
