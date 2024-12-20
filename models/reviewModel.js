const mongoose = require("mongoose");

const ReviewsSchema = new mongoose.Schema(
  {
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

    rating: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Reviews = mongoose.model("reviews", ReviewsSchema);
module.exports = Reviews;
