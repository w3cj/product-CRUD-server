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

function validId(req, res, next) {
  if(!isNaN(req.params.id)) {
    next();
  } else {
    const error = new Error('Invalid id');
    next(error);
  }
}

function validProductMiddleware(req, res, next) {
  if(validProduct(req.body)) {
    next();
  } else {
    const error = new Error('Invalid product');
    next(error);
  }
}

function getProductFromBody(body) {
  const { title, description, price, quantity, image } = body;
  // insert into the DB
  const product = {
    title,
    description,
    price,
    quantity,
    image
  };

  return product;
}

// /api/v1/products
router.get('/', (req, res) => {
  queries
    .getAll()
    .then(products => {
      res.json(products);
    });
});

router.get('/:id', validId, (req, res, next) => {
  queries
    .getOne(req.params.id)
    .then(product => {
      if(product) {
        res.json(product);
      } else {
        next();
      }
    });
});

router.post('/', validProductMiddleware, (req, res) => {
  const product = getProductFromBody(req.body);

  queries
    .create(product)
    .then(id => {
      res.json({
        id
      });
    });
});

router.put('/:id', validId, validProductMiddleware, (req, res) => {
  const product = getProductFromBody(req.body);

  queries
    .update(req.params.id, product)
    .then(() =>{
      res.json({
        message: 'Updated!'
      });
    });
});

router.delete('/:id', validId, (req, res) => {
  queries
    .delete(req.params.id)
    .then(() => {
      res.json({
        message: 'Deleted!'
      });
    });
});

module.exports = router;
