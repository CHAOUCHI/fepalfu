import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from 'src/app/core/Classes/Player';
import { GameService } from 'src/app/game.service';

@Component({
  selector: 'app-critical-failure',
  templateUrl: './critical-failure.component.html',
  styleUrls: ['./critical-failure.component.css']
})
export class CriticalFailureComponent implements OnInit{
  currentPlayer : Player = new Player("[Player name]");
  sips : number = 0;
  ngOnInit(): void {
    this.gameService.currentPlayer.then(player=>this.currentPlayer = player).catch(error=>console.warn(error));
    this.gameService.sips.then(sips=>this.sips = sips || 0).catch(error=>console.warn(error));
  }
  goToNextTurn(){
    this.gameService.nextTurn().then(_=>{
      this.router.navigateByUrl("new-turn");
    }).catch(error=>console.warn(error));
  }

  constructor(private gameService : GameService,private router : Router){

  }
}
