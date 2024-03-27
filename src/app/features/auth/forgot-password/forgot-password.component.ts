import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  email:string;

  constructor(private authService:AuthService,private router: Router,private toast:NgToastService) {
    this.email='';
    
  }



  onFormSubmit():void{
    this.authService.generatePasswordToken(this.email).subscribe(
      {
        next:(res)=>{
          console.log("Password token generated!");
          this.toast.success({detail:"Email",summary:'Token sent to your email!',duration:2000,position:'topCenter'});
    
          this.router.navigateByUrl(`/newpassword/${this.email}`);
        },
        error:(err)=>{
          this.toast.error({detail:"ERROR",summary:`${err.error}`,duration:2000,position:'topCenter'});
    
          
        }
      }
    )
    
   // console.log("haha");
  }

}
