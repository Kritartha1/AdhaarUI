import { Component, OnDestroy, OnInit } from '@angular/core';
import { ImageSelectorComponent } from 'src/app/shared/components/image-selector/image-selector.component';
import { ImageRequest } from '../models/Image.model';
import { User } from '../auth/models/user.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit,OnDestroy {
  public dob?: string; // Assuming the date is a string; adjust as needed
  public age?: number;
  public maxDate?: string; // To store the max date

  user?: User;
  address?: ImageRequest
  editUserSubscription?: Subscription;
  editAddressSubscription?: Subscription;
  id: string | null;
  ad_id: string | null;


  constructor(
    private authService: AuthService,
    private router: Router,
    private imageService: ImageService) {
    this.id = "";
    this.ad_id = "";
    // this.address = {
    //   id: "",
    //   locality: "",
    //   city: "",
    //   state: ""
    // };


  }

  
  ngOnInit(): void {
    this.maxDate = this.getCurrentDate();
    this.id = localStorage.getItem('user-Id');
    if (this.id) {
      console.log(this.id);
      this.editUserSubscription = this.authService.getUserById(this.id)
        .subscribe(
          {
            next: (response) => {
              this.user = response;

              
              this.editAddressSubscription = this.imageService.getImageById(this.id!)
                .subscribe(
                  {
                    next: (res) => {
                      this.address = res;

                    }
                  }
                )


            }
          }
        )
    }
  }


  toTop(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  

  OnFormSubmit(): void {
    // const updateUserRequest: UpdateUser = {

    //   name: this.user?.name ?? '',
    //   age: this.user?.age ?? 0,
    //   dob: this.user?.dob ?? "2023-12-12T12:19:53.929Z",
    // };
    // const updateAddressRequest: UpdateAddress = {

    //   locality: this.address?.locality ?? '',
    //   city: this.address?.city ?? '',
    //   state: this.address?.state ?? ''
    // };

    // if (this.id && this.ad_id) {
    //   const ad = this.ad_id;
    //   this.editUserSubscription = this.userService.updateUser(this.id, updateUserRequest)
    //     .subscribe({
    //       next: (response) => {
    //         this.editAddressSubscription = this.addressService.updateAddress(ad, updateAddressRequest)
    //           .subscribe({
    //             next: (res) => {
    //               alert('Profile successfully updated!');


    //             }
    //           });

    //       },
    //       error: (err) => {
    //         alert("Please fill all the fields");
    //       }
    //     });


    // }
  }

  calculateAge(): void {
    // if (this.dob) {
    //   const today = new Date();
    //   const birthDate = new Date(this.dob);
    //   console.log(birthDate, today);

    //   let age = today.getFullYear() - birthDate.getFullYear();

    //   const monthDiff = today.getMonth() - birthDate.getMonth();

    //   if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    //     age--;
    //   }

    //   console.log("age:", age);

    //   this.age = age;
    // }

  }

  getCurrentDate(): string {
    // const today = new Date();
    // const year = today.getFullYear();
    // const month = (today.getMonth() + 1).toString().padStart(2, '0');
    // const day = today.getDate().toString().padStart(2, '0');

    // return `${year}-${month}-${day}`;
    return "haha";
  }

  

  ngOnDestroy(): void {
    this.editAddressSubscription?.unsubscribe();
    this.editUserSubscription?.unsubscribe();
  }

}
