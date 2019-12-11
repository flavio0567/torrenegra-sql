import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/user/user.service';
import { ProjectService } from '../project.service';
import { ClientService } from 'src/app/client/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-new',
  templateUrl: './project-new.component.html',
  styleUrls: ['./project-new.component.css']
})
export class ProjectNewComponent implements OnInit {

  userLogged = {
    email: '',
    admin: ''
  }
  clientes: any;
  errors: any;
  projetos: any;

  projetoForm: FormGroup;


  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _projectService: ProjectService,
    private _clientService: ClientService,
    private _router: Router
  ) { }

  ngOnInit() {
    console.log('ProjectNewComponent > ngOnInit() ');
    this.userLogged = this._userService.getUserLoggedIn();
    this.getListClient();
    this.projetoForm = this._formBuilder.group({
      codigo: [null, [ Validators.required, Validators.pattern("[A-Z]{2}-[0-9]{3}-[0-9]{2}") ]],
      descricao: [null, [ Validators.required ]],
      cliente_id: [null],
      pedido:  [null, [ Validators.required ]],
      valor_pedido: [null, [ Validators.required ]],
      horas_plc: [null],
      horas_ihm: [null],
      valor_terceiros: [null],
      valor_materiais: [null],
      valor_viagens: [null],
      situacao: [0]
    });
  }

  getListClient() {
    console.log('ProjectNewComponent > getListClient()')
    const cliObservable = this._clientService.getAllClients();
    cliObservable.subscribe(
      (clientes) => { 
        this.clientes = clientes.json();
      },
      (err) => { },
        () => { }
    )
  }

  get codigo() {
    return this.projetoForm.get('codigo');
  }

  get descricao() {
    return this.projetoForm.get('descricao');
  }

  get pedido() {
    return this.projetoForm.get('pedido');
  }

  get horasPLC() {
    return this.projetoForm.get('horasPLC');
  }

  get horasIHM() {
    return this.projetoForm.get('horasIHM');
  }

  createProject(projetoForm) {
    console.log('ProjectNewComponent > createProject(form)');
    this._projectService.createProject(projetoForm.value)
    .subscribe(
      data => {
        console.log('retorno salvando projeto ',data.json().errors);
        this.errors = data.json().errors;
        if( this.errors) {
          console.log('Algum erro ocorreu salvando projeto ', this.errors);
          this._router.navigate(['/project/new']);
        } else {
          this._router.navigate(['/projects']);
        }
      },
      error => {
        console.log('Algum erro ocorreu na chamada createProject()', error);
        throw error;
      })
  }
  cancel() {
    this._router.navigate(['/projects']);
  }

}