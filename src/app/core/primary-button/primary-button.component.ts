import { Component,Input,OnInit } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  templateUrl: './primary-button.component.html',
  styleUrls: ['./primary-button.component.css']
})
export class PrimaryButtonComponent{
  @Input() text : string = "[Missing 'text' property value]";
  @Input() size :  "s" | "m" | "l" | string = "m";
  @Input() clickable : boolean = true;
}
