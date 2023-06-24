const user_model = require("../databases/models/user.model");
const { api_response } = require("../libs/response.lib");
const { deleteFile } = require("../libs/storage.lib");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { v1 } = require("uuid");

const login = async (req, res) => {
  try {
    const user = await user_model.findOne({
      where: { username: req.body.username },
    });

    if (!user)
      return api_response(404, res, req, {
        status: false,
        message: "User not found.",
      });

    if (!bcrypt.compareSync(req.body.password, user.password))
      return api_response(401, res, req, {
        status: false,
        message: "Username or password not match.",
      });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return api_response(200, res, req, {
      status: true,
      message: "Success login account user.",
      data: {
        user: user,
        token,
      },
    });
  } catch (error) {
    return api_response(401, res, req, {
      status: false,
      message: error.message || "Failed login account user.",
    });
  }
};

const register = async (req, res) => {
  try {
    req.body.id = `USR-${v1()}`;
    req.body.password = bcrypt.hashSync(req.body.password);
    req.body.age = parseInt(req.body.age);
    const user = await user_model.create(req.body);

    return api_response(201, res, req, {
      status: true,
      message: "Success register account user.",
      data: {
        user: user,
      },
    });
  } catch (error) {
    deleteFile(`${process.cwd()}/storage/avatars/${req.body.avatar}`);

    return api_response(400, res, req, {
      status: false,
      message: error.message || "Failed register account user.",
    });
  }
};

const verify = async (req, res) => {
  try {
    const user = await user_model.findOne({
      where: { id: jwt.decode(req.headers.token).id },
    });

    return api_response(200, res, req, {
      status: false,
      message: "Succes verify account user.",
      data: {
        user: {
          ...user.toJSON(),
        },
      },
    });
  } catch (error) {
    return api_response(400, res, req, {
      status: false,
      message: error.message || "Failed verify account user.",
    });
  }
};

module.exports = {
  login,
  register,
  verify,
};
