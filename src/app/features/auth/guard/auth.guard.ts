import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
// @ts-ignore  
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getuser();
  //checking for token

  let token = cookieService.get('Authorization');
  if (token && user) {
    token = token.replace('Bearer', '');
    const decodedToken: any = jwtDecode(token);


    const expirationDate = decodedToken.exp * 1000;
    console.log(expirationDate,"haha");
    const currentTime = new Date().getTime();

    if (expirationDate < currentTime) {
      console.log("authguard exp");
      authService.logout();
      return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
    } else {
        return true;
      
    }

  } else {
    
    authService.logout();
    console.log("authguard no token");
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
  }

};
