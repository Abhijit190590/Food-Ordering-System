const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Restaurant = require('../models/Restaurant');
const auth = require('../middleware/auth');

// POST /api/orders - place an order
router.post('/', auth, async (req, res) => {
    try {
        const { deliveryAddress, paymentMethod } = req.body;

        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        const restaurant = await Restaurant.findById(cart.restaurant);
        const totalAmount = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

        const order = new Order({
            user: req.user.id,
            restaurant: cart.restaurant,
            restaurantName: restaurant ? restaurant.name : 'Unknown',
            items: cart.items,
            totalAmount,
            deliveryAddress,
            paymentMethod: paymentMethod || 'Cash on Delivery',
        });

        await order.save();

        // Clear cart after placing order
        await Cart.findOneAndDelete({ user: req.user.id });

        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// GET /api/orders - get all orders of logged-in user
router.get('/', auth, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id })
            .populate('restaurant', 'name')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// GET /api/orders/:id - get single order
router.get('/:id', auth, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('restaurant', 'name');
        if (!order) return res.status(404).json({ message: 'Order not found' });
        if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT /api/orders/:id/status (admin only)
router.put('/:id/status', auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
