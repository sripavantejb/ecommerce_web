const mongoose = require('mongoose');
const Item = require('./models/Item');
require('dotenv').config({ path: './config.env' });

const sampleItems = [
  {
    name: 'iPhone 15 Pro',
    description: 'Latest iPhone with advanced camera system and A17 Pro chip',
    price: 999,
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300',
    stock: 50
  },
  {
    name: 'MacBook Air M2',
    description: 'Ultra-thin laptop with M2 chip for exceptional performance',
    price: 1199,
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300',
    stock: 30
  },
  {
    name: 'Nike Air Max 270',
    description: 'Comfortable running shoes with Max Air cushioning',
    price: 150,
    category: 'Clothing',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300',
    stock: 100
  },
  {
    name: 'The Great Gatsby',
    description: 'Classic American novel by F. Scott Fitzgerald',
    price: 12,
    category: 'Books',
    imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300',
    stock: 200
  },
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality noise-cancelling headphones with 30-hour battery',
    price: 199,
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300',
    stock: 75
  },
  {
    name: 'Cotton T-Shirt',
    description: 'Comfortable 100% cotton t-shirt in various colors',
    price: 25,
    category: 'Clothing',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300',
    stock: 150
  },
  {
    name: 'Garden Tools Set',
    description: 'Complete set of gardening tools for home use',
    price: 89,
    category: 'Home & Garden',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300',
    stock: 40
  },
  {
    name: 'Basketball',
    description: 'Official size basketball for indoor and outdoor play',
    price: 35,
    category: 'Sports',
    imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=300',
    stock: 60
  },
  {
    name: 'LEGO Creator Set',
    description: 'Creative building set for kids and adults',
    price: 79,
    category: 'Toys',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300',
    stock: 80
  },
  {
    name: 'JavaScript: The Good Parts',
    description: 'Essential guide to JavaScript programming',
    price: 29,
    category: 'Books',
    imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300',
    stock: 120
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');
    console.log('Connected to MongoDB');

    // Clear existing items
    await Item.deleteMany({});
    console.log('Cleared existing items');

    // Insert sample items
    await Item.insertMany(sampleItems);
    console.log('Sample items inserted successfully');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run seed function
seedDatabase();
