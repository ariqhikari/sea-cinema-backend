const movie_seeder = require("./seeders/movie.seeder");
const user_seeder = require("./seeders/user.seeder");

const init = async () => {
  await movie_seeder();
  await user_seeder();
};

module.exports = init;
