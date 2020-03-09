// ===== Model User.model.js ======
// ===== date: 2019-11-04    ======

const { Model, DataTypes } = require('sequelize');
const Promise              = require("bluebird");
const bcrypt               = Promise.promisifyAll(require('bcrypt'));

// define user class Model
class User extends Model {
    static init(sequelize) {
        super.init({
            nome: { 
                type    : DataTypes.STRING,
                notEmpty: true,
                validate: { 
                     len: { args: [2,255], msg: "Nome deve estar entre 2,255 caracteres." },
                     fn: function(val) {
                        if (val == null) throw new Error("Nome do usuário é requerido")
                    }
                } 
            }, 
            sobrenome: {  
                type    : DataTypes.STRING,
                notEmpty: true, 
                validate: { 
                     len: { args: [2,255], msg: "Sobrenome deve estar entre 2,255 caracteres." },
                      fn: function(val) {
                          if (val == null) throw new Error("Sobrenome do usuário é requerido")
                    }
                }
            },      
            funcao: {
                type    : DataTypes.STRING,
                notNull : true,
                validate: { 
                     len: { args: [4,255], msg: "Função deve estar entre 4,255 caracteres." },
                      fn: function(val) {
                          if (val == null) throw new Error("Função do usuário é requerida")
                    } 
                }
            },
            custo_hora: {
                type     : DataTypes.DECIMAL(10, 2),
                allowNull: false,
                validate : {
                      min: { args: [0], msg: "Custo Hora é requerido." },
                }
            },
            email: { 
                type     : DataTypes.STRING,
                notEmpty: true,
                validate: {
                    isUnique: function (value, next) {
                        var user = User.findAll({where: {email: value}})
                            .then(function (user) {
                                if (user.length > 0) {
                                    return next('Email já em uso!');
                                }
                                return next();
                            })
                            .catch(function (err) {
                                return next(err);
                            });
                    }
                } 
            }, 
            senha: { 
                type : DataTypes.STRING,
                allowNull: false,
                validate : { 
                    len: { args: [8,255], msg: "Senha deve estar entre 8,255 caracteres." },
                } 
            }, 
            admin: {
                type        : DataTypes.BOOLEAN,
                defaultValue: false
            },
            ativo: {
                type        : DataTypes.STRING,
                defaultValue: 'desativado'
            } 
        }, {
            sequelize 
        });
        User.addHook('beforeCreate', (user) => {
            console.log("hook: beforeCreate");
            const salt = bcrypt.genSaltSync(8);
            user.senha = bcrypt.hashSync(user.senha, salt);
        }),
        User.prototype.validPassword = function (pass) { 
            console.log("instance method: validPassword");
            return bcrypt.compareSync(pass, this.senha);
        }
        User.prototype.updatePassword = function (pass) { 
            console.log("instance method: updatePassword");
            const salt = bcrypt.genSaltSync(8);
            return bcrypt.hashSync(pass, salt);
        }
    }
    
    static associate(models) {
        models.User.hasMany(models.Appointment, { foreignKey: 'user_id', as: 'appointments' });
    }

}

module.exports = User;
