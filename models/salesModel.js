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
  },
  customers: [
    {
      type: String,
      required: true,
    },
  ],
});

const Sales = mongoose.model("Sales", SalesSchema);
module.exports = Sales;
