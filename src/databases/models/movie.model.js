const db_config = require("../index.database");

const model = db_config.sequilize.define(
  "movie",
  {
    id: {
      type: db_config.Sequilize.DataTypes.STRING,
      primaryKey: true,
    },
    title: {
      type: db_config.Sequilize.DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: db_config.Sequilize.DataTypes.TEXT,
      allowNull: false,
    },
    release_date: {
      type: db_config.Sequilize.DataTypes.STRING,
      allowNull: false,
    },
    poster: {
      type: db_config.Sequilize.DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: db_config.Sequilize.DataTypes.DOUBLE,
      allowNull: false,
    },
    age_rating: {
      type: db_config.Sequilize.DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: db_config.Sequilize.DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: true }
);

module.exports = model;
