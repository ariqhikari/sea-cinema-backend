const { api } = require("../../configs/prefix.config");
const auth_middleware = require("../../middlewares/authentication.middleware");
const {
  now_playing,
  list_by_genre,
} = require("../../controllers/movie.controller");

const express = require("express");

const router = express.Router();

router.get(`${api}/movies/now-playing`, auth_middleware, (req, res) =>
  now_playing(req, res)
);

router.get(`${api}/movies/genre/:genre`, auth_middleware, (req, res) =>
  list_by_genre(req, res)
);

module.exports = router;
