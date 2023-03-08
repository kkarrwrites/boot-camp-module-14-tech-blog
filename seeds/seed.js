const sequelize = require("../config/connection");
const { User, Blog, Comment } = require("../models");

const userSeedData = require("./userSeedData.json");
const blogSeedData = require("./blogSeedData.json");
const commentSeedData = require("./commentSeedData.json");

// Add ssync keyword to the function `seedDatabase` makes it asynchronous
const seedDatabase = async () => {
  // Add await keyword in front of the expression inside the async function
  await sequelize.sync({ force: true });
  // Once JavaSript recognizes the `await` keyword, it waits for the promise to be fulfilled before moving on
  // bulkCreate() method inserts multiple records to a database table with a single function call
  await User.bulkCreate(userSeedData);
  await Blog.bulkCreate(blogSeedData);
  await Comment.bulkCreate(commentSeedData);
  // Node normally exits with a 0 status code when no more async operations are pending
  process.exit(0);
};

seedDatabase();
