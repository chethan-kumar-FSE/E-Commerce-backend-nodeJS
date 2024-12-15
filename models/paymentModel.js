const mongoose = require("mongoose");
const paymentSchema = new mongoose.Schema({
  paymentId: {
    type: String,
    unique: true,
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
  amount: {
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
