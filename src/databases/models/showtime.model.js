const db_config = require("../index.database");

const model = db_config.sequilize.define(
  "showtime",
  {
    id: {
      type: db_config.Sequilize.DataTypes.STRING,
      primaryKey: true,
    },
    movieId: {
      type: db_config.Sequilize.DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: db_config.Sequilize.DataTypes.DATE,
      allowNull: false,
    },
    time: {
      type: db_config.Sequilize.DataTypes.TIME,
      allowNull: false,
    },
    seats: {
      type: db_config.Sequilize.DataTypes.JSON,
      allowNull: false,
    },
  },
  { timestamps: true }
);

module.exports = model;
