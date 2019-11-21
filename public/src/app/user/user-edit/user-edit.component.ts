import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  userLogged = {
    email: '',
    admin: ''
  }

  errors: any;
  user: any;
  userForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log('UserEditComponent > ngOnInit() ');
    this.userLogged = this._userService.getUserLoggedIn();
    this.getUser(this._route.snapshot.params['id']);
  }

  getUser(id){
    console.log('UserEditComponent > getUser', id); 
    const observable = this._userService.getUserById(id);
    observable.subscribe(
      (res) => {
      this.user = res.json();
      this.userForm = this._formBuilder.group({
        id:        [this.user.id],
        nome:      [this.user.nome,       [Validators.required, Validators.minLength(2) ]],
        sobrenome: [this.user.sobrenome,  [Validators.required, Validators.minLength(2) ]],
        funcao:    [this.user.funcao,     [Validators.required]],
        email:     [this.user.email,      [Validators.required]],
        custo_hora:[this.user.custo_hora, [Validators.required]],
        admin:     [this.user.admin,      [Validators.required]]
      })

    });
  }

  get nome() {
    return this.userForm.get('nome');
  }

  get sobrenome() {
    return this.userForm.get('sobrenome');
  }

  get funcao() {
    return this.userForm.get('funcao');
  }

  get email() {
    return this.userForm.get('email');
  }

  get custo_hora() {
    return this.userForm.get('custo_hora');
  }


  editUser(userForm: NgForm) {
    console.log('UsuarioEditComponent > editUser(userForm)'); 
    this._userService.editUser(userForm.value)
    .subscribe(observable => {
      if(observable.json().errors) {
        this.errors = observable.json().errors;
        console.log('Algum erro ocorreu editando usuario ', this.errors);
        this._router.navigate(['/user/edit/', this.user['id']]);
      } else {
        this._router.navigate(['/users']);
      }
    },
    err => {
      throw err;
    }
  );
}

cancel() {
  this._router.navigate(['/users']);
}

}