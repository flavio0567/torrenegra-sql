import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import { ClientService } from '../client.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-client-show',
  templateUrl: './client-show.component.html',
  styleUrls: ['./client-show.component.css']
})

export class ClientShowComponent implements OnInit {
  userLogged = {
    email: '',
    admin: ''
  }
  cliente: any;
  errors: any;

  constructor(
    private _userService: UserService,
    private _clientService: ClientService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    console.log('ClientShowComponent > ngOnInit() ');
    this.userLogged = this._userService.getUserLoggedIn();
    this.getClient(this._route.snapshot.params['id']);
  }
  
  getClient(id) {
    console.log('ClientShowComponent > getClient'); 
      const observable = this._clientService.getClientByPk(id);
      observable.subscribe(
        (response) => {
          this.cliente = response.json();
        },
        (err) => {
          console.log('Algum erro ocorreu obtendo cliente ', err);
          throw err;
        }
      )
  }

  destroyClient() {
    console.log('ClientShowComponent > destroyClient'); 
    const observable = this._clientService.destroyClient(this.cliente[0].id);
    observable.subscribe(
      (response) => {
        this.cliente = response.json();
        this._router.navigate(['/clients']);
      },
      (err) => {
        console.log('Algum erro ocorreu excluindo cliente ', err);
        throw err;
      }
    )
  } 
  //   if (!this.cliente.clienteProjetos[0]) {
  //     console.log('Cliente excludio com sucesso!');
  //     const observable = this._clientService.destroyClient(this.cliente[0].id);
  //     observable.subscribe(
  //       (response) => {
  //         this.cliente = response.json();
  //         this._router.navigate(['/clients']);
  //       },
  //       (err) => {
  //         console.log('Algum erro ocorreu excluindo cliente ', err);
  //         throw err;
  //       }
  //     ) 
  //   } else {
  //     console.log('Cliente nao excluido!'); 
  //     this.errors = this.cliente.clienteProjetos
  //   }
    
  // }

  cancel() {
    this._router.navigate(['/clients']);
  }
}