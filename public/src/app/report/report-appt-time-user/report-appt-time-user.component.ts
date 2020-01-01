import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/project/project.service';
import { UserService } from 'src/app/user/user.service';
import { ClientService } from 'src/app/client/client.service';
import { ExcelService } from 'src/app/excel.service';


export interface Transaction {
  codigo: string;
  cliente: string;
  inicio: string;
  fim: string;
  totalhh: number;
}

export function getProjeto(projetos, id) {
  for (var i = 0 ; i < projetos.length; i++){
    if (projetos[i].id === id) {
      return projetos[i];
    }
  }
}

export function DataHora(x, y) {
  let diff;
  let hora;
  let minutes;

  x = new Date(x);
  y = new Date(y);

  diff=Math.abs(y.getTime()- x.getTime())/3600000;
  
  if (isNaN(diff)){ return {dia: 0, hora: 0, minuto: 0}; }
  
  hora = parseInt(diff);   
  
  minutes = ((diff)%1/100*60)*100;
  minutes = parseInt(minutes); 
  if (minutes<10) {    
    minutes = "0" + minutes;
  } else if (minutes>60) {
    let h = minutes / 60;
    minutes = ((h)%1/100*60)*100;
    h = Math.trunc(h);
    hora += h;
  } else {
    console.log('time calculated!');
  }

  return {hora: hora, minuto: minutes };
}

@Component({
  selector: 'app-report-appt-time-user',
  templateUrl: './report-appt-time-user.component.html',
  styleUrls: ['./report-appt-time-user.component.css']
})
export class ReportApptTimeUserComponent implements OnInit {

  displayedColumns: string[] = ['codigo', 'cliente', 'inicio', 'fim', 'totalhh'];
  transactions: Transaction[];

  options: FormGroup;
  selected: boolean = false;
  projetos: any[];
  estados: any[] = [0, 1, 2, 3, 4];
  usuarios: any[];
  projeto: any;
  apontamentos: any;
  lista: [{
    codigo: string,
    cliente: string,
    inicio: string,
    fim: string,
    totalhh: number
  }]
  userLogged = {
    name: '',
    admin: ''
  }
  cliente = {
    id: "",
    nome_fantasia: ""
  }

  data : Array<object> = [];
  
  constructor(
    private fb: FormBuilder,
    private _projectService: ProjectService,
    private _userService: UserService,
    private _clientService: ClientService,
    private _excelService: ExcelService
  ) { 
    this.options = fb.group({
      project_id: [null],
      user_id: [null],
      inicio: new Date(),
      fim: new Date(),
      tipo: 'hora'
    });
  }

  ngOnInit() {
    console.log('ReportApptTimeUserComponent >  ngOnInit()')
    this.userLogged = this._userService.getUserLoggedIn();
    this.getListUsers();
    this.getProjects();
  }

  get user_id() {
    return this.options.get('user_id');
  }

  getListUsers() {
    console.log('ReportApptTimeUserComponent > getListUsers()')
    this._userService.getListUser()
    .subscribe(
      (usuarios) => { 
        this.usuarios = usuarios.json();
      },
      (err) => {
        console.log('Algum erro ocorreu obtendo lista de usuários', err);
        throw err;
      }
    )
  }

  getProjects() {
    console.log('ReportApptTimeUserComponent > getProjects()')
    const projetoObservable = this._projectService.getProjectsEstado(this.estados);
    projetoObservable.subscribe(
      (projetos) => { 
        this.projetos = projetos.json();
      },
      (err) => {
        console.log('Algum erro ocorreu obtendo lista de projetos ', err);
        throw err;
      }
    )
  }

  getAppt() {
    console.log('ReportApptTimeUserComponent > getAppt');
    let prj = 
      {
        project_id: this.options.value.project_id, 
        inicio: this.options.value.inicio,
        fim: this.options.value.fim
      }
    this._projectService.getListApptTimeUser(this.options.value.user_id, prj)
    .subscribe(
      (apontamentos) => { 
        this.apontamentos = apontamentos.json();
        for (let i=0 ; i < this.apontamentos.length; i++) {
          let data = DataHora(this.apontamentos[i].inicio, this.apontamentos[i].fim);
          this.apontamentos[i].totalhh =
            (data.hora > 9 ? "" + data.hora.toFixed(0) : "0" + data.hora.toFixed(0)) + ':' +
            (data.minuto > 9 ? "" + data.minuto : "0" + parseInt(data.minuto).toFixed(0));
          this.projeto = getProjeto(this.projetos, this.apontamentos[i].project_id);
          this.apontamentos[i].codigo = (this.projeto? this.projeto.codigo : '-');
          this._clientService.getClientByPk(this.projeto.cliente_id)
          .subscribe(
            (cliente) => { 
              this.cliente = cliente.json();
              this.apontamentos[i].cliente = this.cliente[0].nome_fantasia;
            },
            (err) => {
              console.log('Algum erro ocorreu obtendo cliente do projeto (apontamento) ', err);
              throw err;
            }
          )
        }
        this.transactions = this.apontamentos;
        this.selected = true;
      },
      (err) => {
        console.log('Algum erro ocorreu obtendo apontamentos de projeto ', err);
        throw err;
      }
    )
  }

  getTotalCost() {
    console.log('ReportApptTimeUserComponent > getTotalCost()');
    return this.projetos.map(t => t.custo).reduce((acc, value) => acc + value, 0);
  }


  buildReport() {
    console.log('ReportApptTimeUserComponent > buildReport()');
    this.data = [];
    for (let i=0 ; i < this.apontamentos.length; i++) {
      let row = new Array();
      row['codigo'] = this.apontamentos[i].codigo;
      row['cliente'] = this.apontamentos[i].cliente;
      let dtInicio = new Date(this.apontamentos[i].inicio);
      // let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      let semana = { weekday: 'long'};
      let dia = { year: 'numeric', month: '2-digit', day: '2-digit' };
      row['dia_da_semana_inicio'] = dtInicio.toLocaleDateString('pt-BR', semana);
      row['data_inicio '] = dtInicio.toLocaleDateString('pt-BR', dia);
      row['hora_inicio'] =  ('00' + dtInicio.getHours()).slice(-2) + ':' + ('00' + dtInicio.getMinutes()).slice(-2);
      let dtFim = new Date(this.apontamentos[i].fim);
      if (Object.prototype.toString.call(dtFim) === "[object Date]") {
        if (isNaN(dtFim.getTime())) {
          // row['fim'] = '';
          row['dia_da_semana_fim'] = '';
          row['data_fim'] = '';
          row['hora_fim'] = '';
        } else {
          // row['fim'] = dtFim.toLocaleDateString('pt-BR', options);
          row['dia_da_semana_fim'] = dtFim.toLocaleDateString('pt-BR', semana);
          row['data_fim'] = dtFim.toLocaleDateString('pt-BR', dia);
          row['hora_fim'] = ('00' + dtFim.getHours()).slice(-2) + ':' + ('00' + dtFim.getMinutes()).slice(-2);
        }
      } else {
        // row['fim'] = '';
        row['dia_da_semana_fim'] = '';
        row['data_fim'] = '';
        row['hora_fim'] = '';
      }
      row['totalhh'] = this.apontamentos[i].totalhh;
      this.data.push(row);
    }
    this.exportAsXLSX();
  }

  exportAsXLSX():void {
    console.log('ReportApptTimeUserComponent > exportAsXLSX()');
    this._excelService.exportAsExcelFile(this.data, 'rel_apt_hora_por_usuario');
 }

}