const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const auth = require('../middleware/auth');

// GET /api/restaurants - get all restaurants
router.get('/', async (req, res) => {
    try {
        const restaurants = await Restaurant.find().sort({ createdAt: -1 });
        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// GET /api/restaurants/:id - get single restaurant
router.get('/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
        res.json(restaurant);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /api/restaurants - create restaurant (admin only)
router.post('/', auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Admin access required' });
        }
        const { name, description, imageUrl, cuisineType, rating, deliveryTime, minOrder } = req.body;
        const restaurant = new Restaurant({
            name, description, imageUrl, cuisineType, rating, deliveryTime, minOrder,
            createdBy: req.user.id,
        });
        await restaurant.save();
        res.status(201).json(restaurant);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// DELETE /api/restaurants/:id (admin only)
router.delete('/:id', auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
        await Restaurant.findByIdAndDelete(req.params.id);
        res.json({ message: 'Restaurant deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
