import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatTableDataSource, MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatPaginator, MatSort } from '@angular/material';
import { ProjectService } from 'src/app/project/project.service';
import { UserService } from 'src/app/user/user.service';
import { User } from '../..//user/user';

export interface ApptData {
  codigo: string;
  descricao: string;
  inicio: string;
  acao: string;
}

@Component({
  selector: 'appt-list-time',
  templateUrl: './appt-list-time.component.html',
  styleUrls: ['./appt-list-time.component.css']
})
export class ApptListTimeComponent implements OnInit {

  displayedColumns: string[] = ['codigo', 'descricao', 'inicio', 'acao'];
  dataSource: MatTableDataSource<ApptData>;

  @ViewChild(MatPaginator,  {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort,  {static: true}) sort: MatSort;

  user: User;
  projeto: any;

  apontamentos = [{
    id: "", 
    project_id: "",
    usuario: "",
    codigo: "",
    descricao: "",
    inicio: "",
    acao: ""
  }] 
  

  
  constructor(
    private _projectService: ProjectService,
    private _userService: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    console.log('ApptListTimeComponent > ngOnInit() ');

    this.user = this._userService.getUserLoggedIn();
    this.getListAppt();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {

      this.dataSource.paginator.firstPage();
    }
  }

  getListAppt(){
    console.log('ApptListTimeComponent > getListAppt(',this.user,')');

    const apontObservable = this._projectService.getApptTimeUser(this.user.user_id);
    apontObservable.subscribe(
      (apontamentos) => {
        this.apontamentos = apontamentos.json();

        for (var i = 0; i < this.apontamentos.length; i++) {
          this.getProject(this.apontamentos[i].project_id, i);

        } 

        this.dataSource = new MatTableDataSource(this.apontamentos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      },
      (err) => { },
        () => { }
    )
  }

  getProject(id, i) {
    console.log('ApptListTimeComponent > getProject()');
    const observable = this._projectService.getProjectByPk(id);
    observable.subscribe(
      (response) => {
        this.projeto = response.json();
        this.apontamentos[i].descricao = this.projeto[0].descricao;
        this.apontamentos[i].codigo = this.projeto[0].codigo;
      },
      (err) => { },
        () => { }
    )
  }

  openDialog(projeto): void {
    console.log('ApptListTimeComponent > openDialog()');
    let dialogRef = this.dialog.open(DialogApptTime, {
      width: '350px',

      data: {
        id: projeto.id,
        codigo: projeto.codigo,
        descricao: projeto.descricao,
        inicio: projeto.inicio,
        fim: new Date(),
        usuario: this.user
      }
    });

    dialogRef.afterClosed().subscribe(res => {
        console.log('The dialog was closed');
        this.getListAppt();
    });
  }

}


@Component({
  selector: 'app-popup',
  templateUrl: '../popup/popup.component.html',
  styleUrls: ['../popup/popup.component.css']
})

export class DialogApptTime {

  constructor(private _projectService: ProjectService, 
    public dialogRef: MatDialogRef<DialogApptTime>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  closeAppt(data) {
    console.log('DialogApptTime >  closeAppt(data) ');
    const dialogObservable = this._projectService.closeAppt(data);
    dialogObservable.subscribe(
      (res) => { 
        console.log('The dialog called encerrar apontamento!');
        this.dialogRef.close();
      },
      (err) => {
        console.log('Algum erro ocorreu encerrando apontamento ', err);
        throw err;
      }
    )
  }

}