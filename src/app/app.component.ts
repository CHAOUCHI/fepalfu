import { Component, OnInit, ViewChild } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Fepalfu - Jeu à boire';
  version = "0.0.1";
  constructor(private router : Router){ /*VOID*/ }

  ngOnInit(): void {
    this.router.events.subscribe((event : Event)=>{
      if(event instanceof NavigationEnd){
        if(this.router.url === "/"){
          
          document.querySelector(".go-home")?.classList.add("hide");
        }
        else{
          document.querySelector(".go-home")?.classList.remove("hide");
        }
      }
    })
    
  }

  onLeave(){
    document.querySelector(".go_home_confirmation")?.classList.remove("hide");
  }
  goHome(){
    document.querySelector(".go_home_confirmation")?.classList.add("hide");
    this.router.navigateByUrl("/");
  }
  continueToPlay(){
    document.querySelector(".go_home_confirmation")?.classList.add("hide");
  }
}

function TextChild(arg0: string) {
  throw new Error('Function not implemented.');
}
