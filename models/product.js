const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
  },
  price: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  description: String

});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
