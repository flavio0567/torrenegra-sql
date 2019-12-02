'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('contacts', { 
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
      nome: { 
        type     : Sequelize.STRING,
        allowNull: false,
      }, 
      email: {  
        type     : Sequelize.STRING,
      },      
      fone: {
        type     : Sequelize.BIGINT,
      }, 
      skype: { 
        type     : Sequelize.STRING,
      }, 
      main: { 
        type     : Sequelize.BOOLEAN,
      },
      created_at: {
        type     : Sequelize.DATE,
        allowNull: false,
      }, 
      updated_at: {
        type     : Sequelize.DATE,
        allowNull: false,
      }, 
    });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('contacts');
  }
};
