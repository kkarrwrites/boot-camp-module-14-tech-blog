const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Creates a new Sequelize model for Blogs
class Blog extends Model {}

module.exports = Blog;
