import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '@/app/lib/database'; // Assuming your sequelize connection is in this file

// Define the User model
const User = sequelize.define('User', {
  // Define the `email` field
  email: {
    type: DataTypes.STRING,
    allowNull: false,  // Ensure email is required
    unique: true,      // Ensure email is unique
    validate: {
      isEmail: true,   // Sequelize built-in email validation
    },
  },

  // Define the `username` field
  username: {
    type: DataTypes.STRING,
    allowNull: false,  // Ensure username is required
    unique: false,      // Ensure username is unique
    validate: {
      len: [3, 30],    // Ensure username is between 3 and 30 characters
    },
  },
}, {
  // Additional options
  timestamps: true,  // Add `createdAt` and `updatedAt` fields
});

// Sync the model with the database (you can use `sequelize.sync()` for testing)
const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false, alter:true });  // Sync the models (alter will modify the tables if needed)
    console.log('User model synchronized');
  } catch (error) {
    console.error('Error syncing User model:', error);
  }
};

// Call the sync function to sync the model with the database
syncDatabase();

// Export the model to use in other files
export default User;
