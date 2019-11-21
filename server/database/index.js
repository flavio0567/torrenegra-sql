const Sequelize = require('sequelize');
const dbConfig = require('../config/database.config');

const User = require('../models/User.model');
const Client = require('../models/Client.model');
const Project = require('../models/Project.model');
const Appointment = require('../models/Appointment.model');
const Address = require('../models/Address.model');

const connection = new Sequelize(dbConfig);

User.init(connection);
Client.init(connection);
Project.init(connection);
Appointment.init(connection);
Address.init(connection);

User.associate(connection.models);
Client.associate(connection.models);
Project.associate(connection.models);
Appointment.associate(connection.models);
Address.associate(connection.models);

module.exports = connection;
