const db_config = require("../index.database");

const model = db_config.sequilize.define(
  "ticket",
  {
    id: {
      type: db_config.Sequilize.DataTypes.STRING,
      primaryKey: true,
    },
    ticketCode: {
      type: db_config.Sequilize.DataTypes.STRING,
      allowNull: false,
    },
    transactionId: {
      type: db_config.Sequilize.DataTypes.STRING,
      allowNull: false,
    },
    seat: {
      type: db_config.Sequilize.DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

module.exports = model;
