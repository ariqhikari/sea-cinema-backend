const db_config = require("../index.database");

const model = db_config.sequilize.define(
  "user",
  {
    id: {
      type: db_config.Sequilize.DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: db_config.Sequilize.DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: db_config.Sequilize.DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: db_config.Sequilize.DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: db_config.Sequilize.DataTypes.INTEGER,
      allowNull: false,
    },
    balance: {
      type: db_config.Sequilize.DataTypes.INTEGER,
      defaultValue: 0,
    },
    avatar: {
      type: db_config.Sequilize.DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: db_config.Sequilize.DataTypes.ENUM("ADMIN", "USER"),
      defaultValue: "USER",
    },
  },
  { timestamps: true }
);

module.exports = model;
