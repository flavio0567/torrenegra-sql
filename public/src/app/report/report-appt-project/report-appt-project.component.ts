import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import { ProjectService } from 'src/app/project/project.service';
import { ClientService } from 'src/app/client/client.service';
import { ExcelService } from 'src/app/excel.service';

export interface Transaction {
  codigo: string;
  descricao: string;
  cliente: string;
  apontamentos: [{
    data: string;
    custo: number;
    despesa: string;
    valor: number;
  }]
}


export function DataHora(x, y) {

  let diff;
  let hora;
  let minutes;

  x = new Date(x);
  y = new Date(y);
  
  diff=Math.abs(y.getTime() - x.getTime())/3600000;
  
  if (isNaN(diff)){ return {dia: 0, hora: 0, minuto: 0}; }
  
  hora = parseInt(diff);   
  
  minutes = ((diff)%1/100*60)*100;
  minutes = parseInt(minutes);  
  
  return {hora: hora, minuto: minutes };
}


@Component({
  selector: 'app-report-appt-project',
  templateUrl: './report-appt-project.component.html',
  styleUrls: ['./report-appt-project.component.css'],
})

export class ReportApptProjectComponent implements OnInit {

  displayedColumns: string[] = ['codigo', 'descricao', 'cliente', 'data', 'custo', 'despesa', 'valor', 'ctotal', 'vtotal'];
  transactions: any;

  projetos: [{
    id: string,
    codigo: string,
    descricao: string,
    cliente_id: string,
    cliente: string,
    apontamentos: [{
      data: string,
      custo: any;
      despesa: string,
      valor: number
    }],
    valorTotalDespesa: 0,
    custoTotalHora: 0,
    custoTotalMinuto: 0,
  }];

  estados: any[] = [0, 1, 2, 3];

  userLogged = {
    name: '',
    admin: ''
  };

  cliente = {
    id: "",
    nome_fantasia: ""
  };

  nomeCliente: any;
  usuario: any;
  apontamentos: any;
  apontamento: any;

  data : Array<object> = [];

  constructor(
    private _userService: UserService,
    private _projectService: ProjectService,
    private _clientService: ClientService,
    private _excelService: ExcelService
  ) { } 

  ngOnInit() {
    console.log('ReportApptProjectComponent > usuariologado ')
    this.userLogged = this._userService.getUserLoggedIn();
    this.getProjects();
  }

  getProjects() {
    console.log('ReportApptProjectComponent > getProjects()')
    const projetoObservable = this._projectService.getProjectsEstado(this.estados);
    projetoObservable.subscribe(
      (projetos) => { 
        this.projetos = projetos.json();
        for (var i = 0; i < this.projetos.length; i++) {
          this.getClient(this.projetos[i]['cliente_id'], i);
          this.getTotalAppts(this.projetos[i]['id'], i);
        }
      },
      (err) => {
        console.log('Algum erro ocorreu obtendo lista de projetos ', err);
        throw err;
      }
    )
  }

  getClient(id, i) {
    console.log('ReportApptProjectComponent > obterCliente()');
    this._clientService.getClientByPk(id)
    .subscribe(
      (cliente) => { 
        this.cliente = cliente.json();
        this.projetos[i]['cliente'] = this.cliente[0].nome_fantasia;
      },
      (err) => {
        console.log('Algum erro ocorreu obtendo cliente de projetos ', err);
        throw err;
      }
    )
  }

