require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/database');

// Import models
const Category = require('./models/Category');
const Product = require('./models/Product');
const Client = require('./models/Client');
const Employee = require('./models/Employee');
const Order = require('./models/Order');

// Sample data
const categories = [
  { title: 'Electronics', image: 'https://plus.unsplash.com/premium_photo-1679079456083-9f288e224e96?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RWxlY3Ryb25pY3N8ZW58MHx8MHx8fDA%3D' },
  { title: 'Fashion', image: 'https://plus.unsplash.com/premium_photo-1664202526559-e21e9c0fb46a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D' },
  { title: 'Gym Products', image: 'https://plus.unsplash.com/premium_photo-1671029147941-b4c5ffd9d1d2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3ltJTIwcHJvZHVjdHN8ZW58MHx8MHx8fDA%3D' },
  { title: 'Home Decor', image: 'https://plus.unsplash.com/premium_photo-1670360414946-e33a828d1d52?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG9tZSUyMGRlY29yfGVufDB8fDB8fHww' },
  { title: 'Kitchen Products', image: 'https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2l0Y2hlbiUyMHByb2R1Y3RzfGVufDB8fDB8fHww' },
];

const products = [
  { title: "iPhone 15", image: "https://images.unsplash.com/photo-1695048132832-b41495f12eb4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aXBob25lJTIwMTV8ZW58MHx8MHx8fDA%3D", category: "Electronics", price: 79900, quantity: 10},
  { title: "Smart TV", image: "https://images.unsplash.com/photo-1646861039459-fd9e3aabf3fb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c21hcnQlMjB0dnxlbnwwfHwwfHx8MA%3D%3D", category: "Electronics", price: 45000, quantity: 10 },
  { title: "Men's Jacket", image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVuJTIwamFja2V0fGVufDB8fDB8fHww", category: "Fashion", price: 2999, quantity: 10 },
  { title: "Yoga Mat", image: "https://plus.unsplash.com/premium_photo-1675155952889-abb299df1fe7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8eW9nYSUyMG1hdHxlbnwwfHwwfHx8MA%3D%3D", category: "Gym Products", price: 1299, quantity: 10},
  { title: "Wall Clock", image: "https://plus.unsplash.com/premium_photo-1725075084045-4c1ee2ab9349?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2FsbCUyMGNsb2NrfGVufDB8fDB8fHww", category: "Home Decor", price: 899, quantity: 10},
  { title: "Mixer Grinder", image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWl4ZXIlMjBncmluZGVyfGVufDB8fDB8fHww", category: "Kitchen Products", price: 3499, quantity: 10 }
];

const clients = [
  { name: 'Abhishek', email: 'abhishek@gmail.com', contact: '4444444444', address: 'delhi', password: 'listiphy@123' },
  { name: 'harsh', email: 'harsh@gmail.com', contact: '9999999993', address: 'rohtak', password: 'listiphy@123' },
  { name: 'neha', email: 'neha@gmail.com', contact: '9999999994', address: 'panipat', password: 'listiphy@123' },
  { name: 'uma', email: 'uma@gmail.com', contact: '9999999995', address: 'gurugram', password: 'listiphy@123' },
  { name: 'justin', email: 'justin@gmail.com', contact: '8295937215', address: 'hisar', password: 'listiphy@123' },
];

const employees = [
  { name: 'Emp 1', email: 'emp1@yopmail.com', contact: '1234567980', role: 'Employee', dept: 'Operations', salary: 45000, leaves: 2, password: 'listiphy@1234' },
  { name: 'Bhawani Sharma', email: '1234567890@gmail.com', contact: '1234567890', role: 'Employee', dept: 'Operations', salary: 52000, leaves: 1, password: 'listiphy@1234' },
  { name: 'Manubhav Batra', email: 'batra123@yopmail.com', contact: '9718046008', role: 'Employee', dept: 'Operations', salary: 48000, leaves: 3, password: 'listiphy@1234' },
  { name: 'Prod Test', email: 'prodtest@yopmail.com', contact: '9999955555', role: 'Employee', dept: 'Production', salary: 55000, leaves: 0, password: 'listiphy@1234' },
];

const orders = [
  { id: '678', client: 'Yash Yash', email: 'yash.demo@example.com', price: 400, quantity: 3, status: 'Pending', date: '2024-07-14', productName: 'Sample Product 1', is_custom: false },
  { id: '679', client: 'Manubhav Batra', email: 'manubhav.demo@example.com', price: 950, quantity: 1, status: 'In Progress', date: '2024-07-13', productName: 'Sample Product 2', is_custom: false },
  { id: '680', client: 'Prod Test', email: 'prod.demo@example.com', price: 700, quantity: 3, status: 'Completed', date: '2024-07-10', productName: 'Sample Product 3', is_custom: false },
  { id: '681', client: 'Test Client', email: 'test.demo@example.com', price: 750, quantity: 1, status: 'Rejected', date: '2024-07-11', productName: 'Sample Product 4', is_custom: false },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log('Clearing existing data...');
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Client.deleteMany({});
    await Employee.deleteMany({});
    await Order.deleteMany({});

    // Insert new data
    console.log('Seeding categories...');
    await Category.insertMany(categories);

    console.log('Seeding products...');
    await Product.insertMany(products);

    console.log('Seeding clients...');
    await Client.insertMany(clients);

    console.log('Seeding employees...');
    await Employee.insertMany(employees);

    console.log('Seeding orders...');
    await Order.insertMany(orders);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();