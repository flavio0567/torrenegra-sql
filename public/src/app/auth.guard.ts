import { Injectable } from '@angular/core';
import { Router,  CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import { AuthService } from './auth.service';
import { UserService } from './user/user.service';

@Injectable()
export class AuthGuard implements  CanActivate {
  
  constructor(private _auth: AuthService, 
    private router: Router,
    private _user: UserService) {

  }
 
  canActivate(
    next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      let url: string = state.url;
      console.log('Url:'+ url, this._auth.isUserLoggedIn);
      if (this._auth.isUserLoggedIn) {
        return true;
    }
      this._auth.setRedirectUrl(url);
      this.router.navigate([ this._auth.getLoginUrl() ]);
    return false;
  }
} 