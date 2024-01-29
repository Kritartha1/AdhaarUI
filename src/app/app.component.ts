import { Component, HostListener } from '@angular/core';
import { MiscService } from './shared/misc.service';
import { AuthService } from './features/auth/services/auth.service';

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
  constructor(public misc:MiscService,private authService:AuthService) {
    
    
  }

 
 
}
