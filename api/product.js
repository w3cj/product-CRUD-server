const express = require('express');

const router = express.Router();

const queries = require('../db/queries');

// /api/v1/products
router.get('/', (req, res) => {
  queries
    .getAll()
    .then(products => {
      res.json(products);
    });
});

router.get('/:id', (req, res, next) => {
  if(!isNaN(req.params.id)) {
    queries
      .getOne(req.params.id)
      .then(product => {
        if(product) {
          res.json(product);
        } else {
          next();
        }
      });
  } else {
    const error = new Error('Invalid id');
    next(error);
  }
});

module.exports = router;
