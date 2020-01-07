import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

interface myData {
  message: string,
  success: boolean
}

interface isLoggedIn {
  status: boolean
}

interface logoutStatus {
  success: boolean
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isUserLoggedIn: any;
  userLoggedIn: any;

  constructor(private http: HttpClient, private _http: Http) { }
  isLoggedIn(): Observable<isLoggedIn> {

    return this.http.get<isLoggedIn>('')
  }

  setUserLoggedIn(status, user): void {
    console.log('UserService > setUserLoggedIn()');

    this.userLoggedIn = user;
    this.isUserLoggedIn = status;

  }

  logout() {
    this.isUserLoggedIn = false;
    return this.http.get<logoutStatus>('/logout')
  }

  getUserLoggedIn() {
    console.log('UserService > getUserLoggedIn() ');
    return this.userLoggedIn;
  }

  getListUser() {
    console.log('UserService > getListUser()');
    return this._http.get('/users');
  }

  getUser(user) {
    console.log('UserService > getUser');
    return this._http.get('/user/', {params: {user: user } });
  }

  getUserByPk(id) {
    console.log('UserService > getUserByPk');
    return this._http.get('/user/show/' + id);
  }

  createUser(user) {
    console.log('UserService > createUser()');
    return this._http.post('user/new', user);
  }

  editUser(user) {
    console.log('UserService > editUser()');
    return this._http.put('user/edit/' + user['id'], user);
  }

  registerUser(user) {
    console.log('UserService > registerUser()' );
    return this._http.put('user/register', user);
  }


  changeSituation(user) {
    console.log('UserService > changeSituation()');
    return this._http.put('user/changeSituation/' + user['id'], user);
  }


}
