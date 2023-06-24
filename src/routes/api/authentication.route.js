const { api } = require("../../configs/prefix.config");
const {
  register,
  login,
  verify,
} = require("../../controllers/authentication.controller");
const init_validation = require("../../configs/init_validation.config");
const {
  register: register_validation,
  login: login_validation,
} = require("../../configs/validations.config");
const auth_middleware = require("../../middlewares/authentication.middleware");

const express = require("express");
const uuid = require("uuid");
const multer = require("multer");

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${process.cwd()}/storage/avatars`);
  },
  filename: (req, file, cb) => {
    const format = file.mimetype.split("/")[1];
    const nameFile = `${uuid.v1()}.${format}`;

    cb(null, nameFile);

    req.body.avatar = nameFile;
  },
});
const upload = multer({ storage: storage });

router.post(
  `${api}/auth/login`,
  login_validation,
  init_validation,
  (req, res) => login(req, res)
);

router.post(
  `${api}/auth/register`,
  upload.array("avatar", 1),
  register_validation,
  init_validation,
  (req, res) => register(req, res)
);

router.get(`${api}/auth/verify`, auth_middleware, (req, res) =>
  verify(req, res)
);

module.exports = router;
