import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../user/user.service';
import { ProjectService } from '../project.service';
import { ClientService } from '../../client/client.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {
  userLogged = {
    email: '',
    admin: ''
  }
  errors: any;
  projeto: any;
  projetoForm: FormGroup;

  clientes: any;
  cliente = {
    id: "",
    cnpj: 0,
    razao_social: "",
    nome_fantasia: "",
    endereco: "",
    valor_hh: 0,
    prazo_pgto: 0,
    contatos:  [{ 
      nome: "",
      email: "",
      telefone: 0,
      skype: ""}]
  }
  clienteSelecionado: any;

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _projectService: ProjectService,
    private _clientService: ClientService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
  }

  ngOnInit() {
    console.log('ProjetoEditComponent > ngOnInit() ' );
    this.userLogged = this._userService.getUserLoggedIn();
    this.obterProjeto(this._route.snapshot.params['id']);
  }

  obterProjeto(id){
    console.log('ProjetoEditComponent > obterProjeto'); 
      const observable = this._projectService.getProjectByPk(id);
      observable.subscribe(
        (response) => {
          this.projeto = response.json()[0];  
          this.projetoForm = this._formBuilder.group({
            id: [this.projeto.id],
            codigo: [this.projeto.codigo],
            descricao: [this.projeto.descricao, [Validators.required]],
            cliente_id: [this.projeto.cliente_id, [Validators.required]],
            pedido: [this.projeto.pedido, [Validators.required]],
            valor_pedido: [this.projeto.valor_pedido || 0, [Validators.required]],
            horas_plc: [this.projeto.horas_plc, [Validators.required]],
            horas_ihm: [this.projeto.horas_ihm || 0, [Validators.required]],
            valor_terceiros: [this.projeto.valor_terceiros || 0, [Validators.required]],
            valor_materiais: [this.projeto.valor_materiais || 0, [Validators.required]],
            valor_viagens: [this.projeto.valor_viagens || 0, [Validators.required]]
          })
          this.clienteSelecionado = this.projeto.cliente_id;
          this.obterClienteNomeFantasia(this.projeto.cliente_id);
          this.getClients();
        },
        (err) => {
          console.log('Algum erro ocorreu obtendo projeto ', err);
          throw err;
        }
      )
  }

  obterClienteNomeFantasia(id) {
    console.log('ProjetoEditComponent > obterClienteNomeFantasia()', id)
    const clienteObservable = this._clientService.getClientByPk(id);
    clienteObservable.subscribe(
      (cliente) => { 
        this.cliente = cliente.json()[0];
        this.projeto.nomeFantasiaCliente = this.cliente.nome_fantasia;
      },
      (err) => {
        console.log('Algum erro ocorreu obtendo cliente ', err);
        throw err;
      }
    )
  }

  getClients() {
    console.log('ProjetoEditComponent  > getClients()')
    const clienteObservable = this._clientService.getAllClients();
    clienteObservable.subscribe(
      (clientes) => { 
        this.clientes = clientes.json();
      },
      (err) => {
        console.log('Algum erro ocorreu obtendo cliente ', err);
        throw err;
      }
    )
  }

  editProject(projetoForm: NgForm) {
      console.log('ProjetoEditComponent > editProject');
      this.projeto.cliente_id = this.clienteSelecionado;
      this._projectService.editProject(projetoForm.value)
      .subscribe(
        observable => {
        this.errors = observable.json().errors;
        if( this.errors) {
          console.log('Algum erro ocorreu salvando projeto ', this.errors);
          this._router.navigate(['/project/edit/' + this.projeto.id]);
        } else {
          this._router.navigate(['/projects']);
        }
      },
      error => {
        console.log('Algum erro ocorreu na chamada editProject()', error);
        throw error;
      }
    );
  }
  
  cancel() {
    this._router.navigate(['/projects']);
  }

}