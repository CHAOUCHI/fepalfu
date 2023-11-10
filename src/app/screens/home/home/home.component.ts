import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  buttonSize = "l";
  ngOnInit(): void {
    const MOBILE_SCREEN_WIDTH = 900;
    if(window.screen.width <= MOBILE_SCREEN_WIDTH){
      this.buttonSize = "m";
    }
    
  }

}
