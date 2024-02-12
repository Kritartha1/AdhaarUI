import { Component, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { SignupRequest } from '../models/signup-request';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NewPasswordRequest } from '../models/new-password.model';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent {
  @ViewChild('form', { static: true }) form!: NgForm; 

 // mod:{password:string,confirmPassword:string};
  model:NewPasswordRequest;
  // @ViewChild('form')
  // form!: NgForm;
  password: string = '';
  passwordError: string = '';
  fieldValidation: { [key: string]: boolean } = {};
 

  passwordPattern: RegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  uppercaseError:boolean= false;
  lowercaseError:boolean = false;
  digitError:boolean = false;
  specialCharError:boolean = false;
  minlengthError: boolean = false;
  strongPassword:boolean = false;
  showPasswordStrength:boolean=false;
  clicked:boolean=false;
  showConf:boolean=false;

  
  passwordInputType: string = 'password';
  confPass:string = 'password';
  //eyeclicked:boolean=false;
    

  constructor(private authService: AuthService,
     private cookieService: CookieService,
      private router: Router,
      private fb: FormBuilder,
      private toast:NgToastService
      ) {
    
    this.model = {
      password:'',
      confirmPassword:''
    };
   
  this.fieldValidation['confirmPassword']=true;

   
  }


  
  validateConfirmPassword(): void {
    this.fieldValidation['confirmPassword'] = this.model.password === this.model.confirmPassword;
  }
  
  onConfirmPasswordInput(): void {
    this.validateConfirmPassword();
  }
 

  validatePassword():void{
    
    //this.showPasswordStrength=true;
    this.uppercaseError = !(/(?=.*?[A-Z])/.test(this.model.password));
    this.lowercaseError = !(/(?=.*?[a-z])/.test(this.model.password));
    this.digitError =! (/(?=.*?[0-9])/.test(this.model.password));
    this.specialCharError =!(/(?=.*?[#?!@$%^&*-])/.test(this.model.password)); 
    this.minlengthError = this.model.password.length < 8;

    this.onConfirmPasswordInput();
  }

  onPasswordStrengthChanged(event: boolean) {
    this.strongPassword = event;
  }

  togglePasswordVisibility():void {
    
    this.passwordInputType = (this.passwordInputType === 'password') ? 'text' : 'password';
  }

  toggleConfPasswordVisibility():void {
    this.confPass = (this.confPass === 'password') ? 'text' : 'password';
  }

  preventBlur(event: MouseEvent): void {
    event.preventDefault(); // Prevent the default behavior (losing focus)
    event.stopPropagation(); // Stop the event from propagating further
  }

 

 
  onFormSubmit(): void {
    this.clicked=true;
   
    // this.router.navigateByUrl('/');
   

    if(this.model.password===''&&this.model.confirmPassword==='') {
      this.clicked=false;
      this.toast.warning({detail:"ERROR",summary:'Please fill all the details!',duration:2000,position:'topCenter'});
      return;
    }

    if(this.model.password===''){
      this.clicked=false;
      this.toast.warning({detail:"ERROR",summary:'Password can not be empty!',duration:2000,position:'topCenter'});
      return;
    }
   
    if(this.model.confirmPassword!==this.model.password){
      this.clicked=false;
      this.toast.warning({detail:"MISMATCH",summary:'confirm password should match password',duration:2000,position:'topCenter'});
      // alert("confirm password should match password");
      return;
    }

    if(this.form.invalid) {
      this.clicked=false;
      this.toast.warning({detail:"ERROR",summary:'Please put valid credentials',duration:2000,position:'topCenter'});
      //alert("Please put valid credentials");
      return;
    }
    if(!(this.fieldValidation['confirmPassword'])){
      this.clicked=false;
      this.toast.warning({detail:"MISMATCH",summary:'confirm password should match password',duration:2000,position:'topCenter'});
      // alert("Password and confirm password does not match");
      return;
    }

   
    
    if(this.uppercaseError||this.lowercaseError||this.digitError||this.specialCharError||this.minlengthError 
    ){
      this.clicked=false;
      this.toast.warning({detail:"INVALID",summary:'Please enter a valid password',duration:2000,position:'topCenter'});
      return;
    }
    

  //   this.authService.register(this.model)
  //     .subscribe({
  //       next: (response) => {
          

  //         console.log(this.model);
  //         console.log(response);
  //         this.toast.success({detail:"SUCCESS",summary:'Registered successfully!',duration:2000, position:'topCenter'});
         
  //         this.authService.generateToken(response.id)
  //         .subscribe({
            
  //           next:(res)=>{
  //             this.clicked=false;
  //             console.log(res.mssg);
              
  //             this.router.navigateByUrl(`/validateEmail/${response.id}/${this.model.username}`);
  //           },

  //           error:(err)=>{
  //             this.clicked=false;
  //             console.log(err,"err");
              
  //             this.toast.warning({detail:"Server error",summary:`${err.error}! Click on resend token`,duration:5000, position:'topCenter'});
         
  //             this.router.navigateByUrl(`/validateEmail/${response.id}/${this.model.username}`);
            
                
  //           }
  //         })
  
  //       }
  //       ,
  //       error:(err)=>{
          
  //         this.clicked=false;
  //         if(err.status==0){
  //           this.toast.error({detail:"ERROR",summary:'Server error! Please try again later',duration:2000,position:'topCenter'});
          
  //         }else{
  //           this.toast.error({detail:"ERROR",summary:`${err.error}`,duration:2000,position:'topCenter'});
          
  //         }
  //          // alert("Oops!Try again");
  //         this.clearForm();
            
  //       }
  //     });
  // }

  // clearForm():void{
  //   this.model={
  //     username: '',
  //     password: '',
  //     roles:["User"]
      
  //   };
  //   this.mod={
  //     confirmPassword: '',
  //   }

  }

}

