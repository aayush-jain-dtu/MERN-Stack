import React from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  IconButton
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';

const Cart = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 3, mb: 3 }}>
        {/* Header */}
        <Paper elevation={2} sx={{ p: 2, mb: 3, backgroundColor: '#424242' }}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center">
              <IconButton sx={{ color: 'white', mr: 2 }}>
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>
                Cart
              </Typography>
            </Box>
            <IconButton sx={{ color: 'white' }}>
              <ShoppingCartIcon />
            </IconButton>
          </Box>
        </Paper>

        {/* Empty Cart Content */}
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
      </Box>
    </Container>
  );
};

export default Cart;