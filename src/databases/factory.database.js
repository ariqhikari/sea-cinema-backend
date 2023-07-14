const movie_seeder = require("./seeders/movie.seeder");
const showtime_seeder = require("./seeders/showtime.seeder");
const user_seeder = require("./seeders/user.seeder");

const init = async () => {
  await movie_seeder();
  await showtime_seeder();
  await user_seeder();
};

module.exports = init;