  getTotalAppts(id, i) {
    console.log('ReportApptProjectComponent > getTotalAppts');
    this._projectService.getTotalAppts(id)
    .subscribe(
      (apontamentos) => { 
        this.apontamentos = apontamentos.json();
        for (let a of this.apontamentos) {
          if (a.tipo == 'hora') {
            let data = DataHora(a.inicio, a.fim)
            if (isNaN(this.projetos[i].custoTotalHora)) { 
              this.projetos[i].custoTotalHora = data.hora;
              this.projetos[i].custoTotalMinuto = data.minuto;
            } else {
              this.projetos[i].custoTotalHora += data.hora;
              this.projetos[i].custoTotalMinuto += data.minuto;
            }
            this.apontamento = { 'data': a.inicio ,'custo': data }; 
          } else {
            this.apontamento = { 'despesa': a.descricao, 'valor': a.valor };
            if (isNaN(this.projetos[i].valorTotalDespesa)) {
              this.projetos[i].valorTotalDespesa = 0;
            } 
            this.projetos[i].valorTotalDespesa +=  a.valor;      
          }
          if (this.projetos[i].custoTotalMinuto) {
            let hora;
            let minuto;
            if (this.projetos[i].custoTotalMinuto>=60) {
              hora = this.projetos[i].custoTotalMinuto / 60;
              minuto = ((hora)%1/100*60)*100;
              hora = parseInt(hora);
              this.projetos[i].custoTotalHora += hora;
              this.projetos[i].custoTotalMinuto = minuto;
            }
          }
          
          if (this.projetos[i].apontamentos) {
            this.projetos[i].apontamentos.push(this.apontamento);
          } else {
            this.projetos[i].apontamentos =  [this.apontamento];
          }

          console.log('this.projetos : ', this.projetos[i]);
          let row = new Array();
          row['codigo'] = this.projetos[i].codigo;
          row['descricao'] = this.projetos[i].descricao;
          row['cliente'] = this.projetos[i].cliente;
          row['data'] = this.apontamento.data;
          if (this.apontamento.custo) {
            row['hhmm'] = 
            ((this.apontamento.custo.hora > 9 ? "" + this.apontamento.custo.hora.toFixed(0) : "0" + this.apontamento.custo.hora.toFixed(0)) + ':' 
            + (this.apontamento.custo.minuto > 9 ? "" + this.apontamento.custo.minuto.toFixed(0) : "0" + this.apontamento.custo.minuto.toFixed(0)));
          }
          row['despesa'] = this.apontamento.despesa;
          row['valor'] = this.apontamento.valor;
          if (this.projetos[i].custoTotalHora || this.projetos[i].custoTotalMinuto) {  
            row['totalHora'] = (this.projetos[i].custoTotalHora + ':' + (this.projetos[i].custoTotalMinuto > 9 ? "" + this.projetos[i].custoTotalMinuto.toFixed(0) : "0" + this.projetos[i].custoTotalMinuto.toFixed(0)) );       
          }
          row['valorTotalDespesa'] = this.projetos[i].valorTotalDespesa;
          this.data.push(row);
          this.apontamento = '';
        }
        this.transactions = this.projetos;
      },
      (err) => {
        console.log('Algum erro ocorreu obtendo apontamentos de projetos ', err);
        throw err;
      }
    )
  }

  buildReport() {
    console.log('ReportApptProjectComponent > montarRelatorio()');
    for (let i = 0; i < this.data.length; i++) {
      let cod = Object(this.data[i]).codigo;
      for (let j = 0; j < this.projetos.length; j++) {
        if (cod === this.projetos[j].codigo) {
          Object(this.data[i]).cliente = this.projetos[j].cliente;
          break
        }
      }
      let dt = new Date(Object(this.data[i]).data);
      let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
      if (Object.prototype.toString.call(dt) === "[object Date]") {
        if (isNaN(dt.getTime())) {
          Object(this.data[i]).data = '';
        } else {
          Object(this.data[i]).data = dt.toLocaleDateString('pt-BR', options);
        }
      } else {
          Object(this.data[i]).data = '';
      }
    }
    this.exportAsXLSX();
  }

  exportAsXLSX():void {
    console.log('ReportApptProjectComponent > exportAsXLSX()');
    this._excelService.exportAsExcelFile(this.data, 'rel_apt_por_projeto');
 }


}