import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import * as Tesseract from 'tesseract.js';
import { createWorker } from 'tesseract.js';



@Component({
  selector: 'app-ocr',
  templateUrl: './ocr.component.html',
  styleUrls: ['./ocr.component.css']
})
export class OcrComponent {
  /**
   *
   */
  worker: Tesseract.Worker | undefined;
  workerReady: boolean = false;

  /**
   *
   */
  constructor() {
    this.OCR()

  }


  async OCR() {
    Tesseract.recognize(
      'https://tesseract.projectnaptha.com/img/eng_bw.png',
      'eng',
      { logger: m => console.log(m) }
    ).then(({ data: { text } }) => {
      console.log(text);
    })



  }



}
