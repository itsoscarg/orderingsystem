const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  name: {
    type: String,
  },
  price: {
    type: String,
  },
  _id: {
    type: String,
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
