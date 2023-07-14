const { api } = require("../../configs/prefix.config");
const auth_middleware = require("../../middlewares/authentication.middleware");
const { showtime_by_movie } = require("../../controllers/showtime.controller");

const express = require("express");

const router = express.Router();

router.get(`${api}/showtimes/:movieId`, auth_middleware, (req, res) =>
  showtime_by_movie(req, res)
);

module.exports = router;
