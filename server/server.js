require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require('./config/database');

// Import models
const Category = require('./models/Category');
const Product = require('./models/Product');
const Client = require('./models/Client');
const Employee = require('./models/Employee');
const Order = require('./models/Order');
const Cart = require('./models/Cart');
const Notification = require('./models/Notification');

// Connect to database
connectDB();

app.use(cors({ origin: ["http://localhost:5173"] }));
app.use(express.json());

// Helper function to generate order ID
const generateOrderId = async () => {
  const lastOrder = await Order.findOne().sort({ id: -1 });
  const maxId = lastOrder ? parseInt(lastOrder.id) : 677;
  return (maxId + 1).toString();
};

// Helper function to get client email by name
const getClientEmailByName = async (clientName) => {
  const client = await Client.findOne({ name: clientName });
  return client ? client.email : null;
};

// Category routes (previously fruits)
app.get("/api", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({ fruits: categories });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api", async (req, res) => {
  try {
    const { title, image } = req.body;
    if (!title || !image) return res.status(400).json({ error: "Missing fields" });
    
    const newCategory = new Category({ title, image });
    await newCategory.save();
    res.status(201).json({ message: "Category added" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Client routes
app.get("/clients", async (req, res) => {
  try {
    const clients = await Client.find();
    res.json({ clients });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/clients", async (req, res) => {
  try {
    const { name, email, contact, address, password } = req.body;
    if (!name || !email || !contact || !address) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newClient = new Client({
      name,
      email,
      contact,
      address,
      password: password || 'listiphy@123'
    });
    await newClient.save();
    res.status(201).json({ message: "Client added successfully" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email already exists" });
    }
    res.status(500).json({ error: error.message });
  }
});

app.delete("/clients/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedClient = await Client.findByIdAndDelete(id);
    if (!deletedClient) {
      return res.status(404).json({ error: "Client not found" });
    }
    res.json({ message: "Client deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Employee routes
app.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json({ employees });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/employees", async (req, res) => {
  try {
    const { name, email, contact, role, dept, salary, leaves, password } = req.body;
    if (!name || !email || !contact || !role || !dept || salary === undefined || leaves === undefined) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newEmployee = new Employee({
      name,
      email,
      contact,
      role,
      dept,
      salary: parseFloat(salary),
      leaves: parseInt(leaves),
      password: password || 'listiphy@1234'
    });
    await newEmployee.save();
    res.status(201).json({ message: "Employee added successfully" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email already exists" });
    }
    res.status(500).json({ error: error.message });
  }
});

app.patch("/employees/:id/leaves", async (req, res) => {
  try {
    const { id } = req.params;
    const { leaves } = req.body;
    
    if (leaves === undefined || leaves < 0) {
      return res.status(400).json({ error: "Invalid leaves value" });
    }
    
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { leaves: parseInt(leaves) },
      { new: true }
    );
    
    if (!updatedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    
    res.json({ message: "Leaves updated successfully", employee: updatedEmployee });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Product routes
app.get("/products/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.find({ 
      category: { $regex: new RegExp(category, 'i') }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/products", async (req, res) => {
  try {
    const { title, image, category, price } = req.body;
    if (!title || !image || !category || !price) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newProduct = new Product({
      title,
      image,
      category,
      price: parseFloat(price),
      quantity: 0
    });
    await newProduct.save();
    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch("/products/:title", async (req, res) => {
  try {
    const { title } = req.params;
    const { quantityToAdd } = req.body;
    
    const product = await Product.findOne({ title });
    if (!product) return res.status(404).json({ error: "Product not found" });

    product.quantity += quantityToAdd;
    await product.save();
    res.json({ message: "Quantity updated", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Order routes
app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/orders", async (req, res) => {
  try {
    const { client, price, quantity, productTitle, productName, is_custom, description, image } = req.body;
    if (!client || !quantity || !productName) {
      return res.status(400).json({ error: "Client, quantity, and product name are required" });
    }

    // Get client email from clients collection
    const clientEmail = await getClientEmailByName(client);
    if (!clientEmail) {
      return res.status(400).json({ error: "Client not found in database" });
    }

    // Only check inventory for non-custom orders
    if (!is_custom) {
      // Find the product
      const product = await Product.findOne({
        title: productTitle || productName
      });

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      // Check if enough quantity is available
      if (product.quantity < parseInt(quantity)) {
        return res.status(400).json({ error: "Stock exceeded. Not enough quantity in stock." });
      }

      // Deduct ordered quantity
      product.quantity -= parseInt(quantity);
      await product.save();
    }

    const orderId = await generateOrderId();
    const newOrder = new Order({
      id: orderId,
      client,
      email: clientEmail,
      price: parseFloat(price || 0),
      quantity: parseInt(quantity),
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
      productName,
      productTitle: productTitle || productName,
      is_custom: is_custom || false,
      description: is_custom ? description || '' : undefined,
      image: is_custom ? image || '' : undefined
    });

    await newOrder.save();
    res.status(201).json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update order status
app.patch("/orders/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const order = await Order.findOneAndUpdate(
      { id: id },
      { status: status },
      { new: true }
    );
    
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get custom order details
app.get("/orders/:id/custom-details", async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({ id: id });
    
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
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cart routes
app.get("/cart", async (req, res) => {
  try {
    const cartItems = await Cart.find().sort({ createdAt: -1 });
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/cart", async (req, res) => {
  try {
    const { client, price, quantity, productTitle, productName, productImage } = req.body;
    
    if (!client || !price || !quantity || !productName) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Get client email
    const clientEmail = await getClientEmailByName(client);
    if (!clientEmail) {
      return res.status(400).json({ error: "Client not found in database" });
    }
    
    const cartItem = new Cart({
      client,
      email: clientEmail,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      productTitle: productTitle || productName,
      productName,
      productImage: productImage || '',
      dateAdded: new Date().toISOString().split('T')[0]
    });
    
    await cartItem.save();
    res.status(201).json({ message: "Item added to cart successfully", cartItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/cart/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const removedItem = await Cart.findByIdAndDelete(id);
    
    if (!removedItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }
    
    res.json({ message: "Item removed from cart successfully", removedItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Place all cart orders
app.post("/cart/place-orders", async (req, res) => {
  try {
    const cartItems = await Cart.find();
    
    if (cartItems.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    // Check stock for each cart item before processing orders
    for (const cartItem of cartItems) {
      const product = await Product.findOne({
        title: cartItem.productTitle || cartItem.productName
      });
      
      if (!product) {
        return res.status(404).json({ error: `Product not found: ${cartItem.productName}` });
      }
      
      if (product.quantity < cartItem.quantity) {
        return res.status(400).json({ 
          error: `Stock exceeded for ${cartItem.productName}. Only ${product.quantity} left.` 
        });
      }
    }

    // All cart items have enough stock; proceed with placing orders and updating stock
    const newOrders = [];
    
    for (const cartItem of cartItems) {
      const product = await Product.findOne({
        title: cartItem.productTitle || cartItem.productName
      });
      
      // Deduct the quantity
      product.quantity -= cartItem.quantity;
      await product.save();

      const orderId = await generateOrderId();
      const newOrder = new Order({
        id: orderId,
        client: cartItem.client,
        email: cartItem.email,
        price: cartItem.price,
        quantity: cartItem.quantity,
        status: 'Pending',
        date: new Date().toISOString().split('T')[0],
        productName: cartItem.productName,
        productTitle: cartItem.productTitle,
        is_custom: false
      });

      await newOrder.save();
      newOrders.push(newOrder);
    }

    // Clear the cart
    await Cart.deleteMany({});
    
    res.json({
      message: `Successfully placed ${newOrders.length} orders`,
      orders: newOrders
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Notification Routes
app.post('/notifications', async (req, res) => {
  try {
    const { title, message } = req.body;
    if (!title || !message) {
      return res.status(400).json({ error: 'Title and message are required' });
    }
    
    const newNotification = new Notification({
      title,
      message,
      date: new Date()
    });
    
    await newNotification.save();
    res.status(201).json({ message: 'Notification added', notification: newNotification });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/notifications', async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));