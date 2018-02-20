const connection = require('./connection');

module.exports = {
  getAll() {
    return connection('product');
  },
  getOne(id) {
    return connection('product').where('id', id).first();
  }
};
