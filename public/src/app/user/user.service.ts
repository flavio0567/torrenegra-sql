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

  private isUserLoggedIn;
  public userLogged;

  constructor(private http: HttpClient, private _http: Http) { }
  isLoggedIn(): Observable<isLoggedIn> {
    return this.http.get<isLoggedIn>('/isloggedin')
  }

  setUserLoggedIn(status, user) {
    this.isUserLoggedIn = status;
    this.userLogged = user;
  }

  logout() {
    this.isUserLoggedIn = false;
    return this.http.get<logoutStatus>('/logout')
  }

  getUserLoggedIn() {
    console.log('UserService > getUserLoggedIn() ');
    return this.userLogged;
  }

  getListUser() {
    console.log('UserService > getListUser()');
    return this._http.get('/users');
  }

  getUser(user) {
    console.log('UserService > getUser' );
    return this._http.get('/user/', {params: {user: user } });
  }

  getUserById(id) {
    console.log('UserService > getUserById', id);
    return this._http.get('/user/show/' + id);
  }

  createUser(user) {
    console.log('UserService > createUser(user)' );
    return this._http.post('user/new', user);
  }

  editUser(user) {
    console.log('UserService > editUser(user)', user['id'] );
    return this._http.put('user/edit/' + user['id'], user);
  }

  registerUser(user) {
    console.log('UserService > registerUser( ', user.user, ')' );
    return this._http.put('user/register', user);
  }


  changeSituation(user) {
    console.log('UserService > changeSituation(', user, ')');
    return this._http.put('user/changeSituation/' + user['id'], user);
  }


}
