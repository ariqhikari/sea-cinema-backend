const role_middleware = require("./role.middleware");
const { api_response } = require("../libs/response.lib");

const init = async (req, res, next) => {
  const result = await role_middleware("ADMIN", req);

  if (!result)
    return api_response(401, res, req, {
      status: false,
      message: "Permission denied.",
    });

  next();
};

module.exports = init;
