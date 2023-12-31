import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from 'src/app/core/Classes/Player';
import { GameService } from 'src/app/game.service';

@Component({
  selector: 'app-dilemma-roll-success',
  templateUrl: './dilemma-roll-success.component.html',
  styleUrls: ['./dilemma-roll-success.component.css']
})
export class DilemmaRollSuccessComponent implements OnInit{
  public currentPlayer : Player = new Player("Player name");
  public playerLuck : number = 0;
  public sips : number = 0;

  constructor(private gameService : GameService,private router : Router){/**VOID*/}

  ngOnInit(): void {
    this.gameService.sips.then(sips=>this.sips = sips || 0).then(sips=>console.log(sips)).catch(error=>console.error(error));
    this.gameService.currentPlayer.then(player=>this.currentPlayer = player).catch(error=>console.error(error));
    this.gameService.playerLuck.then(playerLuck=>this.playerLuck = playerLuck || 1).catch(error=>console.error(error));
  }
  
  public gotoNewTurn(){
    this.gameService.nextTurn().then(_=>this.router.navigateByUrl("new-turn")).catch(error=>console.error(error));
  }

}
