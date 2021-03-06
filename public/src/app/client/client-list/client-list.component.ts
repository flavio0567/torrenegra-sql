import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from './../client';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ClientService } from '../client.service';
import { UserService } from 'src/app/user/user.service';

export interface ClientData {
  id: string;
  nomeFantasia: string;
  valorHH: string;
  prazoPgto: string;
  nome: string,
  email: string,
  fone: number
}

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  userLogged = {
    email: '',
    admin: ''
  }
  clientes: any;
  cliente: any = new Client();

  displayedColumns: string[] =
    [
      'nome_fantasia',
      'valor_hh',
      'nome',
      'email',
      'fone',
      'acao1',
      'acao2'
    ];
  dataSource: MatTableDataSource<ClientData>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private _clientService: ClientService,
    private _userService: UserService
  ) { }

  ngOnInit() {
    console.log('ClientListComponent > ngOnInit() ' );
    this.userLogged = this._userService.getUserLoggedIn();
    this.getClients();
  }

  getClients() {
    console.log('ClientListComponent > obterClientes()')
    const clienteObservable = this._clientService.getAllClients();
    clienteObservable.subscribe(
      (client) => {
        this.clientes = client.json();
        for(let i=0;i<this.clientes.length;i++){
          for(let j=0;j<this.clientes[i].contacts.length;j++){
            if (this.clientes[i].contacts[j].main) {
              this.clientes[i].nome = this.clientes[i].contacts[j].nome;
              this.clientes[i].email = this.clientes[i].contacts[j].email;
              this.clientes[i].fone = this.clientes[i].contacts[j].fone;
              this.clientes[i].skype = this.clientes[i].contacts[j].skype;
            }
          }
        }
        this.dataSource = new MatTableDataSource(this.clientes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        console.log('Algum erro ocorreu obtendo cliente ', err);
        throw err;
      }
    )
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
