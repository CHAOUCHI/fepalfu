import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from 'src/app/core/Classes/Player';
import { GameService } from 'src/app/game.service';

@Component({
  selector: 'app-critical-success',
  templateUrl: './critical-success.component.html',
  styleUrls: ['./critical-success.component.css']
})
export class CriticalSuccessComponent implements OnInit{
  public currentPlayer : Player = new Player("Player name");
  public sips : number = 0;

  constructor(private gameService : GameService,private router : Router){/**VOID*/}

  ngOnInit(): void {
    this.gameService.sips.then(sips=>this.sips = sips || 0).then(sips=>console.log(sips)).catch(error=>console.error(error));
    this.gameService.currentPlayer.then(player=>this.currentPlayer = player).catch(error=>console.error(error));
  }
  
  public gotoNewTurn(){
    this.gameService.nextTurn().then(_=>this.router.navigateByUrl("new-turn")).catch(error=>console.error(error));
  }

}
