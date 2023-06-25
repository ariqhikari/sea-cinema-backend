const user_model = require("../databases/models/user.model");
const transaction_model = require("../databases/models/transaction.model");
const { api_response } = require("../libs/response.lib");
const { generateRandomInt } = require("../libs/general.lib");

const { v1 } = require("uuid");
const jwt = require("jsonwebtoken");

const profile = async (req, res) => {
  try {
    const user = await user_model.findOne({
      where: { id: jwt.decode(req.headers.token).id },
    });

    return api_response(200, res, req, {
      status: true,
      message: "Success get data profile.",
      data: {
        user,
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

    if (req.body.transaction) {
      const transactionBody = {
        id: `TRS-${v1()}`,
        transactionCode: `CODE-${generateRandomInt(0o0, 99999999)}`,
        userId: user.id,
        totalCost: req.body.totalCost,
        status: req.body.transaction,
      };

      await transaction_model.create(transactionBody);
    }

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
