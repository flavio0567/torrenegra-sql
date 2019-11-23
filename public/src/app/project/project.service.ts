import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ProjectService {
  projeto: any;
  projetos: any;

  constructor(private _http: Http) { }


  getAllProjects() {
    console.log('ProjectService > getAllProjects()');
    return this._http.get('/projects');
  }
  
  createProject(project) {
    console.log('ProjectService > newProject(', project, ')');
    return this._http.post('project/new', project);
  }

  // getProjects(estados) {
  //   console.log('ProjectService > obterProjetos(', estados, ')');
  //   return this._http.post('/projects/estado', estados);
  // }

  // getProjectById(id) {
  //   console.log('ProjectService > getProjectById', id );
  //   return this._http.get('/project/' + id );
  // }

  // editProject(projeto) {
  //   console.log('ProjectService > editProject(project)' );
  //   return this._http.put('project/edit/' + projeto['_id'], projeto);
  // }

  // newAppointment(id, apontamento) {
  //   console.log('ProjectService > newAppointment(id, apontamento)' );
  //   return this._http.put('/appointment/new/' + id, apontamento);
  // }

  // getAllAppointments(id) {
  //   console.log('ProjectService > getAllAppointments' );
  //   return this._http.get('appointment/all/' + id);
  // }

  // getAppointmentTimeUser(usuario) {
  //   console.log('ProjectService > getAppointmentTimeUser(', usuario, ')' );
  //   return this._http.get('/appointments/time/user/', {params: { usuario: usuario}});
  // }

  // getAppointment(appt) {
  //   console.log('ProjectService > getAppointment(' ,appt, ')' );
  //   return this._http.post('/appointment',  appt);
  // }

  // getApptExpenseByUser(appt) {
  //   console.log('ProjectService > getApptExpenseByUser(' ,appt, ')' );
  //   return this._http.post('/appointments/expenses/', appt);
  // }

  changeSituation(id, situacao) {
    console.log('ProjectService > changeSituation(id, situacao)' );
    return this._http.put('/project/changeSituation/' + id, situacao);
  }


  // closeAppointment(projeto) {
  //   console.log('ProjectService > closeAppointment(', projeto, ')' );
  //   return this._http.put('/appointment/close/' + projeto['id'], projeto);
  // }
  
}