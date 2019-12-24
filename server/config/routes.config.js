// ===== ROUTES.JS ===========//
// ======date: 2019-11-12 ====//
// 
const path  = require('path');
const user  = require('../controllers/User.ctrl.js');
const project = require('../controllers/Project.ctrl.js');
const client = require('../controllers/Client.ctrl');

module.exports = function(app){
    app
// users
    .get('/users', (req, res) => {
        user.list(req, res)})

    .post('/user/new', (req, res) => {
        user.new(req, res)})

    .get('/user/show/:id', (req, res) => {
        user.getUserByPk(req, res)})

    .put('/user/edit/:id', (req, res) => {
        user.edit(req, res)})

    .post('/login/', (req, res) => {
        user.login(req, res)})

    .put('/user/register', (req, res) => {
        user.register(req, res)})

    .put('/user/changeSituation/:id', (req, res) => {
        user.changeUserSituation(req, res)})
// projects
    .get('/projects', (req, res) => {
        project.list(req, res)})

    .post('/project/new', (req, res) => {
        project.new(req, res)})
        
    .put('/project/edit/:id', (req, res) => {
        project.edit(req, res)})

    .post('/projects/estado', (req, res) => {
        project.projectsEstado(req, res)})

    .get('/project/:id', (req, res) => {
        project.getProjectByPk(req, res)})

    .put('/project/changesituation/:id', (req, res) => {
        project.changeSituationProject(req, res)})
// appointments
    // .post('/appointment', (req, res) => {
    //     projeto.getAppoitment(req, res)})
    
    .put('/appointment/new', (req, res) => {
        project.newAppt(req, res)})

    .post('/appointaments', (req, res) => {
        project.appointments(req, res)})

    .put('/appt/expense/', (req, res) => {
        project.getApptExpense(req, res)})

    .get('/appts/time/user/:id', (req, res) => {
        project.getApptTimeUser(req, res)})

    .put('/appts/list/time/user/:id', (req, res) => {
        project.getListApptTimeUser(req, res)})

    .put('/appointment/close/:id', (req, res) => {
        project.closeAppt(req, res)})

    .get('/appt/total/:id', (req, res) => {
        project.getTotalAppts(req, res)})
// client
    .get('/clients', (req, res) => {
        client.list(req, res)})

    .get('/client/:id', (req, res) => {
        client.getClientByPk(req, res)})

    .post('/client/new', (req, res) => {
        client.new(req, res)})

    .put('/client/edit/:id', (req, res) => {
        client.edit(req, res)})

    .delete('/client/delete/:id', (req, res) => {
        client.destroy(req, res)})

    .all("*", (req, res) => { 
        res.sendFile(path.resolve('./public/dist/public/index.html'))})
        
}