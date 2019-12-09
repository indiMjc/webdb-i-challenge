const express = require("express");

const db = require("./data/dbConfig.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  const message = "Server up";
  res.send(message);
});

module.exports = server;
