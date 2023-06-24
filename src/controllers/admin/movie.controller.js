const movie_model = require("../../databases/models/movie.model");
const { api_response } = require("../../libs/response.lib");
const { deleteFile } = require("../../libs/storage.lib");

const { v1 } = require("uuid");

const list_movie = async (req, res) => {
  try {
    const movies = await movie_model.findAll();

    return api_response(200, res, req, {
      status: true,
      message: "Success get data movie.",
      data: {
        movies,
      },
    });
  } catch (error) {
    return api_response(400, res, req, {
      status: false,
      message: error.message || "Failed get data movie.",
    });
  }
};

const store = async (req, res) => {
  try {
    req.body.id = `MV-${v1()}`;
    const movie = await movie_model.create(req.body);

    return api_response(200, res, req, {
      status: true,
      message: "Success store data movie.",
      data: {
        movie,
      },
    });
  } catch (error) {
    deleteFile(`${process.cwd()}/storage/posters/${req.body.poster}`);

    return api_response(400, res, req, {
      status: false,
      message: error.message || "Failed store data movie.",
    });
  }
};

const update = async (req, res) => {
  try {
    let movie = await movie_model.findOne({
      where: { id: req.params.movie_id },
    });

    if (!movie)
      return api_response(404, res, req, {
        status: false,
        message: "Movie not found.",
      });

    if (movie.poster !== req.body.poster) {
      deleteFile(`${process.cwd()}/storage/posters/${movie.poster}`);
    }

    await movie_model.update(
      {
        ...req.body,
      },
      {
        where: {
          id: req.params.movie_id,
        },
      }
    );

    movie = await movie_model.findOne({ where: { id: req.params.movie_id } });

    return api_response(200, res, req, {
      status: true,
      message: "Success update data movie.",
      data: {
        movie,
      },
    });
  } catch (error) {
    return api_response(400, res, req, {
      status: false,
      message: error.message || "Failed update data movie.",
    });
  }
};

const destroy = async (req, res) => {
  try {
    let movie = await movie_model.findOne({
      where: { id: req.params.movie_id },
    });

    if (!movie)
      return api_response(404, res, req, {
        status: false,
        message: "Movie not found.",
      });

    deleteFile(`${process.cwd()}/storage/posters/${movie.poster}`);

    await movie_model.destroy({
      where: {
        id: req.params.movie_id,
      },
    });

    return api_response(200, res, req, {
      status: true,
      message: "Success delete data movie.",
    });
  } catch (error) {
    return api_response(400, res, req, {
      status: false,
      message: error.message || "Failed delete data movie.",
    });
  }
};

module.exports = {
  list_movie,
  store,
  update,
  destroy,
};
