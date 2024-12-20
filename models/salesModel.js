const mongoose = require("mongoose");

const SalesSchema = new mongoose.Schema({
  productId: {
    type: String,
    reqired: true,
    unique: true,
  },
  totalQuantitySold: {
    type: Number,
    required: true,
    default: 0,
  },
  actualPrice: {
    type: Number,
    required: true,
  },
  sellingPrice: {
    type: Number,
    required: true,
  },
  profit: {
    type: Number,
    required: true,
    default: 0,
  },
  customers: [
    {
      type: String,
      required: true,
    },
    {
      type: Number,
      required: true,
    },
  ],
});

const Sales = mongoose.model("Sales", SalesSchema);
module.exports = Sales;
