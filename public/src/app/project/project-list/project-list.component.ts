import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { UserService } from '../../user/user.service';
import { ProjectService } from '../project.service';
import { ClientService } from '../../client/client.service';

export interface ProjectData {
  codigo: string;
  descricao: string;
  cliente: string;
  pedido: string;
  situacao: number;
  sit_desc: string;
  acao: string;
}

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  displayedColumns: string[] = ['codigo', 'descricao', 'cliente', 'pedido', 'situacao', 'acao1', 'acao2'];
  dataSource: MatTableDataSource<ProjectData>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  userLogged = {
    email: '',
    admin: ''
  }
  projetos = [{
    id: "",
    codigo: "",
    descricao: "",
    cliente_id: "",
    cliente: "",
    pedido: "",
    situacao: 0,
    sit_desc: "",
    acao: "" 
  }];
  cliente = {
    id: "",
    cnpj: 0,
    razao_social: "",
    nome_fantasia: "",
    endereco: "",
    valor_hh: "",
    prazoPgto: "",
    contatos:  [{ 
      nome: "",
      email: "",
      telefone: 0,
      skype: ""}]
  }

  constructor(
    private _userService: UserService,
    private _projectService: ProjectService,
    private _clientService: ClientService,
    public dialog: MatDialog
  ) { } 

  ngOnInit() {
    console.log('ProjectListComponent > ngOnInit() ');
    this.userLogged = this._userService.getUserLoggedIn();
    this.getListProject();
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  getListProject() {
    console.log('ProjectListComponent > getListProject()')
    const projectObservable = this._projectService.getListProjects();
    projectObservable.subscribe(
      (projects) => { 
        this.projetos = projects.json();
        for (var i = 0; i < this.projetos.length; i++) {
          this.getClient(this.projetos[i].cliente_id, i);
          this.getSituation(this.projetos[i].situacao, i);
        }
        this.dataSource = new MatTableDataSource(this.projetos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        console.log('Algum erro ocorreu obtendo lista projetos ', err);
        throw err;
      }
    )
  }

  getClient(id, i) {
    console.log('ProjectListComponent > obterCliente()')
    const clientObservable = this._clientService.getClientByPk(id);
    clientObservable.subscribe(
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

  getSituation(situacao, i) {
    console.log('ProjectListComponent > getSituation()');
    switch (this.projetos[i].situacao) {
      case 0:
        this.projetos[i].sit_desc = 'aberto';
        break;
      case 1:
        this.projetos[i].sit_desc = 'liberado';
        break;
      case 2:
        this.projetos[i].sit_desc = 'finalizado';
        break;
      case 3:
        this.projetos[i].sit_desc = 'faturado';
        break;
      case 4:
        this.projetos[i].sit_desc = 'encerrado';
        break;
      case 5:
        this.projetos[i].sit_desc = 'cancelado';
        break;
      default:
        this.projetos[i].sit_desc = '';
    }
  }


  openDialog(projeto): void {
    console.log('ProjectListComponent > openDialog() ')
    let dialogRef = this.dialog.open(DialogProject, {
      width: '450px',
      data: {
        id: projeto.id,
        codigo: projeto.codigo,
        descricao: projeto.descricao,
        usuario: this.userLogged,
        situacao: projeto.sit_desc
      }
    });

    dialogRef.afterClosed().subscribe(res => {
        console.log('The dialog was closed');
        this.getListProject();
    });
  }

}

export interface Situacao {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-popup',
  templateUrl: '../popup/popup.component.html',
  styleUrls: ['../popup/popup.component.css']
})

export class DialogProject {
  selectedValue: number;
  situacoes: Situacao[] = [
    {value: 1, viewValue: '1-liberado'},
    {value: 2, viewValue: '2-finalizado'},
    {value: 3, viewValue: '3-faturado'},
    {value: 4, viewValue: '4-encerrado'},
    {value: 5, viewValue: '5-cancelado'}
  ];

  constructor(private _projectService: ProjectService, 
    public dialogRef: MatDialogRef<DialogProject>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  changeSituation(id) {
    console.log('DialogProjeto >  mudarSituacao(id) ')
    const dialogObservable = this._projectService.changeSituation(id, this.selectedValue);
    dialogObservable.subscribe(
      (res) => { 
        console.log('The dialog called encerrar projeto!', res);
        this.dialogRef.close();
      },
      (err) => {
        console.log('Algum erro ocorreu mudando situacao projeto ', err);
        throw err;
      }
    )
  }

}