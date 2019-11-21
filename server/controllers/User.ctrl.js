// ===== Conttroler User.ctrl.JS ======
// ===== date:  2019-11-12       ======
//
const User = require('../models/User.model.js');

module.exports = {
    login: function(req, res) {
        console.log("SERVER > CONTROLLER > login", req.body.user );
        let email = req.body.user;
        let pass = req.body.pass;
        User.findOne({ where: { email: email } })
            .then(user => {
                if(!user) { 
                    return res.send({
                        message: "Usuário não encontrado para o email "
                    });
                } else 
                    if (!user.validPassword(pass)) {
                        return res.send({
                            message: 'Falha na autenticação: ' + email
                        });
                    } else {
                        const result = { success: true, ativo: user.ativo, admin: user.admin }
                        res.send(result);
                    }
            })
            .catch(err => {
                if(err.kind === 'ObjectId') {
                    return res.send({
                        message: 'Usuario nao encontrado '+ email
                    });                
                }
                return res.send({
                    message: 'Erro da captura do usuario'+' : '+err
                });
        });
    },
    new: async (req, res) => { 
        console.log("SERVER > CONTROLLER > new" );
        try {
            const {
                nome,
                sobrenome,
                funcao,
                custo_hora,
                email,
                senha,
                admin,
                ativo
            } = req.body;

                const user = await User.create({ nome, sobrenome, funcao, custo_hora, email, senha, admin, ativo });
                console.log('sucesso savando usuario');
                return res.json(user);

            } 
        catch (err) {
                console.log('Ocorreu erro salvando usuario', err);
                return res.json(err);
        }

    },
    edit: (req, res) => {
        console.log("SERVER > CONTROLLER > user > edit " );
        User.findOne({ where: { id: req.body.id } })
        .then(user => {
            user.nome = req.body.nome;
            user.sobrenome = req.body.sobrenome;
            user.email = req.body.email;
            user.funcao = req.body.funcao;
            user.custo_hora = req.body.custo_hora;
            user.admin = req.body.admin;
            user
            .save()
            .then(() => {
                console.log('sucesso salvando usuario');
                res.json(result);
            })
            .catch(error => {
                console.log('Ocorreu erro salvando usuario', error);
                res.json(error);
        })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.send({
                    message: 'Usuario nao encontrado '+' : ' + email
                });                
            }
            return res.send({
                message: 'Ocorreu erro lendo cliente antes da edição', err
            });
        })
        })
    },
    register: (req, res) => {
        console.log("SERVER > CONTROLLER > user > register  ", req.body.user );
        if (!req.body.user || !req.body.senha) {
            res.json({success: false, message: 'Por favor, inforne e-mail e senha!'});
        } else {
            User.findOne({ where: { email: req.body.user } })
            .then(user => {
                if (!user.validPassword(req.body.senha)) {
                    return res.send({
                        message: 'Falha na autenticação: ' + req.body.user
                    });
                } else {
                    user.senha = user.updatePassword(req.body.novaSenha)
                    user.ativo = 'ativo';
                    user
                    .save()
                    .then(() => {
                        console.log('sucesso salvando usuario');
                        return res.json({success: true, message: 'Sucesso, usuário registrado!', result: {ativo: user.ativo, admin: user.admin}});
                    })
                    .catch(error => {
                            console.log('Ocorreu erro salvando usuario', error);
                            return res.json({success: false, message: 'Ocorreu erro salvando usuario!'});
                    })
                } 
            })
            .catch(err => {
                if(err.kind === 'ObjectId') {
                    return res.send({
                        message: 'Usuario nao encontrado '+' : ' + email
                    });                
                }
                return res.send({
                    message: 'Erro da captura do usuario'+' : '+ err
                });
            });

        }
    }, 
    list: (req, res) => {
        console.log("SERVER > CONTROLLER > user > list");
        User.findAll({
            attributes: ['id', 'admin', 'ativo', 'email', 'custo_hora', 'funcao', 'nome', 'sobrenome'],
            order: [ ['nome', 'ASC'], ], })
            .then(user => res.json(user))
            .catch(error => console.log(error));
    },
    getUserById: (req, res) => {
        console.log("SERVER > CONTROLLER > getUserById  ", req.params.id );
        User.findOne({
            attributes: ['id', 'admin', 'ativo', 'email', 'custo_hora', 'funcao', 'nome', 'sobrenome'],
            where: { id: req.params.id } })
        .then(user => res.json(user))
        .catch(error => console.log(error));
    },
    changeUserSituation: (req, res) => {
        console.log("SERVER > CONTROLLER > user > changeUserSituation" );
        User.update({ativo: req.body.ativo}, {returning: true, where: {id: req.params.id} })
            .then(user => res.json(user))
            .catch(error => console.log(error));
    }
    
}
