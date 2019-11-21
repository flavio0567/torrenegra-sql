// ===== Model User.model.js ======
// ===== date: 2019-11-19    ======
const { Model, DataTypes } = require('sequelize');

// define appointment class Model
class Appointment extends Model {
    static init(sequelize) {
        super.init({
            tipo: { 
                type : DataTypes.STRING,
            }, 
            valorHH: {
                type: DataTypes.DECIMAL(10, 2),
              },
            hora: {
            type: DataTypes.STRING,
            }, 
            despesa: {
                type: DataTypes.STRING,
            },
        }, {
            sequelize 
        });
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: '_userId' });
        this.belongsTo(models.Project, { foreignKey: '_projectId' });
    }
}

module.exports = Appointment;
