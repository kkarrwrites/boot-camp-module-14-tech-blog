const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Creates a new Sequelize model for Comments
class Comment extends Model {}

module.exports = Comment;
