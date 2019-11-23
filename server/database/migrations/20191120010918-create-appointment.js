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
      user_id: {  
        type      : Sequelize.INTEGER,
        allowNull : false,
        references: { model: 'users', key: 'id' },
        onUpdate  : 'CASCADE',
        onDelete  : 'CASCADE',
      },      
      project_id  : {
        type      : Sequelize.INTEGER,
        allowNull : false,
        references: { model: 'projects', key: 'id' },
        onUpdate  : 'CASCADE',
        onDelete  : 'CASCADE',
      },
      tipo: { 
        type : Sequelize.STRING,
      }, 
      valor_hh: {
        type: Sequelize.DECIMAL(10, 2),
      },
      inicio: { 
        type: Sequelize.STRING,
      }, 
      fim: { 
        type: Sequelize.STRING,
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
      created_at: {
        type     : Sequelize.DATE,
        allowNull: false,
      }, 
      updated_at: {
        type    : Sequelize.DATE,
        allowNull: false
      },  
    });
    },
  
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('appointments');
    }
  };
