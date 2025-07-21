import React, { useState } from 'react';
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
  Divider
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  PhotoCamera as PhotoCameraIcon,
  Image as ImageIcon,
  Person as PersonIcon,
  Send as SendIcon
} from '@mui/icons-material';

const CustomOrder = () => {
  const [formData, setFormData] = useState({
    quantity: '',
    description: '',
    selectedUser: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Custom Order Submitted:', formData);
    // Handling form submission logic
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
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
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

            {/* Action Buttons */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {/* Pick Images Button */}
                <Button
                  variant="outlined"
                  startIcon={<ImageIcon />}
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

                {/* Select User Button */}
                <Button
                  variant="contained"
                  startIcon={<PersonIcon />}
                  fullWidth
                  sx={{
                    py: 2,
                    backgroundColor: '#b39ddb',
                    color: '#424242',
                    borderRadius: '25px',
                    '&:hover': {
                      backgroundColor: '#9575cd',
                    },
                  }}
                >
                  Select User
                </Button>

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