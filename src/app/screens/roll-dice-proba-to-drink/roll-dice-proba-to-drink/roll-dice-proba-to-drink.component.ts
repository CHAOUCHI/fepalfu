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

    
    /**
     * Dice roll animation
    */
   const diceElement = document.querySelector(".dice");
   const rollDuration = 1000;
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
         * Set dice image from localStorage gameState
         */
          this.probaToDrink = probaToDrink;
          if(diceElement){
            diceElement?.setAttribute("src",`assets/dice/white/${this.probaToDrink}.png`);
            const randomAngle = Math.floor(Math.random()*360);
            diceElement.setAttribute("style",`transform : rotate(${randomAngle}deg);`);
            diceElement?.classList.add("bounce");
            /**
             * If the roll is a critical success
             * navigate to critical-success screen
             */
            if(this.probaToDrink === 6){
              this.router.navigateByUrl("critical-success");
            }
            /**
             * If the roll is a critical failure
             * navigate to critical-failure screen
             */
            if(this.probaToDrink === 1){
              this.router.navigateByUrl("critical-failure");
            }
          }
       })
       .catch(error=>console.error(error));
      }
    },rollSpeed);
  }
  goToDilemmaScreen(){
    if(this.probaToDrink > 0){
      this.router.navigateByUrl("dilemma");
    }
  }
}
