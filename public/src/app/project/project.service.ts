import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ProjectService {
  projeto: any;
  projetos: any;

  constructor(private _http: Http) { }

  getListProjects() {
    console.log('ProjectService > getAllProjects()');
    return this._http.get('/projects');
  }
  
  createProject(project) {
    console.log('ProjectService > newProject()');
    return this._http.post('project/new', project);
  }

  // getProjects(estados) {
  //   console.log('ProjectService > obterProjetos(', estados, ')');
  //   return this._http.post('/projects/estado', estados);
  // }

  getProjectByPk(id) {
    console.log('ProjectService > getProjectByPk' );
    return this._http.get('/project/' + id );
  }

  editProject(project) {
    console.log('ProjectService > editProject(project)' );
    return this._http.put('project/edit/' + project['id'], project);
  }

  newAppt(apontamento) {
    console.log('ProjectService > newAppt()');
    return this._http.put('/appointment/new/', apontamento);
  }

  getAllProjects() {
    console.log('ProjectService > getAllAppt' );
    return this._http.get('appointments/');
  }

  getApptTimeUser(user) {
    console.log('ProjectService > getAppointmentTimeUser()' );
    return this._http.get('/appts/time/user/' + user);
  }

  // getAppointment(appt) {
  //   console.log('ProjectService > getAppointment(' ,appt, ')' );
  //   return this._http.post('/appointment',  appt);
  // }

  getApptExpense(appt) {
    console.log('ProjectService > getApptExpense()' );
    return this._http.post('/appt/expense/', appt);
  }

  changeSituation(id, situacao) {
    console.log('ProjectService > changeSituation(id, situacao)' );
    return this._http.put('/project/changeSituation/' + id, situacao);
  }

  closeAppt(projeto) {
    console.log('ProjectService > closeAppt()' );
    return this._http.put('/appointment/close/' + projeto['id'], projeto);
  }
  
}