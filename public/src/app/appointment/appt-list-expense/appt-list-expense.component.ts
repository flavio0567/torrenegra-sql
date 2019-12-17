import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { UserService } from 'src/app/user/user.service';
import { ProjectService } from 'src/app/project/project.service';
import { UserLogged } from 'src/app/login/userLogged';

export interface ApptData {
  codigo: string;
  desc_proj: string;
  descricao: string;
  valor: string;
  data: string
}

export function AddDays(date, amount) {
  var tzOff = date.getTimezoneOffset() * 60 * 1000,
      t = date.getTime(),
      d = new Date(),
      tzOff2;

  t += (1000 * 60 * 60 * 24) * amount;
  d.setTime(t);
  tzOff2 = d.getTimezoneOffset() * 60 * 1000;
  if (tzOff != tzOff2) {
    var diff = tzOff2 - tzOff;
    t += diff;
    d.setTime(t);
  }
  return d;
}

@Component({
  selector: 'appt-list-expense',
  templateUrl: './appt-list-expense.component.html',
  styleUrls: ['./appt-list-expense.component.css']
})
export class ApptListExpenseComponent implements OnInit {

  displayedColumns: string[] = ['codigo', 'desc_proj', 'descricao', 'valor', 'data'];
  dataSource: MatTableDataSource<ApptData>;

  @ViewChild(MatPaginator,  {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort,  {static: true}) sort: MatSort;

  userLogged = new UserLogged();

  apontamentos = [{
    codigo: "",
    desc_proj: "",
    descricao: "",
    valor: "",
    data: "",
    project_id: ""
  }] 

  today = AddDays(new Date(),-1);
  tomorrow = AddDays(new Date(), 1);
  appt = {
    user_id: '',
    data1: this.today,
    data2: this.tomorrow,
    tipo: 'despesa'
  }

  projeto: any;
  
  constructor(
    private _projectService: ProjectService,
    private _userService: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    console.log('ApptListExpenseComponent > ngOnInit()');
    this.userLogged = this._userService.getUserLoggedIn();
    this.getListAppt();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getListAppt(){
    console.log('ApptListExpenseComponent > getListAppt()');
    this.appt.user_id = this.userLogged.user_id;
    const observable = this._projectService.getApptExpense(this.appt);
    observable.subscribe(
      (appts) => {
        this.apontamentos = appts.json();
        for (var i = 0; i < this.apontamentos.length; i++) {
          this.getProject(this.apontamentos[i].project_id, i);
        } 
        this.dataSource = new MatTableDataSource(this.apontamentos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        console.log('Algum erro ocorreu obtendo lista de apontamentos despesa ', err);
        throw err;
      }
    )
  }

  getProject(id, i) {
    console.log('ApptListExpenseComponent > obterProjeto()');
    const observable = this._projectService.getProjectByPk(id);
    observable.subscribe(
      (response) => {
        this.projeto = response.json();
        this.apontamentos[i].codigo = this.projeto[0].codigo;
        this.apontamentos[i].desc_proj = this.projeto[0].descricao;
      },
      (err) => {
        console.log('Algum erro ocorreu obtendo projectByPk ', err);
        throw err;
      }
    )
  }
}