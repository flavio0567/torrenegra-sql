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

  getProjectsEstado(estados) {
    console.log('ProjectService > getProjectsEstado()');
    return this._http.post('/projects/estado', estados);
  }

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
    console.log('ProjectService > getAppointmentTimeUser() - ApptTimeUser report' );
    return this._http.get('/appts/time/user/' + user);
  }

  getListApptTimeUser(id, project) {
    console.log('ProjectService > getListApptUser() - ApptTimeUser report' );
    return this._http.put('/appts/list/time/user/'+ id, project);
  }

  getApptExpense(appt) {
    console.log('ProjectService > getApptExpense() - ApptExpense report/List Appt' );
    return this._http.put('/appt/expense/', appt);
  }

  getTotalAppts(id) {
    console.log('ProjetoService > getTotalAppts - Financial report' );
    return this._http.get('appt/total/' + id);
  }

  changeSituation(id, situacao) {
    console.log('ProjectService > changeSituation() - ListProject' );
    return this._http.put('/project/changeSituation/' + id, situacao);
  }

  closeAppt(projeto) {
    console.log('ProjectService > closeAppt()' );
    return this._http.put('/appointment/close/' + projeto['id'], projeto);
  }
  
}