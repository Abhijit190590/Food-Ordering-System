const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, default: '' },
        imageUrl: { type: String, default: '' },
        cuisineType: { type: String, default: 'Multi-Cuisine' },
        rating: { type: Number, default: 4.0, min: 0, max: 5 },
        deliveryTime: { type: String, default: '30-45 mins' },
        minOrder: { type: Number, default: 100 },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Restaurant', restaurantSchema);
