const { Model, DataTypes } = require('sequelize');

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

    }, {
        sequelize 
    })
  }

  static associate(models) {
    this.belongsTo(models.Client, { foreignKey: '_clienteId' })
  }
}

module.exports = Address;