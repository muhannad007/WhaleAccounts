const express = require("express");
const { getTransactions } = require("../controllers/transactionsController");

const transactionsRouter = express.Router();

transactionsRouter.get("/", getTransactions);

module.exports = transactionsRouter;
