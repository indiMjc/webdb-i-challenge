const express = require("express");

const accountsRouter = require("./accounts/accounts-router");

const server = express();

server.use("/accounts", accountsRouter);
server.use(express.json());

server.get("/", (req, res) => {
  const message = "Server up";
  res.send(message);
});

module.exports = server;
