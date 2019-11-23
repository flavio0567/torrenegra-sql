'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('addresses', { 
      id: {
        type         : Sequelize.INTEGER,
        primaryKey   : true,
        autoIncrement: true,
        allowNull    : false,
      },
      cliente_id: {
        type     : Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'clients', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      logradouro: { 
        type     : Sequelize.STRING,
        allowNull: false,
      },
      complemento: { 
        type     : Sequelize.STRING,
      },
      cidade: { 
        type     : Sequelize.STRING,
        allowNull: false,
      },
      estado: { 
        type     : Sequelize.STRING,
        allowNull: false,
      },
      cep: { 
          type    : Sequelize.STRING,
          allowNull: false,
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
    return queryInterface.dropTable('addresses');
  }
};
