const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Create a new Sequelize model for Comments
class Comment extends Model {}

module.exports = Comment;
