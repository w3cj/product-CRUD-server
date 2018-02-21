const express = require('express');

const router = express.Router();

const queries = require('../db/queries');

function validProduct(product) {
  return typeof product.title == 'string' &&
          product.title.trim() != '' &&
         !isNaN(product.price) &&
         product.price > 0 &&
         Number.isInteger(product.quantity) &&
         product.quantity >= 0;
}

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

router.post('/', (req, res, next) => {
  if(validProduct(req.body)) {
    const { title, description, price, quantity, image } = req.body;
    // insert into the DB
    const product = {
      title,
      description,
      price,
      quantity,
      image
    };

    queries
      .create(product)
      .then(id => {
        res.json({
          id
        });
      });
  } else {
    const error = new Error('Invalid product');
    next(error);
  }
});

module.exports = router;
