import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { CookieServiceStub } from '../models/stub-models/Cookie-service-stub.model';

describe('AuthService', () => {
  let service: AuthService;
  let testController:HttpTestingController
  //let mockCookieService;

  // beforeEach(() => {
  //   TestBed.configureTestingModule({});
  //   service = TestBed.inject(AuthService);
  // });

  beforeEach(()=>{

    // mockCookieService = jasmine.createSpyObj('CookieService', ['get']);

    
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [
        { provide: CookieService, useClass: CookieServiceStub },
      ]
    });
    service=TestBed.inject(AuthService);
    testController=TestBed.inject(HttpTestingController);
  })

  // it('should be created', () => {
  //  // const shred=jasmine.createSpyObj('haha',['fdsf']) --mock service  ...can be used on any consructor
  //   expect(service).toBeTruthy();
  // });


  it('login',()=>{
    const res=service.login({email:'f@gmail.com',password:'Krit@123'});
    expect(res).toBeDefined();
    

  })
});
