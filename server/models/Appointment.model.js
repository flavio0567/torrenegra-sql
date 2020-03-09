// ===== Model Appointment.model.js ======
// ===== date: 2019-11-19           ======
const { Model, DataTypes } = require('sequelize');

// define appointment class Model
class Appointment extends Model {
    static init(sequelize) {
        super.init({
            tipo: { 
                type : DataTypes.STRING,
            }, 
            valor_hh: {
                type: DataTypes.DECIMAL(10, 2),
              },
            inicio: { 
                type: DataTypes.STRING,
            }, 
            fim: { 
                type: DataTypes.STRING,
            }, 
            descricao: { 
                type: DataTypes.STRING,
            }, 
            valor: { 
                type: DataTypes.DECIMAL(10, 2),
            }, 
            data: { 
                type: DataTypes.STRING,
            }, 
            reembolso: { 
                type: DataTypes.BOOLEAN,
            },
            feriado: { 
                type: DataTypes.BOOLEAN,
            },  
        }, {
            sequelize 
        },
        {
            getterMethods: 
            {
                hora   : () => { 
                    return this.inicio + ' ' + this.fim + ' ' + this.feriado
                },
                despesa: () => { 
                    return this.descricao + ' ' + 
                           this.valor     + ' ' + 
                           this.data      + ' ' + 
                           this.reembolso 
                }
            },
            setterMethods: {
                hora: (value) => {
                    let hh = value.split(', ')  
                    this.setDataValue('inicio', hh[0])
                    this.setDataValue('fim', hh[1])
                    this.setDataValue('feriado', hh[2])
                },
                despesa: (desp) => {
                    this.setDataValue('descricao', desp.descricao);
                    this.setDataValue('valor', desp.valor);
                    this.setDataValue('data', desp.data);
                    this.setDataValue('reembolso', desp.reembolso);
                }
            }
        });
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id' });
        this.belongsTo(models.Project, { foreignKey: 'project_id' });
    }
}

module.exports = Appointment;
