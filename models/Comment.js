const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Creates a new Sequelize model for Comments
class Comment extends Model {}

Comment.init(
  // Defines fields/columns on model
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Comment content
    content: {
      type: DataTypes.STRING, // TEXT("long")
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    blog_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "blog",
        key: "id",
      },
    },
  },
  {
    // Links to database connection
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "comment",
  }
);

module.exports = Comment;
