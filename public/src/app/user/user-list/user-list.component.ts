import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { UserService } from '../user.service';

export interface UserData {
  id: string;
  nome: string;
  sobrenome: string;
  email: string;
  funcao: string;
  custo_hora: string,
  admin: string
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userLogged = {
    email: '',
    admin: false
  }
  users: any;
  frontPath:string = "../../assets/svg/baseline-how.svg";
  backPath:string =  "";

  displayedColumns: string[] = ['admin', 'nome', 'sobrenome', 'email', 'funcao', 'custo_hora',  'acao1', 'acao2' ];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor( private _userService: UserService ) { }

  ngOnInit() {
    console.log('UserListComponent > ngOnInit()');
    this.userLogged = this._userService.getUserLoggedIn();
    this.getListUser();
  }

  getListUser() {
    console.log('UserListComponent > getListUser()')
    const userObservable = this._userService.getListUser();
    userObservable.subscribe(
      (user) => { 
        this.users = user.json();
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {console.log('Something wrong:', err) },
        () => { }
    )
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
