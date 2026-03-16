export interface Restaurant {
    _id: string;
    name: string;
    description: string;
    imageUrl: string;
    cuisineType: string;
    rating: number;
    deliveryTime: string;
    minOrder: number;
}

export interface MenuItem {
    _id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
    isVeg: boolean;
    restaurant: string;
    isAvailable: boolean;
}

export interface CartItem {
    menuItem: string;
    name: string;
    price: number;
    quantity: number;
}

export interface Cart {
    _id?: string;
    user: string;
    restaurant: any;
    items: CartItem[];
}

export interface OrderItem {
    menuItem: string;
    name: string;
    price: number;
    quantity: number;
}

export interface Order {
    _id: string;
    user: string;
    restaurant: any;
    restaurantName: string;
    items: OrderItem[];
    totalAmount: number;
    deliveryAddress: string;
    status: string;
    paymentMethod: string;
    createdAt: string;
}
