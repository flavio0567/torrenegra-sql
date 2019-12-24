import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog  } from '@angular/material';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth.service';
import { UserLogged } from './userLogged';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: any;

  userLogged = new UserLogged;

  errors: any = {}
  
  formLogin: FormGroup;

  constructor(
    public dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _userService: UserService,
    private _auth: AuthService,
  ) {
    this.formLogin = this._formBuilder.group({
      email: [null, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')],
      pass: [null, Validators.pattern('((?=.*[a-z])(?=.*[A-Z]).{8,})')]
    })
  }

  ngOnInit() {
    this.user = { user_id: '', name: "", email: "", pass: "", admin: "", ativo: ""};
  }

  get email() {
    return this.formLogin.get('email');
  }

  get pass() {
    return this.formLogin.get('pass');
  }

  login(formLogin) {
    console.log('LoginComponent  > login(form)'); 
    const user = formLogin.controls.email.value;
    const pass = formLogin.controls.pass.value;
    
    this._auth.login(user, pass).subscribe(data => {
      let result = data.json();
      if(result.success) {
        if (result.ativo === "ativo") {
          this._userService.setUserLoggedIn(true, result);
          console.log('SUCESSO em login');
          if (result.admin) {
            this._router.navigate(['/projects']);
          } else {
            this._router.navigate(['/appointments']);
          }
        } else {
          result.message = "Usuário desativado!"
          window.alert(result.message)
          console.log('ERRO em login', result.message);
          this._router.navigate(['/']);
        }
      } else {
        window.alert(result.message)
        console.log('ERRO em login', result.message);
        this._router.navigate(['/']);
      }
    })
    this._userService.setUserLoggedIn(true, this.userLogged);
  }

}
