const sequelize = require("../config/connection");
const { Model, DataTypes } = require("sequelize");

// Creates a new Sequelize model for Comments
class Comment extends Model {}

Comment.init(
  // Defines fields/columns on model
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    // Comment content
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
    // Set to false to remove `created_at` and `updated_at` fields
    // timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "comment",
  }
);

module.exports = Comment;
