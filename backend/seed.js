const mongoose = require('mongoose');
require('dotenv').config();
const Restaurant = require('./models/Restaurant');
const MenuItem = require('./models/MenuItem');

const restaurants = [
    {
        name: 'Spice Garden',
        description: 'Authentic Indian cuisine with rich flavors and aromatic spices. A culinary journey through India.',
        imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600',
        cuisineType: 'Indian',
        rating: 4.5,
        deliveryTime: '30-40 mins',
        minOrder: 150,
    },
    {
        name: 'Pizza Paradise',
        description: 'Wood-fired pizzas made with fresh ingredients and traditional Italian recipes.',
        imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600',
        cuisineType: 'Italian',
        rating: 4.3,
        deliveryTime: '25-35 mins',
        minOrder: 200,
    },
    {
        name: 'Dragon Wok',
        description: 'Experience the best of Chinese and Asian fusion cuisine. Stir-fried perfection in every bite.',
        imageUrl: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600',
        cuisineType: 'Chinese',
        rating: 4.1,
        deliveryTime: '20-30 mins',
        minOrder: 100,
    },
    {
        name: 'Burger Barn',
        description: 'Juicy gourmet burgers with hand-cut fries. Comfort food at its finest.',
        imageUrl: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600',
        cuisineType: 'American',
        rating: 4.4,
        deliveryTime: '15-25 mins',
        minOrder: 120,
    },
    {
        name: 'Sushi Zen',
        description: 'Premium sushi and Japanese delicacies crafted by expert chefs using the freshest ingredients.',
        imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600',
        cuisineType: 'Japanese',
        rating: 4.7,
        deliveryTime: '30-45 mins',
        minOrder: 300,
    },
    {
        name: 'Taco Fiesta',
        description: 'Vibrant Mexican street food — tacos, burritos, and quesadillas bursting with flavor.',
        imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600',
        cuisineType: 'Mexican',
        rating: 4.2,
        deliveryTime: '20-30 mins',
        minOrder: 100,
    },
];

