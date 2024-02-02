import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Tour } from './models/tour.model';

@Injectable({
  providedIn: 'root'
})
export class MiscService {

  public showHome:boolean=true;
  public tour:Tour[];

  

  constructor(private router: Router) {
    // Listen for route changes and update showHome accordingly
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateShowHome();
      });

      this.tour=[
        {
          Title:"Tour guide",
          Message:"A fun journey ahead!"

        },{
          Title:"Tour guide",
          Message:"Login/SignUp here!"

        }
        ,{
          Title:"Tour guide",
          Message:"Verify your address here!"

        }
        ,{
          Title:"Tour guide",
          Message:"Thanks!"

        }
      ];
      
  }

  private updateShowHome() {
    // Set showHome based on the current route
    const currentRoute = this.router.url;
    this.showHome = !(currentRoute === '/user');
  }
}
