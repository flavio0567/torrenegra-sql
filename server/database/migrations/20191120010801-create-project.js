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
        allowNull: false,
      }, 
      descricao: {  
        type     : Sequelize.STRING,
        allowNull: false,
      },      
      _clienteId: {
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
      valorPedido: {
        type     : Sequelize.DECIMAL(10, 2),
      },
      horasPLC: {
        type     : Sequelize.INTEGER,
        allowNull: false,
      },
      horasIHM: {
        type     : Sequelize.INTEGER,
      },
      horasPLC: {
        type     : Sequelize.INTEGER,
      },
      valorTerceiros: {
        type     : Sequelize.DECIMAL(10, 2),
      },
      valorMateriais: {
        type     : Sequelize.DECIMAL(10, 2),
      },
      valorViagens: {
        type     : Sequelize.DECIMAL(10, 2),
      },
      bloquearApontamento: {
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
