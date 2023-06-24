const user_model = require("../models/user.model");

const { v1 } = require("uuid");
const bcrypt = require("bcryptjs");

const init = async () => {
  const users = await user_model.findAll();
  const data = [
    {
      id: `USR-${v1()}`,
      name: "Admin",
      username: "admin",
      password: bcrypt.hashSync("admin123"),
      age: 19,
      avatar: "default.png",
      role: "ADMIN",
    },
  ];
  const promises = [];

  if (!users.length) {
    data.forEach((item) => {
      promises.push(
        new Promise(async (resolve, reject) => {
          try {
            await user_model.create(item);

            resolve(true);
          } catch (error) {
            reject(false);
          }
        })
      );
    });

    Promise.all(promises)
      .then(() => console.log("Success generate users."))
      .catch(() => console.log("Failed generate users."));
  } else {
    console.log("Users already generated.");
  }
};

module.exports = init;
