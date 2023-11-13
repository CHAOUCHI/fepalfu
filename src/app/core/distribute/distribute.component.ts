import { AfterContentInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Player } from '../Classes/Player';
import { GameService } from 'src/app/game.service';

@Component({
  selector: 'app-distribute',
  templateUrl: './distribute.component.html',
  styleUrls: ['./distribute.component.css']
})
export class DistributeComponent implements OnInit,OnChanges{
  constructor(private gameService : GameService){/**VOID */}

  ngOnInit(): void {
    this.gameService.currentPlayer.then(player=>this.currentPlayer = player).catch(error=>console.error(error));
    this.gameService.players.then(players=>{
      this.otherPlayers = players.filter(player=>{
        if(player.name !== this.currentPlayer.name) 
          this.playersSips.set(player.name,0);

        return player.name !== this.currentPlayer.name;
      });
    }).catch(error=>console.error(error));

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.remaingSips = this.sips;
    console.log(this.remaingSips);
  }
  

  @Output() onDistribute  = new EventEmitter<Map<string,number>>();
  @Input() public  sips : number = 0;
  public currentPlayer : Player = new Player("Player name");
  public otherPlayers  : Player[]= [];

  public remaingSips : number = 0;
  public playersSips = new Map<string,number>();

  public addSip(playerName : string){
    if(this.remaingSips>0){
      this.playersSips.set(playerName,(this.playersSips.get(playerName)||0)+1);
      this.remaingSips--;
    }
  }

  public removeSip(playerName : string){
    if(this.playersSips.get(playerName) || -1 >= 0){
      this.playersSips.set(playerName,(this.playersSips.get(playerName)||0)-1);
      this.remaingSips++;
    }
  }

  public distribute(){
    let distributePromises  : Array<Promise<Player>>= [];
    this.playersSips.forEach((nbSips,playerName)=>{
      if(nbSips>0)
        distributePromises.push(this.gameService.distribute(nbSips,playerName,this.currentPlayer.name));
    });
    Promise.all(distributePromises).then(_=>{
      console.log("Emit");
      this.onDistribute.emit(this.playersSips);
    }).catch(error=>console.error(error));
  }

}
