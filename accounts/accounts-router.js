const express = require('express');

const router = express.Router();

const AccountsDb = require('../data/dbConfig');

router.use(express.json());

router.get('/', (req, res) => {
  AccountsDb('accounts')
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Could not get accounts.' });
    });
});

router.get('/:id', (req, res) => {
  AccountsDb('accounts')
    .select('*')
    .where('id', '=', req.params.id)
    // .first()
    .then(account => {
      res.status(200).json(account);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error getting account.' });
    });
});

router.post('/', (req, res) => {
  console.log(req.body);
  AccountsDb.insert(req.body, 'id')
    .into('accounts')
    .then(ids => {
      const id = ids[0];
      return AccountsDb('accounts')
        .select('id', 'name', 'budget')
        .where({ id })
        .first()
        .then(account => {
          res.status(201).json(account);
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error while adding new account.' });
    });
});

module.exports = router;
