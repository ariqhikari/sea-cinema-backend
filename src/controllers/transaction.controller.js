const user_model = require("../databases/models/user.model");
const showtime_model = require("../databases/models/showtime.model");
const movie_model = require("../databases/models/movie.model");
const transaction_model = require("../databases/models/transaction.model");
const ticket_model = require("../databases/models/ticket.model");
const { api_response } = require("../libs/response.lib");
const { generateRandomInt } = require("../libs/general.lib");

const { v1 } = require("uuid");
const jwt = require("jsonwebtoken");

const list_transaction = async (req, res) => {
  try {
    const user = await user_model.findOne({
      where: { id: jwt.decode(req.headers.token).id },
    });

    let transactions;
    let include = [
      {
        model: showtime_model,
        as: "showtime",
        include: [
          {
            model: movie_model,
            as: "movie",
          },
        ],
      },
    ];

    if (user.role == "ADMIN") {
      transactions = await transaction_model.findAll({
        include,
        order: [["updatedAt", "DESC"]],
      });
    } else {
      transactions = await transaction_model.findAll({
        where: { userId: user.id },
        include,
        order: [["updatedAt", "DESC"]],
      });
    }

    return api_response(200, res, req, {
      status: true,
      message: "Success get data transaction.",
      data: {
        transactions,
      },
    });
  } catch (error) {
    return api_response(400, res, req, {
      status: false,
      message: error.message || "Failed get data transaction.",
    });
  }
};

const booking = async (req, res) => {
  try {
    const showtime = await showtime_model.findOne({
      where: { id: req.body.showTimeId },
    });

    if (!showtime) {
      return api_response(404, res, req, {
        status: false,
        message: "Showtime not found",
      });
    }

    req.body.id = `TRS-${v1()}`;
    req.body.transactionCode = `CODE-${generateRandomInt(0o0, 99999999)}`;

    const transaction = await transaction_model.create(req.body);
    const seats = JSON.parse(showtime.seats);

    transaction.bookingSeat.forEach(async (seat) => {
      seats[seat] = true;

      const ticketBody = {
        id: `TCK-${v1()}`,
        ticketCode: `TICKET-${generateRandomInt(0o0, 99999999)}`,
        transactionId: transaction.id,
        seat,
      };
      await ticket_model.create(ticketBody);
    });

    await showtime_model.update(
      {
        seats,
      },
      {
        where: {
          id: req.body.showTimeId,
        },
      }
    );

    const user = await user_model.findOne({
      where: { id: jwt.decode(req.headers.token).id },
    });

    await user_model.update(
      {
        balance: user.balance - transaction.totalCost,
      },
      {
        where: { id: jwt.decode(req.headers.token).id },
      }
    );

    return api_response(200, res, req, {
      status: true,
      message: "Success store data transaction.",
      data: {
        transaction,
      },
    });
  } catch (error) {
    return api_response(400, res, req, {
      status: false,
      message: error.message || "Failed store data transaction.",
    });
  }
};

const cancelBooking = async (req, res) => {
  try {
    let transaction = await transaction_model.findOne({
      where: { id: req.params.transaction_id },
    });

    if (!transaction)
      return api_response(404, res, req, {
        status: false,
        message: "transaction not found.",
      });

    const showtime = await showtime_model.findOne({
      where: { id: transaction.showTimeId },
    });

    if (!showtime) {
      return api_response(404, res, req, {
        status: false,
        message: "Showtime not found",
      });
    }

    const seats = JSON.parse(showtime.seats);
    JSON.parse(transaction.bookingSeat).forEach((seat) => {
      seats[seat] = false;
    });

    await showtime_model.update(
      {
        seats,
      },
      {
        where: {
          id: showtime.id,
        },
      }
    );

    await transaction_model.update(
      {
        status: "CANCEL",
      },
      {
        where: {
          id: req.params.transaction_id,
        },
      }
    );

    transaction = await transaction_model.findOne({
      where: { id: req.params.transaction_id },
    });

    return api_response(200, res, req, {
      status: true,
      message: "Success update data transaction.",
      data: {
        transaction,
      },
    });
  } catch (error) {
    return api_response(400, res, req, {
      status: false,
      message: error.message || "Failed update data transaction.",
    });
  }
};

const topUpBalance = async (req, res) => {
  try {
    const user = await user_model.findOne({
      where: { id: jwt.decode(req.headers.token).id },
    });

    if (!user)
      return api_response(404, res, req, {
        status: false,
        message: "User not found.",
      });

    user.update({
      balance: user.balance + req.body.balance,
    });

    return api_response(200, res, req, {
      status: true,
      message: "Success update profile user.",
      data: {
        user,
      },
    });
  } catch (error) {
    return api_response(400, res, req, {
      status: false,
      message: error.message || "Failed update profile user.",
    });
  }
};

module.exports = {
  list_transaction,
  booking,
  cancelBooking,
};
