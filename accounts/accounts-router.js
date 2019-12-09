const express = require("express");

const router = express.Router();

const AccountsDb = require("../data/dbConfig");

router.use(express.json());

module.exports = router;
