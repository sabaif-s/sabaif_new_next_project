

import { Sequelize } from 'sequelize';

// Set up Sequelize connection with MySQL
const sequelize = new Sequelize(
  'next_app',  // Database name
  'root',      // Database user
  'Strong&2013',  // Database password
  {
    host: 'localhost',
    dialect: 'mysql',
    dialectModule: require('mysql2'),
  }
);

// Authenticate the connection
 export const authenticateDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

// Call the authenticate function to check connection
authenticateDatabase();

export default sequelize;
