const { api } = require("../../../configs/prefix.config");
const auth_middleware = require("../../../middlewares/authentication.middleware");
const admin_middleware = require("../../../middlewares/admin.middleware");
const {
  list_showtime,
  store,
  update,
  destroy,
} = require("../../../controllers/admin/showtime.controller");
const init_validation = require("../../../configs/init_validation.config");
const { store_showtime } = require("../../../configs/validations.config");

const express = require("express");

const router = express.Router();

router.get(
  `${api}/admin/showtimes`,
  auth_middleware,
  admin_middleware,
  (req, res) => list_showtime(req, res)
);

router.post(
  `${api}/admin/showtimes`,
  auth_middleware,
  admin_middleware,
  store_showtime,
  init_validation,
  (req, res) => store(req, res)
);

router.patch(
  `${api}/admin/showtimes/:showtime_id`,
  auth_middleware,
  admin_middleware,
  store_showtime,
  init_validation,
  (req, res) => update(req, res)
);

router.delete(
  `${api}/admin/showtimes/:showtime_id`,
  auth_middleware,
  admin_middleware,
  (req, res) => destroy(req, res)
);

module.exports = router;
