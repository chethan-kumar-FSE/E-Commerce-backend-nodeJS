const mongoose = require("mongoose");

const PointsSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
  },
  totalPurchaseOnPlatform: {
    type: Number,
  },
  points: {
    type: Number,
  },
  moneySavedByPoints: {
    type: Number,
  },
});

const Points = mongoose.model("Points", PointsSchema);
module.exports = Points;
