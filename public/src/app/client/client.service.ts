import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clientes: any;

  constructor(private _http: Http) { }

  getAllClients() {
    console.log('ClientService > getAllClients()');
    return this._http.get('/clients');
  }

  createClient(client) {
    console.log('ClienteService > createClient(client, address)' );
    return this._http.post('client/new', client);
  }

  getClientById(id) {
    console.log('ClientService > getClientById' );
    return this._http.get('/client/' + id );
  }

  editClient(id, cliente) {
    console.log('ClienteService > editClient(', cliente, ')' );
    return this._http.put('client/edit/' + id, cliente);
  }

  destroyClient(id) {
    console.log('ClientService > destroyClient(', id, ')' );
    return this._http.delete('client/delete/' + id);
  }


  
}

