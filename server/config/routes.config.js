// ===== ROUTES.JS ===========//
// ======date: 2019-11-12 ====//
// 
const path  = require('path');
const user  = require('../controllers/User.ctrl.js');

module.exports = function(app){
    app

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


    .all("*", (req, res) => { 
        res.sendFile(path.resolve('./public/dist/public/index.html'))})
        
}