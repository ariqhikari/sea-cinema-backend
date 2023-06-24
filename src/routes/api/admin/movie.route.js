const { api } = require("../../../configs/prefix.config");
const auth_middleware = require("../../../middlewares/authentication.middleware");
const admin_middleware = require("../../../middlewares/admin.middleware");
const {
  list_movie,
  store,
  update,
  destroy,
} = require("../../../controllers/admin/movie.controller");
const init_validation = require("../../../configs/init_validation.config");
const { store_movie } = require("../../../configs/validations.config");

const express = require("express");

const router = express.Router();
const multer = require("multer");
const uuid = require("uuid");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${process.cwd()}/storage/posters`);
  },
  filename: (req, file, cb) => {
    const format = file.mimetype.split("/")[1];
    const nameFile = `${uuid.v1()}.${format}`;

    cb(null, nameFile);

    req.body.poster = nameFile;
  },
});
const upload = multer({ storage: storage });

router.get(`${api}/admin/movies`, auth_middleware, (req, res) =>
  list_movie(req, res)
);

router.post(
  `${api}/admin/movies`,
  auth_middleware,
  admin_middleware,
  upload.array("poster", 1),
  store_movie,
  init_validation,
  (req, res) => store(req, res)
);

router.patch(
  `${api}/admin/movies/:movie_id`,
  auth_middleware,
  admin_middleware,
  upload.array("poster", 1),
  store_movie,
  init_validation,
  (req, res) => update(req, res)
);

router.delete(
  `${api}/admin/movies/:movie_id`,
  auth_middleware,
  admin_middleware,
  (req, res) => destroy(req, res)
);

module.exports = router;
