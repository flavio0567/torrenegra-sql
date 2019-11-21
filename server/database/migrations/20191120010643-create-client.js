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
        type     : Sequelize.INTEGER,
        allowNull: false,
      }, 
      razaoSocial: {  
        type     : Sequelize.STRING,
        allowNull: false,
      },      
      nomeFantasia: {
        type     : Sequelize.STRING,
        allowNull: false,
      },
      valorHH: { 
        type     : Sequelize.INTEGER,
      }, 
      prazoPgto: { 
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
