const { Model, DataTypes } = require('sequelize');

// define project class Model
class Project extends Model {
    static init(sequelize) {
        super.init({
            codigo: { 
                type    : DataTypes.STRING,
                notEmpty: true,
                validate: { 
                     len: { min: [7], msg: "Tamanho do campo deve ter no mínimo 7 caracteres." },
                     fn: function(val) {
                        if (val == null) throw new Error("Código do projeto é requerido")
                    }
                } 
            }, 
            descricao: {  
                type    : DataTypes.STRING,
                notEmpty: true, 
                validate: { 
                    len: { min: [3], msg: "Tamanho do campo deve ter no mínimo 3 caracteres." },
                      fn: function(val) {
                          if (val == null) throw new Error("Descrição do projeto é requerida.")
                    }
                }
            },      
            pedido: {
                type    : DataTypes.STRING,
                allowNull: false,
                validate : {
                      min: { args: [0], msg: "Pedido do projeto é requerido." },
                }
            },
            valorPedido: { 
                type     : DataTypes.DECIMAL(10, 2),
            }, 
            horasPLC: { 
                type : DataTypes.INTEGER,
                allowNull: false,
                validate : { 
                    len: { args: [8,255], msg: "Horas PLC do projeto são requeridas." },
                } 
            }, 
            horasIHM: {
                type : DataTypes.INTEGER,
            },
            valorTerceiros: {
                type     : DataTypes.DECIMAL(10, 2),
            }, 
            valorMateriais: {
                type     : DataTypes.DECIMAL(10, 2),
            }, 
            valorViagens: {
                type     : DataTypes.DECIMAL(10, 2),
            }, 
            bloquearApontamento: {     
                type        : DataTypes.BOOLEAN,
                defaultValue: false
            },
            situacao: {
                type : DataTypes.INTEGER,
            }
        }, {
            sequelize 
        })
    }

    static associate(models) {
        this.belongsTo(models.Client, { foreignKey: '_clienteId' });
        this.hasMany(models.Appointment, { foreignKey: '_projectId', as: 'appointments' });
    }
}

module.exports = Project;
