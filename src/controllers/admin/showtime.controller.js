const movie_model = require("../../databases/models/movie.model");
const showtime_model = require("../../databases/models/showtime.model");
const { api_response } = require("../../libs/response.lib");

const { v1 } = require("uuid");

const list_showtime = async (req, res) => {
  try {
    const showtimes = await showtime_model.findAll();

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

const store = async (req, res) => {
  try {
    const movie = await movie_model.findOne({
      where: { id: req.body.movieId },
    });

    if (!movie) {
      return api_response(404, res, req, {
        status: false,
        message: "Movie not found",
      });
    }

    req.body.id = `SHW-${v1()}`;
    req.body.seats = generateSeats();
    const showtime = await showtime_model.create(req.body);

    return api_response(200, res, req, {
      status: true,
      message: "Success store data showtime.",
      data: {
        showtime,
      },
    });
  } catch (error) {
    return api_response(400, res, req, {
      status: false,
      message: error.message || "Failed store data showtime.",
    });
  }
};

const update = async (req, res) => {
  try {
    let showtime = await showtime_model.findOne({
      where: { id: req.params.showtime_id },
    });

    if (!showtime)
      return api_response(404, res, req, {
        status: false,
        message: "Showtime not found.",
      });

    await showtime_model.update(
      {
        date: req.body.date,
        time: req.body.time,
      },
      {
        where: {
          id: req.params.showtime_id,
        },
      }
    );

    showtime = await showtime_model.findOne({
      where: { id: req.params.showtime_id },
    });

    return api_response(200, res, req, {
      status: true,
      message: "Success update data showtime.",
      data: {
        showtime,
      },
    });
  } catch (error) {
    return api_response(400, res, req, {
      status: false,
      message: error.message || "Failed update data showtime.",
    });
  }
};

const destroy = async (req, res) => {
  try {
    let showtime = await showtime_model.findOne({
      where: { id: req.params.showtime_id },
    });

    if (!showtime)
      return api_response(404, res, req, {
        status: false,
        message: "Showtime not found.",
      });

    await showtime_model.destroy({
      where: {
        id: req.params.showtime_id,
      },
    });

    return api_response(200, res, req, {
      status: true,
      message: "Success delete data showtime.",
    });
  } catch (error) {
    return api_response(400, res, req, {
      status: false,
      message: error.message || "Failed delete data showtime.",
    });
  }
};

const generateSeats = () => {
  // A1 A8 - G1 G8
  const seats = {};
  const alphabets = ["A", "B", "C", "D", "E", "F", "G"];

  alphabets.forEach((alphabet) => {
    for (let i = 1; i <= 8; i++) {
      seats[`${alphabet}${i}`] = false;
    }
  });

  return seats;
};

module.exports = {
  list_showtime,
  store,
  update,
  destroy,
};
