const { api } = require("../../../configs/prefix.config");
const auth_middleware = require("../../../middlewares/authentication.middleware");
const admin_middleware = require("../../../middlewares/admin.middleware");
const {
  list_user,
  store,
  update,
  destroy,
} = require("../../../controllers/admin/user.controller");
const init_validation = require("../../../configs/init_validation.config");
const {
  register: register_validation,
  update_user,
} = require("../../../configs/validations.config");

const express = require("express");

const router = express.Router();
const multer = require("multer");
const uuid = require("uuid");
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

router.get(
  `${api}/admin/users`,
  auth_middleware,
  admin_middleware,
  (req, res) => list_user(req, res)
);

router.post(
  `${api}/admin/users`,
  auth_middleware,
  admin_middleware,
  upload.array("avatar", 1),
  register_validation,
  init_validation,
  (req, res) => store(req, res)
);

router.patch(
  `${api}/admin/users/:user_id`,
  auth_middleware,
  admin_middleware,
  update_user,
  init_validation,
  (req, res) => update(req, res)
);

router.delete(
  `${api}/admin/users/:user_id`,
  auth_middleware,
  admin_middleware,
  (req, res) => destroy(req, res)
);

module.exports = router;
