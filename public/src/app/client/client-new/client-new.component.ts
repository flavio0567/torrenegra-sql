import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { UserService } from 'src/app/user/user.service';
import { ClientService } from '../client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-new',
  templateUrl: './client-new.component.html',
  styleUrls: ['./client-new.component.css']
})
export class ClientNewComponent implements OnInit {

  userLogged = {
    email: '',
    admin: ''
  }  
  errors: any;

  clienteForm: FormGroup;
  endereco: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _clientService: ClientService,
    private _router: Router
  ) {}

  ngOnInit() {
    console.log(' ClienteNovoComponent > ngOnInit() ');
    this.userLogged = this._userService.getUserLoggedIn();
    this.clienteForm = this._formBuilder.group({
      cnpj: [null, [ Validators.required, Validators.minLength(11) ]],
      razao_social: [null, [ Validators.required ]],
      nome_fantasia: [null, [ Validators.required ]],
      valor_hh: [],
      prazo_pgto: [],
      contatos: this._formBuilder.array([])
    })
    this.endereco = this._formBuilder.group({ 
      logradouro: [null, [ Validators.required ]],
      complemento: [],
      cidade: [null, [ Validators.required ]],
      estado: [null, [ Validators.required ]],
      cep: [null, [ Validators.required ]]
    })
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

  addContato() {
    const contato = this._formBuilder.group({
      nome: [],
      email: ['', Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')],
      fone: [],
      skype: [],
      main: []
    })

    this.contatoForms.push(contato);
  }

  deleteContato(i) {
    this.contatoForms.removeAt(i);
  }

  createClient(clienteForm, endereco): void {
    console.log('ClientNewComponent > createClient(form)'); 
    let client = clienteForm.value;
    client.endereco = endereco.value;
    this._clientService.createClient(client)
    .subscribe(observable => {
      let resSTR = JSON.stringify(observable);
      console.log('corpo str: ', resSTR);
      let resJSON = JSON.parse(resSTR);
      console.log('corpo json: ', resJSON._body.name);
    })
  }

  cancel() {
    this._router.navigate(['/clients']);
  }
}