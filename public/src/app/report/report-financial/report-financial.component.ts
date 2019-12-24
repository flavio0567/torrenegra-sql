import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { UserService } from 'src/app/user/user.service';
import { ProjectService } from 'src/app/project/project.service';
import { ClientService } from 'src/app/client/client.service';
import { ExcelService } from 'src/app/excel.service';

export interface Transaction {
  codigo: string;
  descricao: string;
  cliente: string;
  custo: number;
  despesa: number;
}

@Component({
  selector: 'app-report-financial',
  templateUrl: './report-financial.component.html',
  styleUrls: ['./report-financial.component.css']
})
export class ReportFinancialComponent implements OnInit {

 
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  displayedColumns: string[] = ['codigo', 'descricao', 'cliente', 'custo', 'despesa', 'total'];
  dataSource: MatTableDataSource<Transaction>;

  row: any[];
  data : Array<object> = [];

  projetos: [{
    id: string,
    codigo: string,
    descricao: string,
    cliente_id: string,
    cliente: string,
    custo: number,
    despesa: number,
    total: number;
  }];
  userLogged = {
    name: '',
    admin: ''
  };
  cliente = {
    id: "",
    nome_fantasia: ""
  };
  estados: any[] = [0, 1, 2, 3];
  // nomeCliente: any;
  usuario: any;
  apontamentos: any;

  constructor(
    private _userService: UserService,
    private _projectService: ProjectService,
    private _clientService: ClientService,
    private _excelService: ExcelService
  ) { } 

  ngOnInit() {
    console.log('ReportFinancialComponent > ngOnInit() ')
    this.userLogged = this._userService.getUserLoggedIn();
    this.getProjects();
  }

  getProjects() {
    console.log('ReportFinancialComponent > getProjects()')
    const projetoObservable = this._projectService.getProjectsEstado(this.estados);
    projetoObservable.subscribe(projetos => {
      this.projetos = projetos.json();
      for (let i = 0; i < this.projetos.length; i++) {
        this.getClient(this.projetos[i]['cliente_id'], i);
        this.getAppts(this.projetos[i]['id'], i);
        }
      },
      (err) => {
        console.log('Algum erro ocorreu obtendo lista de projetos ', err);
        throw err;
      }
    )
  }

  getClient(id, i) {
    console.log('ReportFinancialComponent > getClient()');
    this._clientService.getClientByPk(id)
      .subscribe(cliente => { 
        this.cliente = cliente.json();
        this.projetos[i]['cliente'] = this.cliente[0].nome_fantasia;
      },
      (err) => {
        console.log('Algum erro ocorreu obtendo cliente de projeto ', err);
        throw err;
      }
    )
  }

  async getAppts(id, i) {
    console.log('ReportFinancialComponent > getAppts', id, i);
    let valorDespesa = 0;
    let custoTotal = 0;
    await this._projectService.getTotalAppts(id)
    .subscribe(async apontamentos => { 
        this.apontamentos = apontamentos.json();
        for (let j=0 ; j < this.apontamentos.length; j++) {
          if(this.apontamentos[j].tipo === 'hora' && this.apontamentos[j].fim) {
            let fim = new Date(this.apontamentos[j].fim).getTime();
            let inicio = new Date(this.apontamentos[j].inicio).getTime();
            let diff = Math.ceil( fim - inicio )/(1000 * 60 * 60)
            custoTotal += (this.apontamentos[j].valor_hh * diff);
          } else {
            valorDespesa +=  this.apontamentos[j].valor; 
          }
        }

        this.projetos[i]['despesa'] = valorDespesa;
        this.projetos[i]['custo'] = custoTotal;
        this.projetos[i]['total'] = (this.projetos[i]['custo'] || 0) + (this.projetos[i]['despesa'] || 0); 

        this.dataSource = new MatTableDataSource(this.projetos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        console.log('Algum erro ocorreu obtendo apontamentos de projetos ', err);
        throw err;
      }
    )
  }

buildReport() {
  console.log('ReportFinancialComponent > buildReport()');
  for (let i = 0; i < this.projetos.length; i++) {
    this.row = new Array();
    this.row['codigo'] = this.projetos[i]['codigo'];
    this.row['descricao'] = this.projetos[i]['descricao'];
    this.row['cliente'] = this.projetos[i]['cliente'];
    this.row['custo'] = this.projetos[i]['custo'];
    this.row['despesa'] = this.projetos[i]['despesa'];
    this.row['total'] = (this.projetos[i]['custo'] || 0) + (this.projetos[i]['despesa'] || 0); 
    this.data.push(this.row);
  }
  this.exportAsXLSX();
}

  exportAsXLSX():void {
    console.log('ReportFinancialComponent > exportAsXLSX()');
    this._excelService.exportAsExcelFile(this.data, 'rel_financeiro');
  }

}