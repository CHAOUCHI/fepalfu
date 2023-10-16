import { Component, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-add-players-form',
  templateUrl: './add-players-form.component.html',
  styleUrls: ['./add-players-form.component.css'],
})
export class AddPlayersFormComponent {

  @Output() addPlayerEvent = new EventEmitter<Set<string>>();

  public playersNames : Set<string> = new Set<string>();
  
  removePlayer(name : string){
    this.playersNames.delete(name);
    this.addPlayerEvent.emit(this.playersNames);
  }
  
  onInputChange(event : Event){
    if(event.target instanceof HTMLInputElement)
    {
      const newPlayerName = event.target.value;
      if(newPlayerName.length > this.NAME_MINIMUM_LENGTH){
        this.playersNames.add(newPlayerName);
        this.addPlayerEvent.emit(this.playersNames);
      }
      event.target.value = "";
    }
    else
    {
      throw Error("event.target should be an instance of HTMLInputElement");
    }
    
  }
  private readonly NAME_MINIMUM_LENGTH : number = 2;
}
