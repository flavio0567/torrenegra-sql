import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit {
  usuarioLogado = {
    email: '',
    admin: false
  }

  errors: any;
  userForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _router: Router
  ) { }

  ngOnInit() {
    console.log('UserNewComponent > ngOnInit()');
    this.usuarioLogado = this._userService.getUserLoggedIn();
    this.userForm = this._formBuilder.group({
      nome: [null, [ Validators.required, Validators.minLength(2) ]],
      sobrenome: [null, [ Validators.required, Validators.minLength(2) ]],
      email: [null, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')],
      funcao: [null, [ Validators.required ]],
      custo_hora: [null, [ Validators.required ]],
      senha: null,
      admin: []
    })
  }

  get nome() {
    return this.userForm.get('nome');
  }

  get sobrenome() {
    return this.userForm.get('sobrenome');
  }

  get email() {
    return this.userForm.get('email');
  }

  get funcao() {
    return this.userForm.get('funcao');
  }

  get custo_hora() {
    return this.userForm.get('custo_hora');
  }

  createUser(userForm) {
    console.log('UserNewComponent > createUser(userForm)');
    if (!userForm.value.admin) {
      userForm.value.admin = false;
    } 
    this._userService.createUser(userForm.value)
      .subscribe(observable => {

        if(observable.json().errors) {

          this.errors = observable.json().errors;
          console.log('Algum erro ocorreu salvando usuario ', this.errors);
          this._router.navigate(['/user/new']);
          
        } else {

          console.log('Sucesso salvando usuario ');
          this._router.navigate(['/users']);
        }

      },
        (err) => {
          console.log('Algum erro ocorreu criando usuario ', err);
          throw err;
        }
      );
    }

  cancel(){
    this._router.navigate(['/users']);
  }

}
