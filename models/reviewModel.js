const mongoose = require("mongoose");

const ReviewsSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date(Date.now()),
  },
  rating: {
    type: Number,
    required: true,
  },
});

const Reviews = mongoose.model("reviews", ReviewsSchema);
module.exports = Reviews;
