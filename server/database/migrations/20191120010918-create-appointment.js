'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('appointments', { 
      id: {
        type         : Sequelize.INTEGER,
        primaryKey   : true,
        autoIncrement: true,
        allowNull    : false,
      },
      _userId: {  
        type      : Sequelize.INTEGER,
        allowNull : false,
        references: { model: 'users', key: 'id' },
        onUpdate  : 'CASCADE',
        onDelete  : 'CASCADE',
      },      
      _projectId  : {
        type      : Sequelize.INTEGER,
        allowNull : false,
        references: { model: 'projects', key: 'id' },
        onUpdate  : 'CASCADE',
        onDelete  : 'CASCADE',
      },
      tipo: { 
        type : Sequelize.STRING,
      }, 
      valorHH: {
        type: Sequelize.DECIMAL(10, 2),
      },
      inicio: { 
        type: Sequelize.STRING,
      }, 
      fim: { 
        type: Sequelize.STRING,
      },
      hora: {
        type: Sequelize.STRING,
        get() {
              return this.inicio + ' ' + 
                     this.fim },
        set(hora) {
          this.setDataValue('inicio', hora.inicio);
          this.setDataValue('fim', hora.fim);  
        }
      }, 
      descricao: { 
        type   : Sequelize.STRING,
      }, 
      valor: { 
        type: Sequelize.DECIMAL(10, 2),
      }, 
      data: { 
        type: Sequelize.STRING,
      }, 
      reembolso: { 
        type   : Sequelize.BOOLEAN,
      }, 
      despesa: {
        type: Sequelize.STRING,
        get() {
              return this.descricao + ' ' + 
                     this.valor + ' ' +
                     this.data + ' ' +
                     this.reembolso },
        set(desp) {
          this.setDataValue('descricao', desp.descricao);
          this.setDataValue('valor', desp.valor);
          this.setDataValue('data', desp.data);
          this.setDataValue('reembolso', desp.reembolso);  
        }
      },
      created_at: {
        type     : Sequelize.DATE,
        allowNull: false,
      }, 
      updated_at: {
        type    : Sequelize.DATE,
        allowNull: false,
      }, 
    });
    },
  
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('appointments');
    }
  };