const menuItemsByRestaurant = {
    'Spice Garden': [
        { name: 'Butter Chicken', description: 'Creamy tomato-based chicken curry', price: 280, category: 'Main Course', isVeg: false },
        { name: 'Paneer Tikka', description: 'Marinated cottage cheese grilled to perfection', price: 220, category: 'Starters', isVeg: true },
        { name: 'Biryani', description: 'Fragrant basmati rice with spices and herbs', price: 250, category: 'Main Course', isVeg: false },
        { name: 'Dal Makhani', description: 'Slow-cooked black lentils in a rich buttery gravy', price: 180, category: 'Main Course', isVeg: true },
        { name: 'Garlic Naan', description: 'Soft bread with garlic and butter', price: 60, category: 'Breads', isVeg: true },
        { name: 'Gulab Jamun', description: 'Deep-fried milk dumplings in sugar syrup', price: 100, category: 'Desserts', isVeg: true },
    ],
    'Pizza Paradise': [
        { name: 'Margherita Pizza', description: 'Classic tomato, mozzarella, and basil', price: 350, category: 'Pizza', isVeg: true },
        { name: 'Pepperoni Pizza', description: 'Loaded with spicy pepperoni and cheese', price: 420, category: 'Pizza', isVeg: false },
        { name: 'Garlic Bread', description: 'Crispy bread with garlic butter and herbs', price: 150, category: 'Starters', isVeg: true },
        { name: 'Pasta Alfredo', description: 'Creamy white sauce pasta with mushrooms', price: 280, category: 'Pasta', isVeg: true },
        { name: 'BBQ Chicken Pizza', description: 'Smoky BBQ sauce with grilled chicken', price: 450, category: 'Pizza', isVeg: false },
        { name: 'Tiramisu', description: 'Classic Italian coffee-flavoured dessert', price: 200, category: 'Desserts', isVeg: true },
    ],
    'Dragon Wok': [
        { name: 'Kung Pao Chicken', description: 'Spicy stir-fried chicken with peanuts', price: 260, category: 'Main Course', isVeg: false },
        { name: 'Veg Manchurian', description: 'Deep-fried veggie balls in tangy sauce', price: 180, category: 'Starters', isVeg: true },
        { name: 'Fried Rice', description: 'Wok-tossed rice with vegetables and soy sauce', price: 160, category: 'Rice', isVeg: true },
        { name: 'Spring Rolls', description: 'Crispy rolls stuffed with vegetables', price: 140, category: 'Starters', isVeg: true },
        { name: 'Chilli Chicken', description: 'Spicy chicken tossed with peppers and onions', price: 240, category: 'Main Course', isVeg: false },
        { name: 'Hakka Noodles', description: 'Stir-fried noodles with vegetables', price: 170, category: 'Noodles', isVeg: true },
    ],
    'Burger Barn': [
        { name: 'Classic Cheese Burger', description: 'Beef patty with cheddar, lettuce, and tomato', price: 220, category: 'Burgers', isVeg: false },
        { name: 'Veggie Burger', description: 'Crispy veggie patty with fresh toppings', price: 180, category: 'Burgers', isVeg: true },
        { name: 'Chicken Wings', description: 'Crispy fried wings with spicy sauce', price: 250, category: 'Starters', isVeg: false },
        { name: 'French Fries', description: 'Hand-cut golden fries with seasoning', price: 120, category: 'Sides', isVeg: true },
        { name: 'Double Smash Burger', description: 'Two smashed patties with special sauce', price: 320, category: 'Burgers', isVeg: false },
        { name: 'Chocolate Milkshake', description: 'Thick creamy chocolate shake', price: 150, category: 'Beverages', isVeg: true },
    ],
    'Sushi Zen': [
        { name: 'Salmon Nigiri', description: 'Fresh salmon over seasoned rice', price: 350, category: 'Sushi', isVeg: false },
        { name: 'California Roll', description: 'Crab, avocado, and cucumber roll', price: 320, category: 'Sushi', isVeg: false },
        { name: 'Edamame', description: 'Steamed soybean pods with sea salt', price: 150, category: 'Starters', isVeg: true },
        { name: 'Miso Soup', description: 'Traditional Japanese soybean soup', price: 120, category: 'Soups', isVeg: true },
        { name: 'Tempura Prawns', description: 'Lightly battered and fried prawns', price: 400, category: 'Main Course', isVeg: false },
        { name: 'Matcha Ice Cream', description: 'Green tea flavoured ice cream', price: 180, category: 'Desserts', isVeg: true },
    ],
    'Taco Fiesta': [
        { name: 'Chicken Tacos', description: 'Soft tortillas with seasoned chicken and salsa', price: 200, category: 'Tacos', isVeg: false },
        { name: 'Veggie Burrito', description: 'Loaded burrito with beans, rice, and veggies', price: 220, category: 'Burritos', isVeg: true },
        { name: 'Nachos Supreme', description: 'Tortilla chips with cheese, jalapeños, and salsa', price: 180, category: 'Starters', isVeg: true },
        { name: 'Quesadilla', description: 'Grilled tortilla with melted cheese and fillings', price: 190, category: 'Main Course', isVeg: true },
        { name: 'Churros', description: 'Fried dough sticks with cinnamon sugar', price: 120, category: 'Desserts', isVeg: true },
        { name: 'Mexican Rice Bowl', description: 'Spiced rice with beans and grilled veggies', price: 210, category: 'Bowls', isVeg: true },
    ],
};

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Clear existing data
        await Restaurant.deleteMany({});
        await MenuItem.deleteMany({});
        console.log('Cleared existing restaurants and menu items');

        // Insert restaurants
        const createdRestaurants = await Restaurant.insertMany(restaurants);
        console.log(`Inserted ${createdRestaurants.length} restaurants`);

        // Insert menu items for each restaurant
        let totalItems = 0;
        for (const rest of createdRestaurants) {
            const items = menuItemsByRestaurant[rest.name];
            if (items) {
                const menuItems = items.map((item) => ({
                    ...item,
                    restaurant: rest._id,
                    imageUrl: '',
                }));
                await MenuItem.insertMany(menuItems);
                totalItems += menuItems.length;
                console.log(`  -> ${rest.name}: ${menuItems.length} menu items`);
            }
        }

        console.log(`\nDone! Inserted ${createdRestaurants.length} restaurants and ${totalItems} menu items.`);
        process.exit(0);
    } catch (err) {
        console.error('Seed error:', err.message);
        process.exit(1);
    }
}

seed();
