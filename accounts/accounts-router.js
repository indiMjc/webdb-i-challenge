const express = require('express');

const router = express.Router();

const AccountsDb = require('../data/dbConfig');

router.use(express.json());

router.get('/', (req, res) => {
  const pageLimit = req.query.limit;
  const sortDir = req.query.sortdir;

  AccountsDb('accounts')
    .limit(pageLimit)
    .orderBy('name', sortDir)
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
    .first()
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

router.put('/:id', (req, res) => {
  const { id } = req.params;
  AccountsDb('accounts')
    .where({ id })
    .first()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error while updating account.' });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  AccountsDb('accounts')
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error while deleting account.' });
    });
});

module.exports = router;
