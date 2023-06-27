const user = require("./models/user.model");
const movie = require("./models/movie.model");
const showtime = require("./models/showtime.model");
const ticket = require("./models/ticket.model");
const transaction = require("./models/transaction.model");

const sync = () => {
  user.sync();
  movie.sync();
  showtime.sync();
  ticket.sync();
  transaction.sync();

  // Movie & Showtime
  movie.hasMany(showtime, {
    as: "showtimes",
    foreignKey: "movieId",
  });
  showtime.belongsTo(movie, {
    foreignKey: "movieId",
  });

  // Transaction & Ticket
  transaction.hasMany(ticket, {
    as: "tickets",
    foreignKey: "transactionId",
  });
  ticket.belongsTo(transaction, {
    foreignKey: "transactionId",
  });

  // User & Transaction
  user.hasMany(transaction, {
    as: "transactions",
    foreignKey: "userId",
  });
  transaction.belongsTo(user, {
    foreignKey: "userId",
  });

  // Showtime & Transaction
  showtime.hasMany(transaction, {
    as: "transactions",
    foreignKey: "showTimeId",
  });
  transaction.belongsTo(showtime, {
    foreignKey: "showTimeId",
  });
};

module.exports = sync;
