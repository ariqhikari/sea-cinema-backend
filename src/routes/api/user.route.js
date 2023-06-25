const { api } = require("../../configs/prefix.config");
const auth_middleware = require("../../middlewares/authentication.middleware");
const {
  profile,
  update_profile,
} = require("../../controllers/user.controller");
const init_validation = require("../../configs/init_validation.config");
const { update_user } = require("../../configs/validations.config");

const express = require("express");

const router = express.Router();

router.get(`${api}/user/profile`, auth_middleware, (req, res) =>
  profile(req, res)
);

router.patch(
  `${api}/user/profile`,
  auth_middleware,
  update_user,
  init_validation,
  (req, res) => update_profile(req, res)
);

module.exports = router;
