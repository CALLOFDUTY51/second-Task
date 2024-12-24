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
    status: String
   
    
  });

module.exports = mongoose.model("Transaction", TransactionSchema);
