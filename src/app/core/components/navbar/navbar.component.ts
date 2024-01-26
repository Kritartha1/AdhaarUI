import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { from, Observable } from 'rxjs';
import { User } from 'src/app/features/auth/models/user.model';
import { AuthService } from 'src/app/features/auth/services/auth.service';
// import * as Tesseract from 'tesseract.js';
// import { createWorker } from 'tesseract.js';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {



  user?: User;

  
  constructor(private authService: AuthService, private router: Router,private toast:NgToastService) {
  
  }


  ngOnInit(): void {
    this.authService.user()
      .subscribe({
        next: (response) => {
          this.user = response;
        }
      });


    this.user = this.authService.getuser();
  }

  onLogout(): void {
    this.authService.logout();
    this.toast.success({detail:"SUCCESS",summary:'Logged out!',duration:2000,position:'topCenter'});
     
    this.router.navigateByUrl('/');

  }



}



