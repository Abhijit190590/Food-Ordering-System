const mongoose = require('mongoose');
const User = require('./backend/models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: './backend/.env' });

async function createAdmin() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const hashedPassword = await bcrypt.hash('admin123', 10);
        const admin = new User({
            name: 'System Admin',
            email: 'admin@example.com',
            password: hashedPassword,
            role: 'admin'
        });
        await admin.save();
        console.log('Admin user created successfully: admin@example.com / admin123');
        process.exit(0);
    } catch (err) {
        console.error('Error creating admin:', err);
        process.exit(1);
    }
}

createAdmin();
