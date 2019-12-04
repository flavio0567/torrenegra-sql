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
        user.getUserById(req, res)})

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
    
    // .put('/appointment/new/:id', (req, res) => {
    //     projeto.newAppt(req, res)})

    // .post('/obter/apontamento', (req, res) => {
    //     projeto.obterApontamento(req, res)})

    // .post('/appointments/expenses/', (req, res) => {
    //     projeto.getApptExpenseByUser(req, res)})

    // .put('/apontamento/encerrar/:id', (req, res) => {
    //     projeto.encerrarApontamento(req, res)})

    // .get('/appointments/time/user/', (req, res) => {
    //     project.getAppointmentTimeUser(req, res)})
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