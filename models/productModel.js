const mongoose = require("mongoose");

const productModel = new mongoose.Schema({
  productId: {
    type: String,
    unique: true,
    required: true,
    minlength: [10, "product id must be exactly of 10 characters long"],
    maxlength: [10, "product id must be exactly of 10 characters long"],
    validator: {
      validator: (value) => {
        return value.match(/^prod_[a-zA-Z]{2}\d{3}$/);
      },
      message: "Invalid product id",
    },
  },
  productName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["electronics", "kitchen", "cosmetics"],
  },
  description: {
    type: String,
    required: true,
  },
  currentStock: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  placeOfOrigin: {
    type: String,
    required: true,
  },
  warranty: {
    type: String,
    required: true,
  },
  shouldDisplay: {
    type: Boolean,
    default: true,
  },
});
const Products = mongoose.model("products", productModel);
module.exports = Products;
