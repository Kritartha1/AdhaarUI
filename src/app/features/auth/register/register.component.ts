import { Component, ViewChild } from '@angular/core';
import { SignupRequest } from '../models/signup-request';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  mod:{confirmPassword:string};
  model:SignupRequest;
  @ViewChild('form')
  form!: NgForm;

  /**
   *
   */
  constructor(private authService: AuthService, private cookieService: CookieService, private router: Router) {
    
    this.mod = {
      confirmPassword:''
    };
    this.model={
      email: '',
      password: '',
      roles:["User"]
      
    };
  }

  onFormSubmit(): void {

    
    
    this.authService.register(this.model)
      .subscribe({
        next: (response) => {

          this.router.navigateByUrl('/login');
        }
        ,
        error:(err)=>{
            alert("Oops!Try again");
            this.form.resetForm();
        }
      });
  }

}
