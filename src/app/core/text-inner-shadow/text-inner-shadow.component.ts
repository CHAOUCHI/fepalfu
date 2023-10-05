import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-text-inner-shadow',
  templateUrl: './text-inner-shadow.component.html',
  standalone : true,
  styleUrls: ['./text-inner-shadow.component.css']
})
export class TextInnerShadowComponent implements AfterViewInit{
  @Input() value : string ="[Missing value property]";
  @Input() color : string = "white";
  @Input() shadowColor : string = "#9b9b9b";  // greyish

  @ViewChild("text") span : any;

  ngAfterViewInit (): void {
      this.span.nativeElement.style.textShadow = `0px 1px 0px ${this.color}`; //Define the color of the text content
      this.span.nativeElement.style.backgroundColor = this.shadowColor; //Define the color of the text inner shadow
  }
}
