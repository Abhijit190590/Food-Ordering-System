# 🍔 FoodExpress - Online Food Ordering System

A full-stack **MEAN (MongoDB, Express.js, Angular, Node.js)** web application for online food ordering.

## Features

### Customer Features
- 🔐 User Registration & Login (JWT Authentication)
- 🍕 Browse Restaurants with search & filter
- 📋 View Restaurant Menus grouped by category
- 🛒 Add items to Cart with quantity controls
- 📦 Checkout with delivery address & payment method
- 📜 View Order History with order status tracking

### Admin Features
- 🏪 Add new Restaurants
- 🍽️ Add Menu Items to restaurants
- 📊 Manage order statuses

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Angular 16 |
| Backend API | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Authentication | JWT (JSON Web Tokens) |
| Styling | Custom CSS (Dark Theme) |

## Project Structure

```
Project/
├── backend/
│   ├── middleware/    # JWT auth middleware
│   ├── models/       # Mongoose models (User, Restaurant, MenuItem, Cart, Order)
│   ├── routes/       # Express routes (auth, restaurants, menu, cart, orders)
│   ├── server.js     # Entry point
│   ├── .env          # Environment config
│   └── package.json
├── frontend/
│   └── src/
│       └── app/
│           ├── components/   # Angular components (home, cart, checkout, etc.)
│           ├── services/     # HTTP services
│           ├── guards/       # Auth & Admin guards
│           ├── interceptors/ # JWT interceptor
│           └── models/       # TypeScript interfaces
└── README.md
```

## Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (running locally on port 27017, or update `.env`)
- **Angular CLI** (`npm install -g @angular/cli`)

## Setup & Run

### 1. Backend
```bash
cd backend
npm install
npm start
```
The API server runs on **http://localhost:5000**

### 2. Frontend
```bash
cd frontend
npm install
ng serve
```
The Angular app runs on **http://localhost:4200**

### 3. Quick Start
1. Make sure MongoDB is running
2. Start the backend server
3. Start the Angular dev server
4. Open http://localhost:4200 in your browser
5. Register a new account and start ordering!

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get profile | Yes |
| GET | `/api/restaurants` | List restaurants | No |
| GET | `/api/restaurants/:id` | Get restaurant | No |
| POST | `/api/restaurants` | Add restaurant | Admin |
| GET | `/api/menu/:restaurantId` | Get menu | No |
| POST | `/api/menu` | Add menu item | Admin |
| GET | `/api/cart` | Get cart | Yes |
| POST | `/api/cart/add` | Add to cart | Yes |
| PUT | `/api/cart/update` | Update quantity | Yes |
| DELETE | `/api/cart/clear` | Clear cart | Yes |
| POST | `/api/orders` | Place order | Yes |
| GET | `/api/orders` | Get my orders | Yes |
"# Food-Ordering-System" 
"# Food-Ordering-System" 
