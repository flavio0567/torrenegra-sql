// ===== Model Client.model.js ======
// ===== date: 2019-11-04      ======

const { Model, DataTypes } = require('sequelize');

// define client class Model
class Client extends Model {
    static init(sequelize) {
        super.init({
            cnpj: { 
                type    : DataTypes.INTEGER,
                notEmpty: true,
                validate: {
                    isUnique: function (value, next) {
                        var client = Client.findAll({where: {cnpj: value}})
                            .then(function (client) {
                                if (client.length > 0) {
                                    return next('Cnpj já em uso!');
                                }
                                return next();
                            })
                            .catch(function (err) {
                                return next(err);
                            });
                    }
                } 
            }, 
            razao_social: {  
                type    : DataTypes.STRING,
                notEmpty: true, 
                validate: { 
                    len: { min: [3], msg: "Tamanho do campo deve no mínimo 3 caracteres." },
                    fn: function(val) {
                       if (val == null) throw new Error("Razão Social do cliente é requerida.")
                    }
                }
            },      
            nome_fantasia: {
                type    : DataTypes.STRING,
                notNull : true,
                validate: { 
                    len: { min: [2], msg: "Tamanho do campo deve no mínimo 2 caracteres." },
                      fn: function(val) {
                          if (val == null) throw new Error("Nome fantasia do cliente é requerida.")
                    } 
                }
            },
            valor_hh: { 
                type     : DataTypes.INTEGER,
            }, 
            prazo_pgto: { 
                type     : DataTypes.INTEGER,
            }
        }, {
            sequelize  
        })
    }

    static associate(models) {
        this.hasMany(models.Address, { foreignKey: 'cliente_id', as: 'addresses' });
        this.hasMany(models.Project, { foreignKey: 'cliente_id', as: 'projects' });
        this.hasMany(models.Contact, { foreignKey: 'cliente_id', as: 'contacts' });
    }

}

module.exports = Client;
