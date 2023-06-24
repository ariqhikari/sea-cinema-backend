const user_model = require("../../databases/models/user.model");
const { api_response } = require("../../libs/response.lib");
const { deleteFile } = require("../../libs/storage.lib");

const bcrypt = require("bcryptjs");
const { v1 } = require("uuid");

const list_user = async (req, res) => {
  try {
    const users = await user_model.findAll();

    return api_response(200, res, req, {
      status: true,
      message: "Success get data user.",
      data: {
        users,
      },
    });
  } catch (error) {
    return api_response(400, res, req, {
      status: false,
      message: error.message || "Failed get data user.",
    });
  }
};

const store = async (req, res) => {
  try {
    req.body.id = `USR-${v1()}`;
    req.body.password = bcrypt.hashSync(req.body.password);
    req.body.age = parseInt(req.body.age);

    const user = await user_model.create(req.body);

    return api_response(200, res, req, {
      status: true,
      message: "Success store data user.",
      data: {
        user,
      },
    });
  } catch (error) {
    deleteFile(`${process.cwd()}/storage/avatars/${req.body.avatar}`);

    return api_response(400, res, req, {
      status: false,
      message: error.message || "Failed store data user.",
    });
  }
};

const update = async (req, res) => {
  try {
    let user = await user_model.findOne({ where: { id: req.params.user_id } });

    if (!user)
      return api_response(404, res, req, {
        status: false,
        message: "User not found.",
      });

    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password);
    }

    if (user.avatar !== req.body.avatar) {
      deleteFile(`${process.cwd()}/storage/avatars/${user.avatar}`);
    }

    await user_model.update(
      {
        ...req.body,
      },
      {
        where: {
          id: req.params.user_id,
        },
      }
    );

    user = await user_model.findOne({ where: { id: req.params.user_id } });

    return api_response(200, res, req, {
      status: true,
      message: "Success update data user.",
      data: {
        user,
      },
    });
  } catch (error) {
    return api_response(400, res, req, {
      status: false,
      message: error.message || "Failed update data user.",
    });
  }
};

const destroy = async (req, res) => {
  try {
    let user = await user_model.findOne({ where: { id: req.params.user_id } });

    if (!user)
      return api_response(404, res, req, {
        status: false,
        message: "User not found.",
      });

    deleteFile(`${process.cwd()}/storage/avatars/${user.avatar}`);

    await user_model.destroy({
      where: {
        id: req.params.user_id,
      },
    });

    return api_response(200, res, req, {
      status: true,
      message: "Success delete data user.",
    });
  } catch (error) {
    return api_response(400, res, req, {
      status: false,
      message: error.message || "Failed delete data user.",
    });
  }
};

module.exports = {
  list_user,
  store,
  update,
  destroy,
};
