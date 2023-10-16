import { Component, OnInit } from '@angular/core';
import { GameState } from 'src/app/core/Classes/GameStates';
import { Player } from 'src/app/core/Classes/Player';
import { GameService } from 'src/app/game.service';

@Component({
  selector: 'app-dilemma',
  templateUrl: './dilemma.component.html',
  styleUrls: ['./dilemma.component.css']
})
export class DilemmaComponent implements OnInit{
  public currentPlayer : Player = new Player("[NAME]");
  public sips : number = 0;
  public probaToDrink  : number = 0;
  constructor(private gameService : GameService){/** */}
  ngOnInit(): void {
    this.gameService.currentPlayer
    .then(currentPlayer=>this.currentPlayer=currentPlayer)
    .catch(error=>console.error(error));

    this.gameService.getGameState()
    .then(gameState=>{
        this.probaToDrink = gameState.probaToDrink || 0;
        this.sips = gameState.sips || 0;

    }).catch(error=>console.error(error));
  }
}
