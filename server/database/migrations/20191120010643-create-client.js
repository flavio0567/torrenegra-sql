'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('clients', { 
      id: {
        type         : Sequelize.INTEGER,
        primaryKey   : true,
        autoIncrement: true,
        allowNull    : false,
      },
      cnpj: { 
        type     : Sequelize.BIGINT,
        allowNull: false,
        unique: true
      }, 
      razao_social: {  
        type     : Sequelize.STRING,
        allowNull: false,
      },      
      nome_fantasia: {
        type     : Sequelize.STRING,
        allowNull: false,
      },
      valor_hh: { 
        type     : Sequelize.INTEGER,
      }, 
      prazo_pgto: { 
        type     : Sequelize.INTEGER,
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
    return queryInterface.dropTable('clients');
  }
};
