import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private gameService : GameService,private router : Router){/** */}
  ngOnInit(): void {
    this.gameService.currentPlayer
    .then(currentPlayer=>this.currentPlayer=currentPlayer)
    .catch(error=>console.error(error));

    this.gameService.getGameState()
    .then(gameState=>{
        this.probaToDrink = gameState.probaToDrink || 0;
        this.sips = gameState.sips || 0;

    }).catch(error=>console.error(error));

    const probaToDrinkDice = document.querySelector(".proba_to_drink");
    setTimeout(()=>{
      probaToDrinkDice?.classList.remove("show_dice");
    },700);
  }

  public rollDice() : void{
    this.gameService.setPlayerLuck().then(playerLuck=>{
      if(playerLuck > this.probaToDrink){
        /**
         * Dilemma roll success
         */
        this.router.navigateByUrl("dilemma-roll-success");
      }
      else{
        /**
         * Dilemma roll failed
         */
        this.router.navigateByUrl("dilemma-roll-fail");

      }
    })

  }
}
