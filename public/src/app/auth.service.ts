import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { map } from 'rxjs/operators';
import { User } from './user/user';


@Injectable()
  export class AuthService {

    private redirectUrl: string = '/projects';
    private loginUrl: string = '/';
    private isLoggedIn: boolean = false;
    private userLoggedIn: User;
    
  constructor(private _http: Http) { }

  login(user, pass) {
    console.log('AuthService > login()');

    return this._http.post('/login/', { email: user, senha: pass })
    .pipe(map(data => {
      let user = data.json();

      if(user.success) {

          this.isLoggedIn = true;
          this.userLoggedIn =  user;

      } else {
        
          this.isLoggedIn = false;        
      } 

      return {status:this.isLoggedIn, user: this.userLoggedIn, message: user.message}; 
    
    }));
  }

  setLoggedIn(value: boolean) {
    this.isLoggedIn = value
  }

	isUserLoggedIn(): boolean {
		return this.isLoggedIn;
	}
	getRedirectUrl(): string {
		return this.redirectUrl;
	}
	setRedirectUrl(url: string): void {
		this.redirectUrl = url;
	}
	getLoginUrl(): string {
		return this.loginUrl;
	}
	getLoggedInUser(): User {
		return this.userLoggedIn;
	}
	logoutUser(): void{
		this.isLoggedIn = false;
	}


}