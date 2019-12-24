import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/user/user.service';
import { ProjectService } from 'src/app/project/project.service';
import { ClientService } from 'src/app/client/client.service';
import { ExcelService } from 'src/app/excel.service';

export interface ProjetoData {
  codigo: string;
  descricao: string;
  cliente: string;
  situacao: number;
  sitDesc: string;
  pedido: string;
  valor_pedido: string;
}

@Component({
  selector: 'app-report-project',
  templateUrl: './report-project.component.html',
  styleUrls: ['./report-project.component.css']
})
export class ReportProjectComponent implements OnInit {

  estados = new FormControl();
  estado = new Array();
  estadoList: string[] = ['0 aberto', '1 liberado', '2 finalizado', '3 faturado', '4 encerrado',  '5 cancelado'];


  displayedColumns: string[] = ['codigo', 'descricao', 'cliente', 'situacao', 'pedido',  'valor_pedido'];
  dataSource: MatTableDataSource<ProjetoData>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  userLogged = {
    name: '',
    admin: ''
  }

  projetos: any[];

  cliente = {
    id: "",
    nome_fantasia: ""
  }

  data : Array<object> = [];
  
  constructor(
    private _userService: UserService,
    private _projectService: ProjectService,
    private _clientcService: ClientService,
    private _excelService: ExcelService
  ) { } 

  ngOnInit() {
    console.log('ReportProjectComponent > ngOnInit()');
    this.userLogged = this._userService.getUserLoggedIn();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getProjects() {
    console.log('ReportProjectComponent > getProjects()' );
    this.estado = new Array();
    for (var i=0; i<this.estados.value.length; i++) {
      var str = this.estados.value[i].toString().split(" ");
      this.estado.push(parseInt(str[0]));
    }
    const projetoObservable = this._projectService.getProjectsEstado(this.estado);
    projetoObservable.subscribe(
      (projetos) => { 
        this.projetos = projetos.json();
        for (var i = 0; i < this.projetos.length; i++) {
          this.getClient(this.projetos[i].cliente_id, i);
          this.getSituacao(this.projetos[i].situacao, i);
        }
        this.dataSource = new MatTableDataSource(this.projetos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        console.log('Algum erro ocorreu obtendo lsita de projetos ', err);
        throw err;
      }
    )
  }

  getClient(id, i) {
    console.log('ReportProjectComponent > getClient()')
    const clienteObservable = this._clientcService.getClientByPk(id);
    clienteObservable.subscribe(
      (cliente) => { 
        this.cliente = cliente.json();
        this.projetos[i].cliente = this.cliente[0].nome_fantasia;
      },
      (err) => {
        console.log('Algum erro ocorreu obtendo cliente ', err);
        throw err;
      }
    )
  }

  getSituacao(situacao, i) {
    console.log('ReportProjectComponent > getSituacao()');
    switch (this.projetos[i].situacao) {
      case 0:
        this.projetos[i].sitDesc = 'aberto';
        break;
      case 1:
        this.projetos[i].sitDesc = 'liberado';
        break;
      case 2:
        this.projetos[i].sitDesc = 'finalizado';
        break;
      case 3:
        this.projetos[i].sitDesc = 'faturado';
        break;
      case 4:
        this.projetos[i].sitDesc = 'encerrado';
        break;
      case 5:
        this.projetos[i].sitDesc = 'cancelado';
        break;
      default:
        this.projetos[i].sitDesc = '';
    }
  }


  buildReport() {
    console.log('ReportProjectComponent > buildReport()');
    this.data = [];
    for (let i=0 ; i < this.projetos.length; i++) {
      let row = new Array();
      row['codigo'] = this.projetos[i].codigo;
      row['descricao'] = this.projetos[i].descricao;
      row['cliente'] = this.projetos[i].cliente;
      row['situacao'] = this.projetos[i].sitDesc;
      row['pedido'] = this.projetos[i].pedido;
      row['valor'] = this.projetos[i].valor_pedido;
      this.data.push(row);
    }
    this.exportAsXLSX();
  }

  exportAsXLSX():void {
    console.log('ReportProjectComponent > exportAsXLSX()');
    this._excelService.exportAsExcelFile(this.data, 'rel_projetos');
 }

}