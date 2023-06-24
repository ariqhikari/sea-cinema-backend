const { api } = require("../../configs/prefix.config");
const auth_middleware = require("../../middlewares/authentication.middleware");
const { profile } = require("../../controllers/user.controller");
const init_validation = require("../../configs/init_validation.config");
const {
  update_profile: validation_update,
} = require("../../configs/validations.config");

const express = require("express");

const router = express.Router();

router.get(`${api}/user/profile`, auth_middleware, (req, res) =>
  profile(req, res)
);

router.patch(
  `${api}/user/profile/update`,
  auth_middleware,
  validation_update,
  init_validation,
  (req, res) => update_profile(req, res)
);

module.exports = router;
