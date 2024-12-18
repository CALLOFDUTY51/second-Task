const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    email: String,
    cart: [
      {
        name: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],
    sessionId: String,
    status: { type: String, enum: ['success', 'failed'] },
    timestamp: { type: Date, default: Date.now },
    error: String,
  });

module.exports = mongoose.model("Transaction", TransactionSchema);
