import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/project/project.service';
import { UserService } from 'src/app/user/user.service';
import { ClientService } from 'src/app/client/client.service';
import { ExcelService } from 'src/app/excel.service';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

export interface Transaction {
  codigo: string;
  cliente: string;
  despesa: string;
  valor: number;
  data: string;
  reembolso: boolean;
}

export function getProject(projetos, id) {
  for (var i = 0 ; i < projetos.length; i++){
    if (projetos[i].id === id) {
      return projetos[i];
    }
  }
}

@Component({
  selector: 'app-report-appt-expense-user',
  templateUrl: './report-appt-expense-user.component.html',
  styleUrls: ['./report-appt-expense-user.component.css']
})
export class ReportApptExpenseUserComponent implements OnInit {


  displayedColumns: string[] = ['codigo', 'cliente', 'despesa', 'valor', 'data', 'reembolso'];
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
    despesa: string,
    valor: number,
    data: string,
    reembolso: boolean
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
    private _excelService: ExcelService,
    iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer
  ) { 
    this.options = fb.group({
      project_id: [null],
      user_id: [null],
      inicio: new Date(),
      fim: new Date(),
      tipo: 'despesa'
    });
    iconRegistry.addSvgIcon(
      'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/thumbup-icon.svg'));
  }

  ngOnInit() {
    this.userLogged = this._userService.getUserLoggedIn();
    console.log('ReportApptExpenseUserComponent > userLogged ')
    this.getListUser();
    this.getListProjects();
  }

  get reembolso() {
    return this.options.get('reembolso');
  }

  getListUser() {
    console.log('ReportApptExpenseUserComponent > getListUser()')
    this._userService.getListUser()
    .subscribe(
      (users) => { 
        this.usuarios = users.json();
      },
      (err) => {
        console.log('Algum erro ocorreu obtendo lista de usuario ', err);
        throw err;
      }
    )
  }

  getListProjects() {
    console.log('ReportApptExpenseUserComponent > getListProjects()')
    this._projectService.getProjectsEstado(this.estados)
    .subscribe(
      (projects) => { 
        this.projetos = projects.json();
      },
      (err) => {
        console.log('Algum erro ocorreu obtendo lista de projetos ', err);
        throw err;
      }
    )
  }

  getAppts() {
    console.log('ReportApptExpenseUserComponent > getAppts');
    this._projectService.getApptExpense(this.options.value)
    .subscribe(
      (apontamentos) => { 
        this.apontamentos = apontamentos.json();
        for (let a of this.apontamentos) {
          a.valor = a.valor;
          this.projeto = getProject(this.projetos, a.project_id);
          a.codigo = this.projeto.codigo;  
          this._clientService.getClientByPk(this.projeto.cliente_id)
          .subscribe(
            (cliente) => { 
              this.cliente = cliente.json();
              a.cliente = this.cliente[0].nome_fantasia;
            },
            (err) => {
              console.log('Algum erro ocorreu obtendo cliente de apontamentos de projeto ', err);
              throw err;
            }
          )
        }
        this.transactions = this.apontamentos;
        this.selected = true;
      },
      (err) => {
        console.log('Algum erro ocorreu obtendo lista de apontamentos de projeto ', err);
        throw err;
      }
    )
  }

  getTotalCost() {
    return this.transactions.map(t => t.valor).reduce((acc, value) => acc + value, 0);
  }

  montarRelatorio() {
    console.log('ReportApptExpenseUserComponent > montarRelatorio()');
    this.data = [];
    let total;
    for (let i=0 ; i < this.apontamentos.length; i++) {
      let row = new Array();
      row['codigo'] = this.apontamentos[i].codigo;
      row['cliente'] = this.apontamentos[i].cliente;
      row['despesa'] = this.apontamentos[i].descricao;
      row['valor'] = this.apontamentos[i].valor;
      let dt = new Date(this.apontamentos[i].data);
      let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      row['data'] = dt.toLocaleDateString('pt-BR', options);
      total = this.transactions.map(t => t.valor).reduce((acc, value) => acc + value, 0);
      this.apontamentos[i].reembolso? row['reembolso'] = 'sim' : row['reembolso'] = '';
      this.data.push(row);
    }
    this.data.push({'total': total});
    this.exportAsXLSX();
  }

  exportAsXLSX():void {
    console.log('ReportApptExpenseUserComponent > exportAsXLSX()');
    this._excelService.exportAsExcelFile(this.data, 'rel_apt_despesa_por_usuario');
 }

}