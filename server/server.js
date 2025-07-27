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
  { title: "iPhone 15", image: "https://images.unsplash.com/photo-1695048132832-b41495f12eb4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aXBob25lJTIwMTV8ZW58MHx8MHx8fDA%3D", category: "Electronics" },
  { title: "Smart TV", image: "https://images.unsplash.com/photo-1646861039459-fd9e3aabf3fb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c21hcnQlMjB0dnxlbnwwfHwwfHx8MA%3D%3D", category: "Electronics" },
  { title: "Men's Jacket", image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVuJTIwamFja2V0fGVufDB8fDB8fHww", category: "Fashion" },
  { title: "Yoga Mat", image: "https://plus.unsplash.com/premium_photo-1675155952889-abb299df1fe7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8eW9nYSUyMG1hdHxlbnwwfHwwfHx8MA%3D%3D", category: "Gym Products" },
  { title: "Wall Clock", image: "https://plus.unsplash.com/premium_photo-1725075084045-4c1ee2ab9349?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2FsbCUyMGNsb2NrfGVufDB8fDB8fHww", category: "Home Decor" },
  { title: "Mixer Grinder", image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWl4ZXIlMjBncmluZGVyfGVufDB8fDB8fHww", category: "Kitchen Products" }
];

app.get("/api", (req, res) => {
  res.json({ fruits });
});

app.post("/api", (req, res) => {
  const { title, image } = req.body;
  if (!title || !image) return res.status(400).json({ error: "Missing fields" });
  fruits.push({ title, image });
  res.status(201).json({ message: "Category added" });
});

app.get("/products/:category", (req, res) => {
  const category = req.params.category;
  const filtered = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
  res.json(filtered);
});
app.post("/products", (req, res) => {
  const { title, image, category } = req.body;
  if (!title || !image || !category) {
    return res.status(400).json({ error: "All fields are required" });
  }
  products.push({ title, image, category });
  res.status(201).json({ message: "Product added successfully" });
});

app.listen(8080, () => console.log("Server running on port 8080"));
