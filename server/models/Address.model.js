// ===== Model Address.model.js ======
// ===== date: 2019-11-21       ======

const { Model, DataTypes } = require('sequelize');

// define address class Model
class Address extends Model {
  static init(sequelize) {
    super.init({
        logradouro: { 
            type    : DataTypes.STRING,
            notNull : true,
            validate: { 
                fn: function(val) {
                    if (val == null) throw new Error("Logradouro é requerido.")
                } 
            }
         },
        complemento: { 
            type    : DataTypes.STRING,
         },
        cidade: { 
            type    : DataTypes.STRING,
            notNull : true,
            validate: { 
                fn: function(val) {
                    if (val == null) throw new Error("Cidade é requerida.")
                } 
            }
         },
        estado: { 
            type    : DataTypes.STRING,
            notNull : true,
            validate: { 
                fn: function(val) {
                    if (val == null) throw new Error("Estado é requerido.")
                } 
            }
         },
        cep: { 
            type    : DataTypes.INTEGER,
            notNull : true,
            validate: { 
                fn: function(val) {
                    if (val == null) throw new Error("CEP é requerido.")
                } 
            }
        }

    }, 
    {
        sequelize 
    }, 
    {
        getterMethods: 
        {
            endereco: () => {
                return this.logradouro   + ' ' + 
                        this.complemento + ' ' +
                        this.cidade      + ' ' +
                        this.estado      + ' ' +
                        this.cep 
            }
        },
        setterMethods: {     
            endereco: (addr) => {
                    this.setDataValue('logradouro', addr.logradouro);
                    this.setDataValue('complemento', addr.complemento);
                    this.setDataValue('cidade', addr.cidade);
                    this.setDataValue('estado', addr.estado);
                    this.setDataValue('cep', addr.cep);   
                }
            },
    })
  }

  static associate(models) {
    this.belongsTo(models.Client, { foreignKey: 'cliente_id' })
  }
}

module.exports = Address;