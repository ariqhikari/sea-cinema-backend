const movie_model = require("../databases/models/movie.model");
const showtime_model = require("../databases/models/showtime.model");
const { api_response } = require("../libs/response.lib");

const { Sequelize } = require("sequelize");

const now_playing = async (req, res) => {
  try {
    const movies = await movie_model.findAll({
      limit: 5,
      include: [
        {
          model: showtime_model,
          as: "showtimes",
        },
      ],
    });

    return api_response(200, res, req, {
      status: true,
      message: "Success get data movie.",
      data: {
        movies: movies.filter((movie) => movie.showtimes.length),
      },
    });
  } catch (error) {
    return api_response(400, res, req, {
      status: false,
      message: error.message || "Failed get data movie.",
    });
  }
};

const list_by_genre = async (req, res) => {
  try {
    let movies = await movie_model.findAll({
      where: Sequelize.fn(
        "JSON_CONTAINS",
        Sequelize.col("genres"),
        `"${req.params.genre}"`
      ),
      include: [
        {
          model: showtime_model,
          as: "showtimes",
        },
      ],
    });

    movies = movies.filter((movie) => movie.showtimes.length);

    return api_response(200, res, req, {
      status: true,
      message: "Success get data movie.",
      data: {
        movies: movies.slice(Math.max(movies.length - 5, 0)),
      },
    });
  } catch (error) {
    return api_response(400, res, req, {
      status: false,
      message: error.message || "Failed get data movie.",
    });
  }
};

module.exports = {
  now_playing,
  list_by_genre,
};
