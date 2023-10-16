import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from 'src/app/game.service';

@Component({
  selector: 'app-add-players',
  templateUrl: './add-players.component.html',
  styleUrls: ['./add-players.component.css']
})
export class AddPlayersComponent {
  
  constructor(private router : Router,private gameService : GameService){}

  public startGame(){
    this.gameService.startGame(this.playersNames,10)
    .then(isOk=>{
      if(isOk){
        this.router.navigate(["new-turn"]);
      }
    })
    .catch(error=>console.error(error));
  }
  
  public onAddPlayer(playersNames : Set<string>){
    this.playersNames = playersNames;
    console.log(this.playersNames);
  }
  
  private playersNames  = new Set<string>();
}
