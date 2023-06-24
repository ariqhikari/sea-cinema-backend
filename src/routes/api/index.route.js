const { api } = require("../../configs/prefix.config");
const { api_response } = require("../../libs/response.lib");

const express = require("express");

const router = express.Router();

router.get(`${api}`, (req, res) => {
  return api_response(200, res, req, {
    status: true,
    message: "Welcome to services SEA CINEMA",
  });
});

module.exports = router;
