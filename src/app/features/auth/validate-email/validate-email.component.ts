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
  clicked:boolean=false;
  paramsSubscription?: Subscription;
  authSubscription?:Subscription;
  mod:{email:string,token:string};


  constructor(private route: ActivatedRoute,
    private authService:AuthService,
    private router:Router,
    private toast:NgToastService) {
      this.mod={
        email:'',
        token:''
      }
      
    
    
  }
  
  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe(
      {
        next: (params) => {
          this.id = params.get('id');
        },
        error:(err)=>{
          console.log("id not fetched");
        }
        
        });
    
  }

  resendCode():void{
    if(this.id){
      this.authSubscription=this.authService.generateToken(this.id)
          .subscribe({
            
            next:(res)=>{
              this.clicked=false;
              console.log(res.mssg);
              
              this.router.navigateByUrl(`/validateEmail/${this.id}`);
            },

            error:(err)=>{
              this.clicked=false;
              console.log(err,"err");
              
              this.toast.warning({detail:"Server error",summary:`${err.error}!`,duration:5000, position:'topCenter'});
         
              this.router.navigateByUrl(`/validateEmail/${this.id}`);
                
            }
          })

    }
    
    
    
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
    this.paramsSubscription?.unsubscribe();
  }

}
