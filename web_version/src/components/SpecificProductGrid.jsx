// SpecificProductGrid.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const API_URL = import.meta.env.VITE_API_URL;

const SpecificProductGrid = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [clients, setClients] = useState([]);
  const [open, setOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({ title: '', image: '', category: category, price: '', quantity: 0 });
  const [orderData, setOrderData] = useState({ quantity: 1, clientName: '' });
  const [orderAlert, setOrderAlert] = useState({ show: false, message: '', type: 'success' });
  const [cartOpen, setCartOpen] = useState(false);
  const [cartData, setCartData] = useState({ quantity: 1, clientName: '' });

  const fetchCategoryProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/products/${category}`);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchClients = async () => {
    try {
      const res = await axios.get('${API_URL}/clients');
      setClients(res.data.clients);
    } catch (err) {
      console.error('Error fetching clients:', err);
    }
  };

  useEffect(() => {
    fetchCategoryProducts();
    fetchClients();
  }, [category]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewProduct({ title: '', image: '', category, price: '' });
  };

  const handleOrderOpen = (product) => {
    setSelectedProduct(product);
    setOrderOpen(true);
    setOrderData({ quantity: 1, clientName: '' });
  };

  const handleOrderClose = () => {
    setOrderOpen(false);
    setSelectedProduct(null);
    setOrderData({ quantity: 1, clientName: '' });
  };

  const handleCartOpen = (product) => {
    setSelectedProduct(product);
    setCartOpen(true);
    setCartData({ quantity: 1, clientName: '' });
  };

  const handleCartClose = () => {
    setCartOpen(false);
    setSelectedProduct(null);
    setCartData({ quantity: 1, clientName: '' });
  };

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleOrderChange = (e) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  };

  const handleCartChange = (e) => {
    setCartData({ ...cartData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("${API_URL}/products", newProduct);
      await fetchCategoryProducts();
      handleClose();
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  const handlePlaceOrder = async () => {
    if (!orderData.clientName || orderData.quantity <= 0) {
      setOrderAlert({
        show: true,
        message: 'Please select a client and enter a valid quantity',
        type: 'error'
      });
      return;
    }

    try {
      const orderPayload = {
        client: orderData.clientName,
        price: selectedProduct.price,
        quantity: parseInt(orderData.quantity),
        productTitle: selectedProduct.title,
        productName: selectedProduct.title
      };

      await axios.post('${API_URL}/orders', orderPayload);
      
      setOrderAlert({
        show: true,
        message: 'Order placed successfully!',
        type: 'success'
      });
      
      handleOrderClose();
      
      // Hide alert after 3 seconds
      setTimeout(() => {
        setOrderAlert({ show: false, message: '', type: 'success' });
      }, 3000);
      
    } catch (err) {
  console.error('Error placing order:', err);
  // Try to fetch backend message
  let message = 'Error placing order. Please try again.';
  if (err.response && err.response.data && err.response.data.error) {
    message = err.response.data.error;  // <<< show actual error!
  }
  setOrderAlert({ show: true, message, type: 'error' });
}

  };

  const handleAddToCart = async () => {
    if (!cartData.clientName || cartData.quantity <= 0) {
      setOrderAlert({
        show: true,
        message: 'Please select a client and enter a valid quantity',
        type: 'error'
      });
      return;
    }

    try {
      const cartPayload = {
        client: cartData.clientName,
        price: selectedProduct.price,
        quantity: parseInt(cartData.quantity),
        productTitle: selectedProduct.title,
        productName: selectedProduct.title,
        productImage: selectedProduct.image
      };

      await axios.post('${API_URL}/cart', cartPayload);
      
      setOrderAlert({
        show: true,
        message: 'Item added to cart successfully!',
        type: 'success'
      });
      
      handleCartClose();
      
      // Hide alert after 3 seconds
      setTimeout(() => {
        setOrderAlert({ show: false, message: '', type: 'success' });
      }, 3000);
      
    } catch (err) {
      console.error('Error adding to cart:', err);
      setOrderAlert({
        show: true,
        message: 'Error adding to cart. Please try again.',
        type: 'error'
      });
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div>
      <Typography variant="h5" sx={{ m: 2 }}>Products in {category}</Typography>
      
      {orderAlert.show && (
        <Alert 
          severity={orderAlert.type} 
          sx={{ m: 2 }}
          onClose={() => setOrderAlert({ show: false, message: '', type: 'success' })}
        >
          {orderAlert.message}
        </Alert>
      )}
      
      <Grid container spacing={3}>
        {products.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 4,
                backgroundColor: '#2f2b3e',
                color: '#fff',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}
            >
              <CardMedia
                component="img"
                height="160"
                image={product.image}
                alt={product.title}
              />
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="subtitle1" align="center" fontWeight="bold">
                  {product.title}
                </Typography>
                <Typography variant="h6" align="center" sx={{ color: '#4CAF50', fontWeight: 'bold', mt: 1 }}>
                  {formatPrice(product.price)}
                </Typography>
                <Typography variant="body2" align="center" sx={{ mt: 1, mb: 2 }}>
                  Quantity: {product.quantity}
                </Typography>
                
                <Box sx={{ mt: 'auto', display: 'flex', gap: 1, justifyContent: 'center' }}>
                  <Button 
                    variant="contained" 
                    size="small"
                    onClick={() => handleCartOpen(product)}
                    sx={{ 
                      backgroundColor: '#4CAF50', 
                      '&:hover': { backgroundColor: '#45a049' },
                      flex: 1,
                      maxWidth: '120px'
                    }}
                  >
                    Add to Cart
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="small"
                    onClick={() => handleOrderOpen(product)}
                    sx={{ 
                      borderColor: '#FF9800', 
                      color: '#FF9800',
                      '&:hover': { 
                        borderColor: '#e68900', 
                        backgroundColor: 'rgba(255, 152, 0, 0.1)' 
                      },
                      flex: 1,
                      maxWidth: '120px'
                    }}
                  >
                    Place Order
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Fab
        color="primary"
        onClick={handleOpen}
        sx={{ position: 'fixed', bottom: 40, right: 40 }}
      >
        <AddIcon />
      </Fab>

      {/* Add Product Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            name="title"
            label="Product Title"
            value={newProduct.title}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="dense"
            name="image"
            label="Image URL"
            value={newProduct.image}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="dense"
            name="price"
            label="Price (INR)"
            type="number"
            value={newProduct.price}
            onChange={handleChange}
            helperText="Enter price in Indian Rupees"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>

      {/* Place Order Dialog */}
      <Dialog open={orderOpen} onClose={handleOrderClose} maxWidth="sm" fullWidth>
        <DialogTitle>Place Order</DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                {selectedProduct.title}
              </Typography>
              <Typography variant="body1" color="primary" gutterBottom>
                Price: {formatPrice(selectedProduct.price)}
              </Typography>
            </Box>
          )}
          
          <TextField
            fullWidth
            margin="dense"
            name="quantity"
            label="Quantity"
            type="number"
            value={orderData.quantity}
            onChange={handleOrderChange}
            inputProps={{ min: 1 }}
          />
          
          <FormControl fullWidth margin="dense">
            <InputLabel>Select Client</InputLabel>
            <Select
              name="clientName"
              value={orderData.clientName}
              onChange={handleOrderChange}
              label="Select Client"
            >
              {clients.map((client, index) => (
                <MenuItem key={index} value={client.name}>
                  {client.name} ({client.email})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          {selectedProduct && orderData.quantity > 0 && (
            <Box sx={{ mt: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
              <Typography variant="body1">
                <strong>Total Amount: {formatPrice(selectedProduct.price * orderData.quantity)}</strong>
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOrderClose}>Cancel</Button>
          <Button onClick={handlePlaceOrder} variant="contained" color="primary">
            Place Order
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add to Cart Dialog */}
      <Dialog open={cartOpen} onClose={handleCartClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add to Cart</DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                {selectedProduct.title}
              </Typography>
              <Typography variant="body1" color="primary" gutterBottom>
                Price: {formatPrice(selectedProduct.price)}
              </Typography>
            </Box>
          )}
          
          <TextField
            fullWidth
            margin="dense"
            name="quantity"
            label="Quantity"
            type="number"
            value={cartData.quantity}
            onChange={handleCartChange}
            inputProps={{ min: 1 }}
          />
          
          <FormControl fullWidth margin="dense">
            <InputLabel>Select Client</InputLabel>
            <Select
              name="clientName"
              value={cartData.clientName}
              onChange={handleCartChange}
              label="Select Client"
            >
              {clients.map((client, index) => (
                <MenuItem key={index} value={client.name}>
                  {client.name} ({client.email})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          {selectedProduct && cartData.quantity > 0 && (
            <Box sx={{ mt: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
              <Typography variant="body1">
                <strong>Total Amount: {formatPrice(selectedProduct.price * cartData.quantity)}</strong>
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCartClose}>Cancel</Button>
          <Button onClick={handleAddToCart} variant="contained" color="success">
            Add to Cart
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SpecificProductGrid;
