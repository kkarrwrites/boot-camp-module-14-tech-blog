const User = require("./User");
const Blog = require("./Blog");
const Comment = require("./Comment");

// Defines a User as having many Blogs, thus creating a foreign key in the `blog` table
User.hasMany(Blog, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// The association between a User and Blogs can also be created from the Blog side
Blog.belongsTo(User, {
  foreignKey: "user_id",
});

// Defines a User as having many Comments, thus creating a foreign key in the `comment` table
User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// The association between a User and Comments can also be created from the Comment side
Comment.belongsTo(User, {
  foreignKey: "user_id",
});

// Defines a Blog as having many Comments, thus creating a foreign key in the `comment` table
Blog.hasMany(Comment, {
  foreignKey: "post_id",
});

// The association between Blog and Comments can also be created from the Comment side
Comment.belongsTo(Blog, {
  foreignKey: "post_id",
});

// Packages the models and exports them as an object so we can import them together and use their proper names
module.exports = { User, Blog, Comment };
