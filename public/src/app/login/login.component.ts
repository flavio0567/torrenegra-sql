import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog  } from '@angular/material';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth.service';
import { User } from '../user/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidCredentialMsg: string;
  user: any;

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
    this.user = User;
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

    this._auth.login(user, pass).subscribe((auth) => {

      if (auth.status && auth.user.ativo === 'ativo') {

        this._userService.setUserLoggedIn(auth.status, auth.user);

        if (!auth.user.admin) {

          this._router.navigate(['/appointments']);

        } else {

          let url =  this._auth.getRedirectUrl();
          this._router.navigate([ url ]);

        }

      } else {

        if (auth.status && auth.user.ativo === 'desativado') {

          window.alert('Usuário desativado!')
        } else {
          window.alert(auth.message)
        }

          this.invalidCredentialMsg = 'Invalid Credentials. Try again.';

        }

    })
  }
}
