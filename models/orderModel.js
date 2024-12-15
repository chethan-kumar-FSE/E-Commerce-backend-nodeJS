const mongoose = require("mongoose");
const orderModel = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },
  userId: {
    type: String, // Corrected to .Types.ObjectId
    required: true,
  },
  products: [
    {
      productId: {
        type: String,
        required: true,
      },
      productName: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      cost: {
        type: Number,
        required: true,
      },
    },
  ],
  orderDate: {
    type: Date,
    default: Date.now,
  },
  deliveryDate: {
    type: Date,
    required: true,
  },
});
const Orders = mongoose.model("Orders", orderModel);
module.exports = Orders;
