import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';
import { UserService } from 'src/app/user/user.service';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {

  userLogged = {
    email: '',
    admin: ''
  }  
  errors: any;
  cliente: any;

  clienteForm: FormGroup;
  endereco: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _clientService: ClientService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    console.log(' ClientEditComponent > result.message');
    this.userLogged = this._userService.getUserLoggedIn();
    this.getClient(this._route.snapshot.params['id']);
    }

  getClient(id) {
    console.log('ClientEditComponent > getClient'); 
      const observable = this._clientService.getClientByPk(id);
      observable.subscribe(
        (response) => {
          this.cliente = response.json();
          console.log('ClientEditComponent > getClient'); 
          this.clienteForm = this._formBuilder.group({
            id: this.cliente[0].id,
            cnpj: [this.cliente[0].cnpj, [Validators.required]],
            razao_social: [this.cliente[0].razao_social, [Validators.required]],
            nome_fantasia: [this.cliente[0].nome_fantasia, [Validators.required]],
            valor_hh: [this.cliente[0].valor_hh],
            prazo_pgto: [this.cliente[0].prazo_pgto],
            contatos: [this._formBuilder.array([this.cliente[0].contacts])]
            })
          this.endereco = this._formBuilder.group({ 
              logradouro: [this.cliente[0].addresses[0].logradouro, [Validators.required]],
              complemento: [this.cliente[0].addresses[0].complemento],
              cidade: [this.cliente[0].addresses[0].cidade, [Validators.required]],
              estado: [this.cliente[0].addresses[0].estado, [Validators.required]],
              cep: [this.cliente[0].addresses[0].cep, [Validators.required]]
            })
            this.setContato();
        },
        (err) => { },
          () => { }
      )
  }

  get cnpj() {
    return this.clienteForm.get('cnpj');
  }

  get razao_social() {
    return this.clienteForm.get('razao_social');
  }

  get nome_fantasia() {
    return this.clienteForm.get('nome_fantasia');
  }

  get logradouro() {
    return this.clienteForm.get('logradouro');
  }

  get cidade() {
    return this.clienteForm.get('cidade');
  }

  get estado() {
    return this.clienteForm.get('estado');
  }

  get cep() {
    return this.clienteForm.get('cep');
  }

  get contatoForms() {
    return this.clienteForm.get('contatos') as FormArray
  }

  setContato() {
    let contatoForms = this.cliente[0].contacts.map(contato => this._formBuilder.group(contato));
    let contatoFormsArray = this._formBuilder.array(contatoForms);
    this.clienteForm.setControl('contatos', contatoFormsArray);
  }

  addContato() {
    const contato = this._formBuilder.group({
      nome: [''],
      email: ['', Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')],
      fone: [''],
      skype: [''],
      main: ['']
    })
    this.contatoForms.push(contato);
  }

  deleteContato(i) {
    this.contatoForms.removeAt(i);
  }

  editClient(clienteForm: NgForm, endereco: NgForm) {
    console.log('ClientEditComponent > editClient(', clienteForm.value, this.endereco.value, ')'); 
    let cliente = clienteForm.value;
    cliente.endereco = this.endereco.value;
    this._clientService.editClient(clienteForm.value.id, cliente)
      .subscribe(observable => {
          console.log('response - status: ', observable.status);
          this._router.navigate(['/clients']);
      },
      (err) => {
        console.log('Algum erro ocorreu editando cliente ', err.message);
        throw err;
      }
    );
  }

  cancel() {
    this._router.navigate(['/clients']);
  }
}