import { Component } from '@angular/core';
import { MiscService } from './shared/misc.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AdhaarUI';
  
  /**
   *
   */
  constructor(public misc:MiscService) {
    
    
  }
}
