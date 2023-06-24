const user_model = require("../databases/models/user.model");
const { api_response } = require("../libs/response.lib");

const jwt = require("jsonwebtoken");

const profile = async (req, res) => {
  try {
    const user = await user_model.findOne({
      where: { id: jwt.decode(req.headers.token).id },
    });
    const role = await user.getRole();

    return api_response(200, res, req, {
      status: true,
      message: "Success get data profile.",
      data: {
        user: {
          ...user.toJSON(),
          role,
        },
      },
    });
  } catch (error) {
    return api_response(400, res, req, {
      status: false,
      message: error.message || "Failed get data profile.",
    });
  }
};

const update_profile = async (req, res) => {
  try {
    const user = await user_model.findOne({
      where: { id: jwt.decode(req.headers.token).id },
    });

    if (!user)
      return api_response(404, res, req, {
        status: false,
        message: "User not found.",
      });

    user.update(req.body);

    return api_response(200, res, req, {
      status: true,
      message: "Success update profile user.",
      data: {
        user,
      },
    });
  } catch (error) {
    return api_response(400, res, req, {
      status: false,
      message: error.message || "Failed update profile user.",
    });
  }
};

module.exports = {
  profile,
  update_profile,
};
