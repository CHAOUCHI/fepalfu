import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/core/Classes/Player';
import { GameService } from 'src/app/game.service';

@Component({
  selector: 'app-dilemma-roll-success',
  templateUrl: './dilemma-roll-success.component.html',
  styleUrls: ['./dilemma-roll-success.component.css']
})
export class DilemmaRollSuccessComponent implements OnInit{
  public currentPlayer = new Player("Player name");
  public playerLuck = 0;

  constructor(private gameService : GameService){/**VOID*/}

  ngOnInit(): void {
    this.gameService.currentPlayer.then(player=>this.currentPlayer = player);
    this.gameService.playerLuck.then(playerLuck=>this.playerLuck = playerLuck || 1);
  }

}
