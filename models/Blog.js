const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Creates a new Sequelize model for Blogs
class Blog extends Model {}

Blog.init(
  // Defines fields/columns on model
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Blog post title
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Blog post date created
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    // Blog post content
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    // Links to database connection
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "blog",
  }
);

module.exports = Blog;
