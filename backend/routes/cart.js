const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const MenuItem = require('../models/MenuItem');
const auth = require('../middleware/auth');

// GET /api/cart - get cart for logged-in user
router.get('/', auth, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate('restaurant', 'name');
        if (!cart) return res.json({ items: [], restaurant: null });
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /api/cart/add - add item to cart
router.post('/add', auth, async (req, res) => {
    try {
        const { menuItemId, restaurantId } = req.body;
        const menuItem = await MenuItem.findById(menuItemId);
        if (!menuItem) return res.status(404).json({ message: 'Item not found' });

        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            // New cart
            cart = new Cart({
                user: req.user.id,
                restaurant: restaurantId,
                items: [{ menuItem: menuItem._id, name: menuItem.name, price: menuItem.price, quantity: 1 }],
            });
        } else {
            // If different restaurant, clear cart
            if (cart.restaurant.toString() !== restaurantId) {
                cart.restaurant = restaurantId;
                cart.items = [];
            }
            const existingIndex = cart.items.findIndex((i) => i.menuItem.toString() === menuItemId);
            if (existingIndex > -1) {
                cart.items[existingIndex].quantity += 1;
            } else {
                cart.items.push({ menuItem: menuItem._id, name: menuItem.name, price: menuItem.price, quantity: 1 });
            }
        }

        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// PUT /api/cart/update - update item quantity
router.put('/update', auth, async (req, res) => {
    try {
        const { menuItemId, quantity } = req.body;
        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const idx = cart.items.findIndex((i) => i.menuItem.toString() === menuItemId);
        if (idx === -1) return res.status(404).json({ message: 'Item not in cart' });

        if (quantity <= 0) {
            cart.items.splice(idx, 1);
        } else {
            cart.items[idx].quantity = quantity;
        }
        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE /api/cart/clear - clear entire cart
router.delete('/clear', auth, async (req, res) => {
    try {
        await Cart.findOneAndDelete({ user: req.user.id });
        res.json({ message: 'Cart cleared' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
