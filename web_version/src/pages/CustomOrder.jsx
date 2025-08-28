import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  TextField,
  Button,
  IconButton,
  Grid,
  Card,
  CardContent,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  PhotoCamera as PhotoCameraIcon,
  Image as ImageIcon,
  Person as PersonIcon,
  Send as SendIcon
} from '@mui/icons-material';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const CustomOrder = () => {
  const [formData, setFormData] = useState({
    quantity: '',
    productName: '',
    description: '',
    selectedUser: '',
    imageUrl: ''
  });
  const [clients, setClients] = useState([]);
  const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });
  const [showImageInput, setShowImageInput] = useState(false);

  const fetchClients = async () => {
    try {
      const res = await axios.get(`${API_URL}/clients`);
      setClients(res.data.clients);
    } catch (err) {
      console.error('Error fetching clients:', err);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePickImages = () => {
    setShowImageInput(true);
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.quantity || !formData.productName || !formData.description || !formData.selectedUser) {
      setAlert({
        show: true,
        message: 'Please fill in all required fields (Quantity, Product Name, Description, and Client)',
        type: 'error'
      });
      return;
    }

    try {
      const customOrderPayload = {
        client: formData.selectedUser,
        price: 0, // Custom orders might not have predefined price
        quantity: parseInt(formData.quantity),
        productName: formData.productName,
        productTitle: formData.productName,
        description: formData.description,
        image: formData.imageUrl || '',
        is_custom: true
      };

      await axios.post(`${API_URL}/orders`, customOrderPayload);
      
      setAlert({
        show: true,
        message: 'Custom order placed successfully!',
        type: 'success'
      });

      // Reset form
      setFormData({
        quantity: '',
        productName: '',
        description: '',
        selectedUser: '',
        imageUrl: ''
      });
      setShowImageInput(false);

      // Hide alert after 3 seconds
      setTimeout(() => {
        setAlert({ show: false, message: '', type: 'success' });
      }, 3000);

    } catch (err) {
      console.error('Error placing custom order:', err);
      setAlert({
        show: true,
        message: 'Error placing custom order. Please try again.',
        type: 'error'
      });
    }
  };

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
                Custom Order
              </Typography>
            </Box>
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

        {/* Form Content */}
        <Paper elevation={1} sx={{ p: 4, backgroundColor: '#f5f5f5' }}>
          <Typography 
            variant="h4" 
            sx={{ 
              color: '#424242', 
              fontWeight: 'bold',
              mb: 4,
              textAlign: 'center'
            }}
          >
            Place Custom Orders
          </Typography>

          <Grid container spacing={3}>
            {/* Quantity Field */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                placeholder="Add Quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
                inputProps={{ min: 1 }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#424242',
                    color: 'white',
                    '& fieldset': {
                      borderColor: '#666',
                    },
                    '&:hover fieldset': {
                      borderColor: '#888',
                    },
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: '#ccc',
                    opacity: 1,
                  },
                }}
              />
            </Grid>

            {/* Product Name Field */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                placeholder="Add Product Name"
                value={formData.productName}
                onChange={(e) => handleInputChange('productName', e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#424242',
                    color: 'white',
                    '& fieldset': {
                      borderColor: '#666',
                    },
                    '&:hover fieldset': {
                      borderColor: '#888',
                    },
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: '#ccc',
                    opacity: 1,
                  },
                }}
              />
            </Grid>

            {/* Description Field */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="Add Description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#424242',
                    color: 'white',
                    '& fieldset': {
                      borderColor: '#666',
                    },
                    '&:hover fieldset': {
                      borderColor: '#888',
                    },
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: '#ccc',
                    opacity: 1,
                  },
                }}
              />
            </Grid>

            {/* Image URL Input (shown when Pick Images is clicked) */}
            {showImageInput && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  placeholder="Enter Image URL"
                  value={formData.imageUrl}
                  onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#424242',
                      color: 'white',
                      '& fieldset': {
                        borderColor: '#666',
                      },
                      '&:hover fieldset': {
                        borderColor: '#888',
                      },
                    },
                    '& .MuiInputBase-input::placeholder': {
                      color: '#ccc',
                      opacity: 1,
                    },
                  }}
                />
              </Grid>
            )}

            {/* Action Buttons */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {/* Pick Images Button */}
                <Button
                  variant="outlined"
                  startIcon={<ImageIcon />}
                  fullWidth
                  onClick={handlePickImages}
                  sx={{
                    py: 2,
                    borderColor: '#9c27b0',
                    color: '#9c27b0',
                    backgroundColor: 'transparent',
                    borderRadius: '25px',
                    '&:hover': {
                      borderColor: '#7b1fa2',
                      backgroundColor: 'rgba(156, 39, 176, 0.1)',
                    },
                  }}
                >
                  Pick Images
                </Button>

                {/* Take Photos Button */}
                <Button
                  variant="outlined"
                  startIcon={<PhotoCameraIcon />}
                  fullWidth
                  sx={{
                    py: 2,
                    borderColor: '#9c27b0',
                    color: '#9c27b0',
                    backgroundColor: 'transparent',
                    borderRadius: '25px',
                    '&:hover': {
                      borderColor: '#7b1fa2',
                      backgroundColor: 'rgba(156, 39, 176, 0.1)',
                    },
                  }}
                >
                  Take Photos
                </Button>

                {/* Select User Dropdown */}
                <FormControl fullWidth>
                  <Select
                    value={formData.selectedUser}
                    onChange={(e) => handleInputChange('selectedUser', e.target.value)}
                    displayEmpty
                    startAdornment={<PersonIcon />}
                    sx={{
                      py: 1,
                      backgroundColor: '#b39ddb',
                      color: '#424242',
                      borderRadius: '25px',
                      '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                      },
                    }}
                  >
                    <MenuItem value="">
                      <em>Select User</em>
                    </MenuItem>
                    {clients.map((client, index) => (
                      <MenuItem key={index} value={client.name}>
                        {client.name} ({client.email})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Submit Order Button */}
                <Button
                  variant="contained"
                  startIcon={<SendIcon />}
                  fullWidth
                  onClick={handleSubmit}
                  sx={{
                    py: 2,
                    backgroundColor: '#666',
                    color: 'white',
                    borderRadius: '25px',
                    '&:hover': {
                      backgroundColor: '#555',
                    },
                  }}
                >
                  Submit Order
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default CustomOrder;
