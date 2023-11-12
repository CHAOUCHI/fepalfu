import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from 'src/app/core/Classes/Player';
import { GameService } from 'src/app/game.service';

@Component({
  selector: 'app-roll-dice-proba-to-drink',
  templateUrl: './roll-dice-proba-to-drink.component.html',
  styleUrls: ['./roll-dice-proba-to-drink.component.css']
})
export class RollDiceProbaToDrinkComponent implements OnInit{
  private readonly CRITICAL_SUCCESS = 6;
  private readonly CRITICAL_FAILURE = 1;

  public currentPlayer : Player = new Player("[NAME]");
  private probaToDrink : number = 0;
  constructor( private gameService : GameService ,private router : Router){/*void */}

  ngOnInit(): void {
    /**
     * Get current player from localStorage
     */
    this.gameService.currentPlayer
    .then(player=>this.currentPlayer = player)
    .catch(error=>console.error(error));

    /**Roll the dice and set the probaToDrink attribute when the dice stops rolling */
    this.rollDice();
    
  }

  goToNextScreen(){
    if(this.probaToDrink > 0 && this.probaToDrink <= 6){
      switch (this.probaToDrink) {
        case this.CRITICAL_SUCCESS:
          /**
           * If the roll is a critical success
           * navigate to critical-success screen
           */
          this.router.navigateByUrl("critical-success");
          break;
        case this.CRITICAL_FAILURE:
          /**
           * If the roll is a critical failure
           * navigate to critical-failure screen
           */
          this.router.navigateByUrl("critical-failure");
          break;
        default:
          /**
           * If the roll is between ]1;6[
           * navigate to dilemma screen
           */
          this.router.navigateByUrl("dilemma");
          break;
      }
    }
  }

  private rollDice() : void{
    /**
         * Dice roll animation
        */
    const diceElement = document.querySelector(".dice");
    const rollDuration = 1000;  //NOT IN MILLISECOND APPROXIMATE TIME
    let rollSpeed = 20;
    let i = 0;
    const diceRollIntervalId = setInterval(()=>{
    /**
      * Change dice image
      */
      diceElement?.setAttribute("src",`assets/dice/white/${i%6+1}.png`); 
      i++;

      /**
       * When the dice roll enough
       * get probaToDrink from localStorage and set dice image at this value
       */
      if(i*rollSpeed >= rollDuration){
      /**
        * Stop animation
        */
        clearInterval(diceRollIntervalId);
        diceElement?.classList.remove("roll");

        this.gameService.setProbaToDrink()
        .then(probaToDrink=>{
        /**
          * Set probaToDrink attribut
          */
          this.probaToDrink = probaToDrink;
          /**
           * Set dice image from localStorage gameState
           */
          if(diceElement){
            diceElement?.setAttribute("src",`assets/dice/white/${this.probaToDrink}.png`);
            const randomAngle = Math.floor(Math.random()*360);
            diceElement.setAttribute("style",`transform : rotate(${randomAngle}deg);`);
            diceElement?.classList.add("bounce");
          }
        })
        .catch(error=>console.error(error));
      }
    },rollSpeed);
  }

}
