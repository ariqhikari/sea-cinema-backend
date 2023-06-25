const { api } = require("../../configs/prefix.config");
const auth_middleware = require("../../middlewares/authentication.middleware");
const {
  list_transaction,
  booking,
  cancelBooking,
} = require("../../controllers/transaction.controller");
const init_validation = require("../../configs/init_validation.config");
const { store_transaction } = require("../../configs/validations.config");

const express = require("express");

const router = express.Router();

router.get(`${api}/transactions`, auth_middleware, (req, res) =>
  list_transaction(req, res)
);

router.post(
  `${api}/transactions`,
  auth_middleware,
  store_transaction,
  init_validation,
  (req, res) => booking(req, res)
);

router.get(
  `${api}/transactions/:transaction_id/cancel`,
  auth_middleware,
  (req, res) => cancelBooking(req, res)
);

module.exports = router;
