const mongoose = require('mongoose');
const Review = require('./review.js');
const Schema = mongoose.Schema;

// const productSchema = new Schema({
//   name: String,
//   price: Number,
//   imageUrl: String,
//   description: String,
//   reviews    : [Review.schema]
// });

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name']
  },
  price: {
    type: Number,
    required: [true, 'Please enter the product\'s price']
  },
  imageUrl: {
    type: String,
    required: [true, 'Please enter the product\'s image url']
  },
  description: String,
  reviews: [Review.schema]
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
