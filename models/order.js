// order.js

const mongoose = require('mongoose');

// Define Order schema
const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        name: String,
        price: Number
    }],
    additionalCharge: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        required: true
    },
    useSavedAddress: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create Order model
const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
