const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");
const { Model, DataTypes } = require("sequelize");

// Creates a new Sequelize model for Users
class User extends Model {
  // Instance method checks that the password that the user inputs matches the password in the database
  checkPassword(loginPassword) {
    return bcrypt.compareSync(loginPassword, this.password);
  }
}

User.init(
  // Defines fields/columns on model
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    // User's username
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // User's password
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [15],
      },
    },
  },
  {
    hooks: {
      // beforeCreate hook works with data before a new instance is created
      beforeCreate: async (newUserData) => {
        // Hashing the user's password before adding it to the database
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      // beforeUpdate hook works with data before it is updated
      beforeUpdate: async (updatedUserData) => {
        // Hashing the user's password before updating it ing the database
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },
    // Links to database connection
    sequelize,
    // Set to false to remove `created_at` and `updated_at` fields
    // timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
