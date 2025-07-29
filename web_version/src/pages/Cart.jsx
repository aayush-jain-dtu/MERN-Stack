import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Alert,
  Card,
  CardContent,
  CardMedia,
  Grid
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  ArrowBack as ArrowBackIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });

  const fetchCartItems = async () => {
    try {
      const res = await axios.get('http://localhost:8080/cart');
      setCartItems(res.data);
    } catch (err) {
      console.error('Error fetching cart items:', err);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleRemoveItem = async (index) => {
    try {
      await axios.delete(`http://localhost:8080/cart/${index}`);
      await fetchCartItems();
      setAlert({
        show: true,
        message: 'Item removed from cart!',
        type: 'success'
      });
      setTimeout(() => setAlert({ show: false, message: '', type: 'success' }), 3000);
    } catch (err) {
      console.error('Error removing item:', err);
      setAlert({
        show: true,
        message: 'Error removing item from cart',
        type: 'error'
      });
    }
  };

  const handlePlaceCartOrders = async () => {
    if (cartItems.length === 0) {
      setAlert({
        show: true,
        message: 'Cart is empty!',
        type: 'error'
      });
      return;
    }

    try {
      await axios.post('http://localhost:8080/cart/place-orders');
      await fetchCartItems(); // Refresh cart (should be empty now)
      setAlert({
        show: true,
        message: `Successfully placed ${cartItems.length} orders!`,
        type: 'success'
      });
      setTimeout(() => setAlert({ show: false, message: '', type: 'success' }), 3000);
    } catch (err) {
  console.error('Error placing cart orders:', err);
  let message = 'Error placing orders. Please try again.';
  if (err.response && err.response.data && err.response.data.error) {
    message = err.response.data.error;  // <<< use backend's stock message
  }
  setAlert({ show: true, message, type: 'error' });
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

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 3, mb: 3 }}>
        {/* Header */}
        <Paper elevation={2} sx={{ p: 2, mb: 3, backgroundColor: '#424242' }}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center">
              <IconButton sx={{ color: 'white', mr: 2 }}>
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>
                Cart ({cartItems.length} items)
              </Typography>
            </Box>
            <IconButton sx={{ color: 'white' }}>
              <ShoppingCartIcon />
            </IconButton>
          </Box>
        </Paper>

        {/* Alert */}
        {alert.show && (
          <Alert 
            severity={alert.type} 
            sx={{ mb: 2 }}
            onClose={() => setAlert({ show: false, message: '', type: 'success' })}
          >
            {alert.message}
          </Alert>
        )}

        {cartItems.length === 0 ? (
          /* Empty Cart Content */
          <Paper elevation={1} sx={{ p: 4, textAlign: 'center', backgroundColor: '#f5f5f5' }}>
            <Box sx={{ py: 8 }}>
              <ShoppingCartIcon sx={{ fontSize: 80, color: '#bdbdbd', mb: 3 }} />
              <Typography 
                variant="h4" 
                sx={{ 
                  color: '#424242', 
                  fontWeight: 'bold',
                  mb: 2 
                }}
              >
                Your Cart is Empty!
              </Typography>
              <Typography variant="body1" sx={{ color: '#757575', mb: 4 }}>
                Add some items to your cart to see them here.
              </Typography>
            </Box>
          </Paper>
        ) : (
          /* Cart Items */
          <Box>
            <Grid container spacing={3}>
              {cartItems.map((item, index) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <Card sx={{ 
                    borderRadius: 3, 
                    boxShadow: 4, 
                    backgroundColor: '#2f2b3e', 
                    color: '#fff',
                    position: 'relative'
                  }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={item.productImage}
                      alt={item.productTitle}
                    />
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {item.productTitle}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#aaa', mb: 1 }}>
                        Client: {item.client}
                      </Typography>
                      <Typography variant="body1" sx={{ color: '#4CAF50', mb: 1 }}>
                        Price: {formatPrice(item.price)}
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        Quantity: {item.quantity}
                      </Typography>
                      <Typography variant="h6" sx={{ color: '#FF9800', fontWeight: 'bold' }}>
                        Total: {formatPrice(item.price * item.quantity)}
                      </Typography>
                    </CardContent>
                    <IconButton
                      onClick={() => handleRemoveItem(index)}
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        backgroundColor: 'rgba(244, 67, 54, 0.8)',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'rgba(244, 67, 54, 1)',
                        }
                      }}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Summary and Place Orders */}
            <Paper elevation={2} sx={{ mt: 4, p: 3, backgroundColor: '#424242', color: 'white' }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Cart Summary
                  </Typography>
                  <Typography variant="h6">
                    Total Items: {cartItems.length}
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#4CAF50', fontWeight: 'bold' }}>
                    Grand Total: {formatPrice(getTotalAmount())}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handlePlaceCartOrders}
                  sx={{
                    backgroundColor: '#FF9800',
                    '&:hover': { backgroundColor: '#e68900' },
                    px: 4,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 'bold'
                  }}
                >
                  Place All Orders
                </Button>
              </Box>
            </Paper>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Cart;