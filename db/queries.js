const connection = require('./connection');

module.exports = {
  getAll() {
    return connection('product');
  },
  getOne(id) {
    return connection('product').where('id', id).first();
  },
  create(product) {
    return connection('product').insert(product, 'id').then(ids => {
      return ids[0];
    });
  },
  update(id, product) {
    return connection('product').where('id', id).update(product);
  },
  delete(id) {
    return connection('product').where('id', id).del();
  }
};
