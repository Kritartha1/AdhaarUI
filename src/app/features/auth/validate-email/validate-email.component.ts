import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-validate-email',
  templateUrl: './validate-email.component.html',
  styleUrls: ['./validate-email.component.css']
})
export class ValidateEmailComponent implements OnInit,OnDestroy{
  /**
   *
   */
  id:string|null=null;
  email:string|null='';
  resendClicked:boolean=false;
  clicked:boolean=false;
  paramsSubscription?: Subscription;
  authSubscription?:Subscription;
  tokenSubscription?:Subscription;
  mod:{token:string};
  error_:string='';


  constructor(private route: ActivatedRoute,
    private authService:AuthService,
    private router:Router,
    private toast:NgToastService) {
      this.mod={
        
        token:''
      }
      
    
    
  }
  
  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe(
      {
        next: (params) => {
          this.id = params.get('id');
          
          this.email=params.get('email');
        },
        error:(err)=>{
          console.log("id not fetched");
        }
        
        });
    
  }

  onFormSubmit():void{
    if(this.mod.token==''){
      this.error_="Token required";
      return;
    }
    if(this.id){
      this.clicked=true;
      this.tokenSubscription=this.authService.confirmEmail(this.mod.token,this.email!).subscribe({
        next:(res)=>{
          this.clicked=false;
          this.toast.success({detail:"Success",summary:"Email validated successfully!",duration:3000, position:'topCenter'});
          this.router.navigateByUrl('/login');
        },
        error:(err)=>{

          this.mod.token='';
          if(err.status==0){
            this.error_="Server down";
            return;
          }
          this.error_=err.error;
          //this.toast.error({detail:"Error",summary:`${err.error}`,duration:3000, position:'topCenter'});
          this.clicked=false;
        }
      }
        );
    }
    
    // console.log(this.mod);
  }

  toggle():void{
    this.resendClicked=false;
    this.clicked=false;
  }

  resendCode():void{
    
    if(this.id){
      // this.clicked=true;
      this.authSubscription=this.authService.generateToken(this.id)
          .subscribe({
            
            next:(res)=>{
              // this.clicked=false;
              this.resendClicked=false;
              this.toast.info({detail:"Email sent",summary:"New token sent!",duration:5000, position:'topCenter'});
         
              console.log(res.mssg);
              //this.router.navigateByUrl(`/validateEmail/${this.id}/${this.email}`);
            
              
            },

            error:(err)=>{
              // this.clicked=false;
              this.resendClicked=false;
              
              if(err.status==0){
                this.error_="Server down";
                return;
              }
              this.error_=err.error;
              
              this.toast.warning({detail:"Server error",summary:`${err.error}!`,duration:5000, position:'topCenter'});
         
              // this.router.navigateByUrl(`/validateEmail/${this.id}`);
                
            }
          })

    }else{
      this.toast.warning({detail:"Internal error",summary:"Please try again later!",duration:5000, position:'topCenter'});
         
    }
     
  }

  dummy():void{
    if(this.mod.token==''){
      this.error_='Token required';
    }else{
      this.error_='';
    }
    
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
    this.paramsSubscription?.unsubscribe();
  }

}
