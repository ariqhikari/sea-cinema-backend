const showtime_model = require("../databases/models/showtime.model");
const { api_response } = require("../libs/response.lib");

const showtime_by_movie = async (req, res) => {
  try {
    const showtimes = await showtime_model.findAll({
      where: { movieId: req.params.movieId },
      include: ["movie"],
    });

    return api_response(200, res, req, {
      status: true,
      message: "Success get data showtime.",
      data: {
        showtimes,
      },
    });
  } catch (error) {
    return api_response(400, res, req, {
      status: false,
      message: error.message || "Failed get data showtime.",
    });
  }
};

module.exports = {
  showtime_by_movie,
};
