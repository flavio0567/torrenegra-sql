import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Client } from './client';
import {Observable } from "rxjs";
import { map } from "rxjs/operators";

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

  createClient(client: Client) {
    console.log('ClientService > createClient()', client );
    return this._http.post('client/new', client);
  }

  getClientByPk(id) {
    console.log('ClientService > getClientByPk' );
    return this._http.get('/client/' + id );
  }

  editClient(id, cliente) {
    console.log('ClientService > editClient()' );
    return this._http.put('client/edit/' + id, cliente);
  }

  destroyClient(id) {
    console.log('ClientService > destroyClient(', id, ')' );
    return this._http.delete('client/delete/' + id);
  }


  
}

