import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/core/Classes/Player';
import { GameService } from 'src/app/game.service';

@Component({
  selector: 'app-new-turn',
  templateUrl: './new-turn.component.html',
  styleUrls: ['./new-turn.component.css']
})
export class NewTurnComponent implements OnInit{
  public currentPlayer : Player | null = null;
  public sips : number = 0;
  public buttonSize = "m";
  constructor(private gameService : GameService){/**void */}
  
  ngOnInit(): void {
    this.gameService.currentPlayer
    .then(player=>this.currentPlayer = player)
    .catch(error=>console.error(error));

    this.gameService.setRandomSips()
    .then(sips=>this.sips=sips)
    .catch(error=>console.error(error));


    const MOBILE_SCREEN_WIDTH = 900;
    if(window.screen.width <= MOBILE_SCREEN_WIDTH){
      this.buttonSize = "s";
    }
    
  }
}
