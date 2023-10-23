import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameState } from 'src/app/core/Classes/GameStates';
import { Player } from 'src/app/core/Classes/Player';
import { GameService } from 'src/app/game.service';

@Component({
  selector: 'app-dilemma-drink',
  templateUrl: './dilemma-drink.component.html',
  styleUrls: ['./dilemma-drink.component.css']
})
export class DilemmaDrinkComponent implements OnInit{
  public currentPlayer : Player = new Player("[name");
  public sips : number  = 0;
  constructor(public gameService : GameService, private router : Router){/**void */}

  ngOnInit(): void {
    this.gameService.currentPlayer
    .then(player=>{
      this.currentPlayer = player;
    }).catch(error=>console.error(error));

    this.gameService.sips
    .then(sips=>{
      this.sips = sips ?? 0;
    }).catch(error=>console.error(error));
  }

  onDrink(){
      this.gameService.drink(this.sips,this.currentPlayer.name).then(_=>{
        this.gameService.nextTurn().then(_=>{
          this.router.navigateByUrl("new-turn");
        })
        .catch(error=>console.error(error));
      })
      .catch(error=>console.error(error));
  }

  
}
