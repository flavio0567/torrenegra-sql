// ===== Model Project.model.js ======
// ===== date: 2019-11-21       ======

const { Model, DataTypes } = require('sequelize');

// define project class Model
class Project extends Model {
    static init(sequelize) {
        super.init({
            codigo: { 
                type    : DataTypes.STRING,
                notEmpty: true,
                validate: { 
                     len: { min: [7], msg: "Codigo deve ter no mínimo 7 caracteres." },
                     fn: function(val) {
                        if (val == null) throw new Error("Código do projeto é requerido")
                    }
                } 
            }, 
            descricao: {  
                type    : DataTypes.STRING,
                notEmpty: true, 
                validate: { 
                    len: { min: [3], msg: "Descrição deve ter no mínimo 3 caracteres." },
                      fn: function(val) {
                          if (val == null) throw new Error("Descrição do projeto é requerida.")
                    }
                }
            },      
            pedido: {
                type : DataTypes.STRING,
                allowNull: false,
                validate : {
                      min: { args: [0], msg: "Pedido do projeto é requerido." },
                }
            },
            valor_pedido: { 
                type : DataTypes.DECIMAL(10, 2),
            }, 
            horas_plc: { 
                type : DataTypes.INTEGER,
                allowNull: false,
                validate : { 
                    min: { args: [8], msg: "Horas PLC devem ser >= 8." },
                    fn: function(val) {
                        if (val == null) throw new Error("Horas PLC do projeto são requeridas.")}
                } 
            }, 
            horas_ihm: {
                type : DataTypes.INTEGER,
            },
            valor_terceiros: {
                type : DataTypes.DECIMAL(10, 2),
            }, 
            valor_materiais: {
                type : DataTypes.DECIMAL(10, 2),
            }, 
            valor_viagens: {
                type : DataTypes.DECIMAL(10, 2),
            }, 
            bloquear_apontamento: {     
                type : DataTypes.BOOLEAN,
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
        this.belongsTo(models.Client, { foreignKey: 'cliente_id'});
        this.hasMany(models.Appointment, { foreignKey: 'project_id', as: 'appointments' });
    }
}

module.exports = Project;
