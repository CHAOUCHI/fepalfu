import { Component } from '@angular/core';
@Component({
  selector: 'app-add-players-form',
  templateUrl: './add-players-form.component.html',
  styleUrls: ['./add-players-form.component.css'],
})
export class AddPlayersFormComponent {

  playersNames : Set<string> = new Set<string>();
  private readonly NAME_MINIMUM_LENGTH : number = 2;
  
  onInputChange(event : Event){
    if(event.target instanceof HTMLInputElement)
    {
      const newPlayerName = event.target.value;
      if(newPlayerName.length > this.NAME_MINIMUM_LENGTH){
          this.playersNames.add(newPlayerName);
      }
      event.target.value = "";
    }
    else
    {
      throw Error("event.target should be an instance of HTMLInputElement");
    }

  }
}
