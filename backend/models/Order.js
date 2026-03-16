const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
    name: String,
    price: Number,
    quantity: { type: Number, default: 1 },
});

const orderSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
        restaurantName: String,
        items: [orderItemSchema],
        totalAmount: { type: Number, required: true },
        deliveryAddress: { type: String, required: true },
        status: {
            type: String,
            enum: ['Placed', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'],
            default: 'Placed',
        },
        paymentMethod: { type: String, enum: ['Cash on Delivery', 'Online'], default: 'Cash on Delivery' },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
