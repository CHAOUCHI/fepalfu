import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from 'src/app/core/Classes/Player';
import { GameService } from 'src/app/game.service';

@Component({
  selector: 'app-dilemma-roll-fail',
  templateUrl: './dilemma-roll-fail.component.html',
  styleUrls: ['./dilemma-roll-fail.component.css']
})
export class DilemmaRollFailComponent implements OnInit{
  sips = 0;
  currentPlayer = new Player("[PlayerName]");
  playerLuck = 0;
  constructor(private gameService : GameService,private router : Router){/**VOID*/}
  ngOnInit(): void {
    this.gameService.currentPlayer.then(player=>this.currentPlayer = player);
    this.gameService.playerLuck.then(playerLuck=>this.playerLuck = playerLuck || 0);
    this.gameService.sips.then(sips=>this.sips = sips || 0);
  }
  onDrink(){
    this.gameService.drink(this.sips*2,this.currentPlayer.name).then(_=>{
      this.gameService.nextTurn().then(_=>{
        this.router.navigateByUrl("new-turn");
      })
      .catch(error=>console.error(error));
    })
    .catch(error=>console.error(error));
  }
}
