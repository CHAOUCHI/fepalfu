import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinning-dice',
  templateUrl: './spinning-dice.component.html',
  styleUrls: ['./spinning-dice.component.css']
})
export class SpinningDiceComponent implements OnInit{
  @Input() color : "white" = "white";
  @Input() rollingSpeed : number = 20;
  @Input() infinite : boolean = false;
  /**
   * rollDuration define how much ms will the dice spin, if it is smaller than rollingSpeed, the dice will spin to infinity
   */
  @Input() rollDuration : number = 1000;
  ngOnInit(): void {
    
    /**
     * Dice roll animation
    */
   const diceElement = document.querySelector(".spinning-dice");
   let i = 0;
   const diceRollIntervalId = setInterval(()=>{
    /**
     * Change dice image
     */
     diceElement?.setAttribute("src",`assets/dice/${this.color}/${i%6+1}.png`); 
     i++;

     /**
      * When the dice roll enough
      * get probaToDrink from localStorage and set dice image at this value
      */
     if( !this.infinite && i*Number(this.rollingSpeed) >= Number(this.rollDuration)){
      /**
       * Stop animation
       */
       clearInterval(diceRollIntervalId);
      }
    },Number(this.rollingSpeed));
  }
}
