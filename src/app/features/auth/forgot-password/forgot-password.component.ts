import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  email:string;

  constructor(private authService:AuthService,private router: Router) {
    this.email='';
    
  }



  onFormSubmit():void{
    this.authService.generatePasswordToken(this.email).subscribe(
      {
        next:(res)=>{
          console.log("Password token generated!");
          this.router.navigateByUrl(`/newpassword/${this.email}`);
        },
        error:(err)=>{
          alert(err.error);
        }
      }
    )
    
   // console.log("haha");
  }

}
