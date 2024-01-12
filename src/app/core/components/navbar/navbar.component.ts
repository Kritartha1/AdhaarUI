import { Component } from '@angular/core';
import { from, Observable } from 'rxjs';
import * as Tesseract from 'tesseract.js';
import { createWorker } from 'tesseract.js';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {


  toggle: boolean = false;



  /**
   *
   */
  constructor() {
    this.OCR();


  }


  popUpVisible(): void {
    this.toggle = true;
  }


  popUpClose(): void {
    this.toggle = false;
  }

  async OCR() {
    Tesseract.recognize(
      'assets/haha.png',
      'eng',

      { logger: m => console.log(m) }
    ).then(({ data: { text } }) => {
      text = this.textFormat(text);
      console.log(text);

    });
  }

 
  

  textFormat(str: string): string {
  //  return str.replace(/[\s~`!@#$%^&*()_+\-={[}\]|\\:;"'<,>.?/]+/g, '')
     return str
  }



}



