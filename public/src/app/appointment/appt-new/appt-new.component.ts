import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/project/project.service';
import { UserService } from 'src/app/user/user.service';
import { Router } from '@angular/router';
import { UserLogged } from 'src/app/login/userLogged';
import { MatRadioChange } from '@angular/material';

@Component({
  selector: 'app-appt-new',
  templateUrl: './appt-new.component.html',
  styleUrls: ['./appt-new.component.css']
})

export class ApptNewComponent implements OnInit {

  errors: any;
  options: FormGroup;
  userLogged = new UserLogged();
  today = new Date();
  projetos: any[];
  apontamento: any = {
    tipo: "",
    user_id: "",
    project_id: "",
    valor_hh: 0,
    inicio: "",
    fim: "",
    descricao: "",
    valor: 0,
    data: "",
    reembolso: false,
  }
  array = ['hora', 'despesa'];
  isSelected: Boolean = false; 
  usuario: any;

  constructor(
    private fb: FormBuilder,
    private _projectService: ProjectService,
    private _userService: UserService,
    private _router: Router
  ) {  
    this.options = fb.group({
      tipo: [null, [Validators.required]],
      projeto: [null],
      opDespesa: [null],
      descricao: [null],
      inicio: [null],
      fim: [null],
      valor: [null],
      reembolso: [false]
    });

    this.formControlValueChanged();

  }

  ngOnInit() {
    console.log(' ApptNewComponent > ngOnInit() ');
    this.userLogged = this._userService.getUserLoggedIn();
    this.apontamento.user_id = this.userLogged.user_id;
    this._userService.getUserByPk(this.apontamento.user_id)
    .subscribe(
      (usuario) => {
        if (usuario) { 
          this.usuario = usuario.json();
          this.apontamento.valor_hh = this.usuario.custo_hora;
        }
      },
      (err) => { },
        () => { }
    )
    this.getListProjects();
  }

  getListProjects() {
    console.log('ApptNewComponent > getListProjects()');
    const projetoObservable = this._projectService.getListProjects();
    projetoObservable.subscribe(
      (projetos) => { 
        this.projetos = projetos.json();
      },
      (err) => { },
        () => { }
    )
  }

  formControlValueChanged() {
    const inicio = this.options.get('inicio');
    const opDespesa = this.options.get('opDespesa');
    const descricao = this.options.get('descricao');
    const valor = this.options.get('valor');
    this.options.get('tipo').valueChanges.subscribe(
        (tipo: string) => {
            if (tipo === 'hora') {
                descricao.clearValidators();
                valor.clearValidators();
                inicio.setValidators([Validators.required]);
            }
            else if (tipo === 'despesa') {
                this.options.get('opDespesa').valueChanges.subscribe(
                  (opdesp: string) => {
                    opDespesa.setValidators([Validators.required]);
                    if (opdesp === 'outros') {
                      this.isSelected = true;
                    }
                    valor.setValidators([Validators.required]);
                    inicio.clearValidators();
                })
            }
            inicio.updateValueAndValidity();
            opDespesa.updateValueAndValidity();
            descricao.updateValueAndValidity();
            valor.updateValueAndValidity();
        });

  }

  radioChange(event: MatRadioChange, i) {
    if (event.value === 'despesa') {
      this.array = ['despesa'];
    } else {
      this.array = ['hora'];
    }
  }

  setAppt() {
    console.log('ApptNewComponent > setAppt()');
    this.apontamento.tipo = this.options.controls.tipo.value;
    if (this.options.controls.tipo.value != 'hora') {
      this.apontamento.data = this.today;
      this.apontamento.inicio = "";
      this.apontamento.fim = "";
    } else {
      this.apontamento.inicio = this.today;
      this.apontamento.fim = "";
    }
    if (this.options.controls.tipo.value == 'despesa' && this.options.controls.opDespesa.value != 'outros') {
      this.apontamento.descricao = this.options.controls.opDespesa.value;
      this.apontamento.valor = this.options.controls.valor.value;
    }
    if (this.options.controls.tipo.value == 'despesa' && this.options.controls.opDespesa.value == 'outros') {
      if (this.options.controls.descricao.value) {
        this.apontamento.descricao = this.options.controls.descricao.value;
        this.apontamento.valor = this.options.controls.valor.value;
      } else {
        this.errors = {descricao: {message: "Descrição da despesa é requerida"}};
        this._router.navigate(['/appointment/new']);
        return false;
      }
    }
    this.apontamento.reembolso = this.options.controls.reembolso.value;
    this.apontamento.user_id = this.apontamento.user_id;
    this.apontamento.project_id = this.options.controls.projeto.value;
    this._projectService.newAppt(this.apontamento)
      .subscribe(observable => {
        if(observable.json().errors) {
          this.errors = observable.json().errors;
          console.log('Algum erro ocorreu salvando apontamento ', this.errors);
          this._router.navigate(['/appointment/new']);
        } else {
          this._router.navigate(['/appointments']);
        }
      },
      (err) => {
        console.log('Algum erro ocorreu criando apontamento ', err);
        throw err;
      })
    }

  cancel() {
    this._router.navigate(['/appointments']);
  }

}