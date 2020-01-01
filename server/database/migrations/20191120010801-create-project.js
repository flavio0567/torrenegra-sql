'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('projects', { 
      id: {
        type         : Sequelize.INTEGER,
        primaryKey   : true,
        autoIncrement: true,
        allowNull    : false,
      },
      codigo: { 
        type     : Sequelize.STRING,
        unique   : true,
        allowNull: false,
      }, 
      descricao: {  
        type     : Sequelize.STRING,
        allowNull: false,
      },      
      cliente_id: {
        type     : Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'clients', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      pedido: {  
        type     : Sequelize.STRING,
        allowNull: false,
      },    
      valor_pedido: {
        type     : Sequelize.DECIMAL(10, 2),
      },
      horas_plc: {
        type     : Sequelize.INTEGER,
        allowNull: false,
      },
      horas_ihm: {
        type     : Sequelize.INTEGER,
      },
      valor_terceiros: {
        type     : Sequelize.DECIMAL(10, 2),
      },
      valor_materiais: {
        type     : Sequelize.DECIMAL(10, 2),
      },
      valor_viagens: {
        type     : Sequelize.DECIMAL(10, 2),
      },
      bloquear_apontamento: {
        type     : Sequelize.BOOLEAN,
        defaultValue: false,
      },
      situacao: {
        type     : Sequelize.INTEGER,
        defaultValue: 0,
      },
      created_at: {
        type     : Sequelize.DATE,
        allowNull: false,
      }, 
      updated_at: {
        type     : Sequelize.DATE,
        allowNull: false,
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('projects');
  }
};
