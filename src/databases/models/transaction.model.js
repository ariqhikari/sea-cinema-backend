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
    showTimeId: {
      type: db_config.Sequilize.DataTypes.STRING,
      allowNull: true,
    },
    bookingSeat: {
      type: db_config.Sequilize.DataTypes.JSON,
      allowNull: true,
    },
    totalCost: {
      type: db_config.Sequilize.DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: db_config.Sequilize.DataTypes.ENUM(
        "SUCCESS",
        "CANCEL",
        "TOPUP",
        "WITHDRAW"
      ),
      defaultValue: "SUCCESS",
    },
  },
  { timestamps: true }
);

module.exports = model;
