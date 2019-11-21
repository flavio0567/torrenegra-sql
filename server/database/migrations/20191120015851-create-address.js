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
      _clienteId: {
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
      endereco: {
          type: Sequelize.STRING,
          get() {
                return this.logradouro + ' ' + 
                       this.complemento + ' ' +
                       this.cidade + ' ' +
                       this.estado + ' ' +
                       this.cep },
          set(addr) {
            this.setDataValue('logradouro', addr.logradouro);
            this.setDataValue('complemento', addr.complemento);
            this.setDataValue('cidade', addr.cidade);
            this.setDataValue('estado', addr.estado);
            this.setDataValue('cep', addr.cep);   
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
    return queryInterface.dropTable('addresses');
  }
};
