import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MiscService {

  public showHome:boolean=true;

  constructor(private router: Router) {
    // Listen for route changes and update showHome accordingly
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateShowHome();
      });
  }

  private updateShowHome() {
    // Set showHome based on the current route
    const currentRoute = this.router.url;
    this.showHome = !(currentRoute === '/user');
  }
}
