const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to user
  paymentMethod: { type: String, required: true },
  cardNumber: { type: String, required: true },
  cardName: { type: String, required: true },
  expiryDate: { type: String, required: true },
  cvv: { type: String, required: true },
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
