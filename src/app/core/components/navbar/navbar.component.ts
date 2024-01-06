import { Component } from '@angular/core';
import * as Tesseract from 'tesseract.js';
import { createWorker } from 'tesseract.js';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  worker: Tesseract.Worker | undefined;
  toggle: boolean = false;
  text: Tesseract.RecognizeResult | undefined;
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
      'https://5.imimg.com/data5/SELLER/Default/2022/7/IO/GF/GR/97397727/school-id-card.jpg',
      'eng',
      { logger: m => console.log(m) }
    ).then(({ data: { text } }) => {
      console.log(text);
    });


  }

}
