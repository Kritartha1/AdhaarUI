import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  toggle: boolean = false;

  popUpVisible(): void {
    this.toggle = true;
  }

  popUpClose(): void {
    this.toggle = false;
  }

}
