const db_config = require("../index.database");

const model = db_config.sequilize.define(
  "transaction",
  {
    id: {
      type: db_config.Sequilize.DataTypes.STRING,
      primaryKey: true,
    },
    transactionCode: {
      type: db_config.Sequilize.DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: db_config.Sequilize.DataTypes.STRING,
      allowNull: false,
    },
    movieId: {
      type: db_config.Sequilize.DataTypes.STRING,
      allowNull: false,
    },
    showTimeId: {
      type: db_config.Sequilize.DataTypes.STRING,
      allowNull: false,
    },
    totalCost: {
      type: db_config.Sequilize.DataTypes.INTEGER,
      allowNull: false,
    },
    bookingSeat: {
      type: db_config.Sequilize.DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: db_config.Sequilize.DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

module.exports = model;
