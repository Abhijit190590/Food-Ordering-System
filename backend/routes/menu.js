const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');
const auth = require('../middleware/auth');

// GET /api/menu/:restaurantId - get menu items for a restaurant
router.get('/:restaurantId', async (req, res) => {
    try {
        const items = await MenuItem.find({ restaurant: req.params.restaurantId });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /api/menu - add menu item (admin only)
router.post('/', auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
        const { name, description, price, imageUrl, category, isVeg, restaurant } = req.body;
        const item = new MenuItem({ name, description, price, imageUrl, category, isVeg, restaurant });
        await item.save();
        res.status(201).json(item);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// DELETE /api/menu/:id (admin only)
router.delete('/:id', auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
        await MenuItem.findByIdAndDelete(req.params.id);
        res.json({ message: 'Menu item deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
