const user_model = require("../databases/models/user.model");

const jwt = require("jsonwebtoken");

const role = async (role, req) => {
  try {
    const user = await user_model.findOne({
      where: { id: jwt.decode(req.headers.token).id },
    });

    if (user.role === role) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

module.exports = role;
