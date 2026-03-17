const mongoose = require('mongoose');
const User = require('./backend/models/User');
require('dotenv').config({ path: './backend/.env' });

async function makeAdmin() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/food_ordering_db');
        const res = await User.updateOne({ email: 'admin@example.com' }, { role: 'admin' });
        console.log('Made admin@example.com an admin', res);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
makeAdmin();
