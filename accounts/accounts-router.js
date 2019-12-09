const express = require("express");

const router = express.Router();

const AccountsDb = require("../data/dbConfig");

// router.use(express.json());

router.get("/", (req, res) => {
  AccountsDb("accounts")
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Could not get accounts." });
    });
});

module.exports = router;
