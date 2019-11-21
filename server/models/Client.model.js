// ===== Model User.model.js ======
// ===== date: 2019-11-04    ======

const { Model, DataTypes } = require('sequelize');

// define client class Model
class Client extends Model {
    static init(sequelize) {
        super.init({
            cnpj: { 
                type    : DataTypes.INTEGER,
                notEmpty: true,
                validate: { 
                     len: { min: [11], msg: "Tamanho do campo deve no mínimo 11 caracteres." },
                     fn: function(val) {
                        if (val == null) throw new Error("CNPJ do cliente é requerido.")
                    }
                } 
            }, 
            razaoSocial: {  
                type    : DataTypes.STRING,
                notEmpty: true, 
                validate: { 
                    len: { min: [3], msg: "Tamanho do campo deve no mínimo 3 caracteres." },
                    fn: function(val) {
                       if (val == null) throw new Error("Razão Social do cliente é requerida.")
                    }
                }
            },      
            nomeFantasia: {
                type    : DataTypes.STRING,
                notNull : true,
                validate: { 
                    len: { min: [2], msg: "Tamanho do campo deve no mínimo 2 caracteres." },
                      fn: function(val) {
                          if (val == null) throw new Error("Nome fantasia do cliente é requerida.")
                    } 
                }
            },
            valorHH: { 
                type     : DataTypes.INTEGER,
            }, 
            prazoPgto: { 
                type     : DataTypes.INTEGER,
            },
            contatos: {
                type     : DataTypes.ARRAY(DataTypes.STRING),
            }
        }, {
            sequelize  
        })
    }

    static associate(models) {
        this.hasMany(models.Address, { foreignKey: '_clienteId', as: 'addresses' });
        this.hasMany(models.Project, { foreignKey: '_clienteId', as: 'projects' });
    }

}

module.exports = Client;
