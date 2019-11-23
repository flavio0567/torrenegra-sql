// ===== Model Contact.model.js ======
// ===== date: 2019-11-22       ======

const { Model, DataTypes } = require('sequelize');

// define contact class Model
class Contact extends Model {
    static init(sequelize) {
        super.init({
            nome: { 
                type    : DataTypes.INTEGER,
                notEmpty: true,
                validate: { 
                     len: { min: [2], msg: "Tamanho do campo deve no mínimo 2 caracteres." },
                     fn: function(val) {
                        if (val == null) throw new Error("Nome do contato do cliente é requerido.")
                    }
                } 
            }, 
            email: {  
                type    : DataTypes.STRING,
            },      
            fone: {
                type     : DataTypes.INTEGER,
            },
            skype: { 
                type     : DataTypes.STRING,
            }
        }, {
            sequelize  
        })
    }

    static associate(models) {
        this.belongsTo(models.Client, { foreignKey: 'client_id' });
    }

}

module.exports = Contact;
