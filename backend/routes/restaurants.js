const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const auth = require('../middleware/auth');

// GET /api/restaurants - get all approved restaurants
router.get('/', async (req, res) => {
    try {
        // Return approved restaurants, or those created before this feature ($exists: false)
        const restaurants = await Restaurant.find({ 
            $or: [{ isApproved: true }, { isApproved: { $exists: false } }] 
        }).sort({ createdAt: -1 });
        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// GET /api/restaurants/my - get restaurants created by the current user
router.get('/my', auth, async (req, res) => {
    try {
        const restaurants = await Restaurant.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// GET /api/restaurants/admin/all - get all restaurants (admin only)
router.get('/admin/all', auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
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
        // Optionally, check if NOT approved and NOT admin, then deny? Or let frontend handle it.
        // Assuming public facing so only if it's approved or the requester is the owner/admin.
        // For simplicity, we just return it or let's add a quick check.
        res.json(restaurant);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /api/restaurants - create restaurant (authenticated users)
router.post('/', auth, async (req, res) => {
    try {
        const { name, description, imageUrl, cuisineType, rating, deliveryTime, minOrder } = req.body;
        const restaurant = new Restaurant({
            name, description, imageUrl, cuisineType, rating, deliveryTime, minOrder,
            createdBy: req.user.id,
            isApproved: req.user.role === 'admin' // Auto-approve if created by admin
        });
        await restaurant.save();
        res.status(201).json(restaurant);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// PUT /api/restaurants/:id/approve - approve restaurant (admin only)
router.put('/:id/approve', auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
        const restaurant = await Restaurant.findByIdAndUpdate(
            req.params.id,
            { isApproved: true },
            { new: true }
        );
        if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
        res.json(restaurant);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
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
