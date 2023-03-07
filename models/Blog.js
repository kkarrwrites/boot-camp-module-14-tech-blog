const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Create a new Sequelize model for Blogs
class Blog extends Model {}

module.exports = Blog;
