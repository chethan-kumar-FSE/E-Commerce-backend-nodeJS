const mongoose = require("mongoose");
const paymentSchema = new mongoose.Schema({
  paymentId: {
    type: String,
    unique: true,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  orderId: {
    type: String,
    unique: true,
    required: true,
  },
  mode: {
    type: String,
    required: true,
    enum: ["gpay", "phonepe", "paytm"],
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "completed", "cancelled"],
  },
  isPointsUsed: {
    type: Boolean,
    required: true,
  },
  amount: {
    amountReducedByPoints: {
      type: Number,
      required: true,
    },
    actualCost: {
      type: Number,
      required: true,
    },
    gst: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
});

const Payments = mongoose.model("Payments", paymentSchema);
module.exports = Payments;
