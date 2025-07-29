const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors({ origin: ["http://localhost:5173"] }));
app.use(express.json());

let fruits = [
  { title: 'Electronics', image: 'https://plus.unsplash.com/premium_photo-1679079456083-9f288e224e96?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RWxlY3Ryb25pY3N8ZW58MHx8MHx8fDA%3D' },
  { title: 'Fashion', image: 'https://plus.unsplash.com/premium_photo-1664202526559-e21e9c0fb46a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D' },
  { title: 'Gym Products', image: 'https://plus.unsplash.com/premium_photo-1671029147941-b4c5ffd9d1d2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3ltJTIwcHJvZHVjdHN8ZW58MHx8MHx8fDA%3D' },
  { title: 'Home Decor', image: 'https://plus.unsplash.com/premium_photo-1670360414946-e33a828d1d52?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG9tZSUyMGRlY29yfGVufDB8fDB8fHww' },
  { title: 'Kitchen Products', image: 'https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2l0Y2hlbiUyMHByb2R1Y3RzfGVufDB8fDB8fHww' },
];

let products = [
  { title: "iPhone 15", image: "https://images.unsplash.com/photo-1695048132832-b41495f12eb4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aXBob25lJTIwMTV8ZW58MHx8MHx8fDA%3D", category: "Electronics", price: 79900, quantity: 10},
  { title: "Smart TV", image: "https://images.unsplash.com/photo-1646861039459-fd9e3aabf3fb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c21hcnQlMjB0dnxlbnwwfHwwfHx8MA%3D%3D", category: "Electronics", price: 45000, quantity: 10 },
  { title: "Men's Jacket", image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVuJTIwamFja2V0fGVufDB8fDB8fHww", category: "Fashion", price: 2999, quantity: 10 },
  { title: "Yoga Mat", image: "https://plus.unsplash.com/premium_photo-1675155952889-abb299df1fe7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8eW9nYSUyMG1hdHxlbnwwfHwwfHx8MA%3D%3D", category: "Gym Products", price: 1299, quantity: 10},
  { title: "Wall Clock", image: "https://plus.unsplash.com/premium_photo-1725075084045-4c1ee2ab9349?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2FsbCUyMGNsb2NrfGVufDB8fDB8fHww", category: "Home Decor", price: 899, quantity: 10},
  { title: "Mixer Grinder", image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWl4ZXIlMjBncmluZGVyfGVufDB8fDB8fHww", category: "Kitchen Products", price: 3499, quantity: 10 }
];

// Clients data 
let clients = [
  { name: 'Abhishek', email: 'abhishek@gmail.com', contact: '4444444444', address: 'delhi', password: 'listiphy@123' },
  { name: 'harsh', email: 'harsh@gmail.com', contact: '9999999993', address: 'rohtak', password: 'listiphy@123' },
  { name: 'neha', email: 'neha@gmail.com', contact: '9999999994', address: 'panipat', password: 'listiphy@123' },
  { name: 'uma', email: 'uma@gmail.com', contact: '9999999995', address: 'gurugram', password: 'listiphy@123' },
  { name: 'justin', email: 'justin@gmail.com', contact: '8295937215', address: 'hisar', password: 'listiphy@123' },
];

// Employees data 
let employees = [
  { name: 'Emp 1', email: 'emp1@yopmail.com', contact: '1234567980', role: 'Employee', dept: 'Operations', salary: 45000, leaves: 2, password: 'listiphy@1234' },
  { name: 'Bhawani Sharma', email: '1234567890@gmail.com', contact: '1234567890', role: 'Employee', dept: 'Operations', salary: 52000, leaves: 1, password: 'listiphy@1234' },
  { name: 'Manubhav Batra', email: 'batra123@yopmail.com', contact: '9718046008', role: 'Employee', dept: 'Operations', salary: 48000, leaves: 3, password: 'listiphy@1234' },
  { name: 'Prod Test', email: 'prodtest@yopmail.com', contact: '9999955555', role: 'Employee', dept: 'Production', salary: 55000, leaves: 0, password: 'listiphy@1234' },
];

// orders data
let orders = [
  { id: '678', client: 'Yash Yash', email: 'yash.demo@example.com', price: 400, quantity: 3, status: 'Pending', date: '2024-07-14', productName: 'Sample Product 1', is_custom: false },
  { id: '679', client: 'Manubhav Batra', email: 'manubhav.demo@example.com', price: 950, quantity: 1, status: 'In Progress', date: '2024-07-13', productName: 'Sample Product 2', is_custom: false },
  { id: '680', client: 'Prod Test', email: 'prod.demo@example.com', price: 700, quantity: 3, status: 'Completed', date: '2024-07-10', productName: 'Sample Product 3', is_custom: false },
  { id: '681', client: 'Test Client', email: 'test.demo@example.com', price: 750, quantity: 1, status: 'Rejected', date: '2024-07-11', productName: 'Sample Product 4', is_custom: false },
];

// Cart data
let cart = [];
//for notifications
let notifications = [];

// Helper function to generate order ID
const generateOrderId = () => {
  const existingIds = orders.map(order => parseInt(order.id));
  const maxId = Math.max(...existingIds, 677); // Start from 677 if no orders exist
  return (maxId + 1).toString();
};

// Helper function to get client email by name
const getClientEmailByName = (clientName) => {
  const client = clients.find(c => c.name === clientName);
  return client ? client.email : null;
};

// Existing routes
app.get("/api", (req, res) => {
  res.json({ fruits });
});

app.post("/api", (req, res) => {
  const { title, image } = req.body;
  if (!title || !image) return res.status(400).json({ error: "Missing fields" });
  fruits.push({ title, image });
  res.status(201).json({ message: "Category added" });
});

// Client routes
app.get("/clients", (req, res) => {
  res.json({ clients });
});

app.post("/clients", (req, res) => {
  const { name, email, contact, address, password } = req.body;
  if (!name || !email || !contact || !address) {
    return res.status(400).json({ error: "All fields are required" });
  }
  clients.push({ 
    name, 
    email, 
    contact, 
    address, 
    password: password || 'listiphy@123' // Default password if not provided
  });
  res.status(201).json({ message: "Client added successfully" });
});

// Employee routes
app.get("/employees", (req, res) => {
  res.json({ employees });
});

app.post("/employees", (req, res) => {
  const { name, email, contact, role, dept, salary, leaves, password } = req.body;
  if (!name || !email || !contact || !role || !dept || salary === undefined || leaves === undefined) {
    return res.status(400).json({ error: "All fields are required" });
  }
  employees.push({ 
    name, 
    email, 
    contact, 
    role, 
    dept, 
    salary: parseFloat(salary), 
    leaves: parseInt(leaves),
    password: password || 'listiphy@1234' // Default password if not provided
  });
  res.status(201).json({ message: "Employee added successfully" });
});

// Product routes
app.get("/products/:category", (req, res) => {
  const category = req.params.category;
  const filtered = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
  res.json(filtered);
});

app.post("/products", (req, res) => {
  const { title, image, category, price } = req.body;
  if (!title || !image || !category || !price) {
    return res.status(400).json({ error: "All fields are required" });
  }
  products.push({ title, image, category, price: parseFloat(price), quantity: 0});
  res.status(201).json({ message: "Product added successfully" });
});

app.patch("/products/:title", (req, res) => {
  const { title } = req.params;
  const { quantityToAdd } = req.body;
  const product = products.find(p => p.title === title);
  if (!product) return res.status(404).json({ error: "Product not found" });

  product.quantity += quantityToAdd;
  res.json({ message: "Quantity updated", product });
});

app.get("/products", (req, res) => {
  res.json(products);
});

// Update employee leaves
app.patch("/employees/:index/leaves", (req, res) => {
  const index = parseInt(req.params.index);
  const { leaves } = req.body;
  
  if (index < 0 || index >= employees.length) {
    return res.status(404).json({ error: "Employee not found" });
  }
  
  if (leaves === undefined || leaves < 0) {
    return res.status(400).json({ error: "Invalid leaves value" });
  }
  
  employees[index].leaves = parseInt(leaves);
  res.json({ message: "Leaves updated successfully", employee: employees[index] });
});

// Delete routes
app.delete("/clients/:index", (req, res) => {
  const index = parseInt(req.params.index);
  if (index < 0 || index >= clients.length) {
    return res.status(404).json({ error: "Client not found" });
  }
  clients.splice(index, 1);
  res.json({ message: "Client deleted successfully" });
});

app.delete("/employees/:index", (req, res) => {
  const index = parseInt(req.params.index);
  if (index < 0 || index >= employees.length) {
    return res.status(404).json({ error: "Employee not found" });
  }
  employees.splice(index, 1);
  res.json({ message: "Employee deleted successfully" });
});

// Order routes
// Get all orders
app.get("/orders", (req, res) => {
  res.json(orders);
});

// Create new order - UPDATED VERSION with email field
app.post("/orders", (req, res) => {
  const { client, price, quantity, productTitle, productName, is_custom, description, image } = req.body;
  if (!client || !quantity || !productName) {
    return res.status(400).json({ error: "Client, quantity, and product name are required" });
  }

  // Get client email from clients array
  const clientEmail = getClientEmailByName(client);
  if (!clientEmail) {
    return res.status(400).json({ error: "Client not found in database" });
  }

  // Only check inventory for non-custom orders
  if (!is_custom) {
    // Find the product
    const product = products.find(
      (p) => p.title === (productTitle || productName)
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Check if enough quantity is available
    if (product.quantity < parseInt(quantity)) {
      return res.status(400).json({ error: "Stock exceeded. Not enough quantity in stock." });
    }

    // Deduct ordered quantity
    product.quantity -= parseInt(quantity);
  }

  const newOrder = {
    id: generateOrderId(),
    client,
    email: clientEmail, // Adding email field
    price: parseFloat(price || 0),
    quantity: parseInt(quantity),
    status: 'Pending',
    date: new Date().toISOString().split('T')[0],
    productName,
    productTitle: productTitle || productName,
    is_custom: is_custom || false
  };

  // Add custom order specific fields if it's a custom order
  if (is_custom) {
    newOrder.description = description || '';
    newOrder.image = image || '';
  }

  orders.push(newOrder);
  res.status(201).json({ message: "Order created successfully", order: newOrder });
});

// Update order status
app.patch("/orders/:id/status", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const order = orders.find((o) => o.id === id);
  if (!order) return res.status(404).json({ error: "Order not found" });
  order.status = status;
  res.json({ message: "Order status updated", order });
});

// Get custom order details
app.get("/orders/:id/custom-details", (req, res) => {
  const { id } = req.params;
  const order = orders.find((o) => o.id === id);
  
  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }
  
  if (!order.is_custom) {
    return res.status(400).json({ error: "This is not a custom order" });
  }
  
  res.json({
    id: order.id,
    productName: order.productName,
    description: order.description,
    image: order.image,
    client: order.client,
    email: order.email,
    quantity: order.quantity,
    date: order.date,
    status: order.status
  });
});

// Cart routes
// Get all cart items
app.get("/cart", (req, res) => {
  res.json(cart);
});

// Add item to cart
app.post("/cart", (req, res) => {
  const { client, price, quantity, productTitle, productName, productImage } = req.body;
  
  if (!client || !price || !quantity || !productName) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Get client email
  const clientEmail = getClientEmailByName(client);
  if (!clientEmail) {
    return res.status(400).json({ error: "Client not found in database" });
  }
  
  const cartItem = {
    client,
    email: clientEmail, // Adding email field
    price: parseFloat(price),
    quantity: parseInt(quantity),
    productTitle: productTitle || productName,
    productName,
    productImage: productImage || '', // Optional field
    dateAdded: new Date().toISOString().split('T')[0]
  };
  
  cart.push(cartItem);
  res.status(201).json({ message: "Item added to cart successfully", cartItem });
});

// Remove item from cart
app.delete("/cart/:index", (req, res) => {
  const index = parseInt(req.params.index);
  if (index < 0 || index >= cart.length) {
    return res.status(404).json({ error: "Cart item not found" });
  }
  
  const removedItem = cart.splice(index, 1)[0];
  res.json({ message: "Item removed from cart successfully", removedItem });
});

// Place all cart orders  including email field
app.post("/cart/place-orders", (req, res) => {
  if (cart.length === 0) {
    return res.status(400).json({ error: "Cart is empty" });
  }

  // Check stock for each cart item before processing orders
  for (const cartItem of cart) {
    const product = products.find(
      (p) => p.title === (cartItem.productTitle || cartItem.productName)
    );
    if (!product) {
      return res.status(404).json({ error: `Product not found: ${cartItem.productName}` });
    }
    if (product.quantity < cartItem.quantity) {
      return res.status(400).json({ error: `Stock exceeded for ${cartItem.productName}. Only ${product.quantity} left.` });
    }
  }

  // All cart items have enough stock; proceed with placing orders and updating stock
  const newOrders = cart.map(cartItem => {
    const product = products.find(
      (p) => p.title === (cartItem.productTitle || cartItem.productName)
    );
    // Deduct the quantity
    product.quantity -= cartItem.quantity;

    return {
      id: generateOrderId(),
      client: cartItem.client,
      email: cartItem.email, // Include email field
      price: cartItem.price,
      quantity: cartItem.quantity,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
      productName: cartItem.productName,
      productTitle: cartItem.productTitle,
      is_custom: false
    };
  });

  orders.push(...newOrders);
  const orderCount = cart.length;
  cart = [];
  res.json({
    message: `Successfully placed ${orderCount} orders`,
    orders: newOrders
  });
});

// Notification Routes
app.post('/notifications', (req, res) => {
  const { title, message } = req.body;
  if (!title || !message) {
    return res.status(400).json({ error: 'Title and message are required' });
  }
  const newNotification = {
    id: Date.now(),
    title,
    message,
    date: new Date().toISOString()
  };
  notifications.unshift(newNotification); // newest first
  res.status(201).json({ message: 'Notification added', notification: newNotification });
});

app.get('/notifications', (req, res) => {
  res.json(notifications);
});

app.listen(8080, () => console.log("Server running on port 8080"));