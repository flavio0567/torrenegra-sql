'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('users', { 
        id: {
          type         : Sequelize.INTEGER,
          primaryKey   : true,
          autoIncrement: true,
          allowNull    : false,
        },
        nome: { 
          type     : Sequelize.STRING,
          allowNull: false,
        }, 
        sobrenome: {  
          type     : Sequelize.STRING,
          allowNull: false,
        },      
        funcao: {
          type     : Sequelize.STRING,
          allowNull: false,
        },
        custo_hora: {
          type     : Sequelize.DECIMAL(10, 2),
          allowNull: false,

        },
        email: { 
          type     : Sequelize.STRING,
          allowNull: false,
        }, 
        senha: { 
          type     : Sequelize.STRING,
          allowNull: false,
        }, 
        admin: {
          type     : Sequelize.BOOLEAN,
          defaultValue: false,
        },
        ativo: {
          type     : Sequelize.STRING,
          allowNull: false,
          defaultValue: 'desativado',
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
      return queryInterface.dropTable('users');
  }
};
