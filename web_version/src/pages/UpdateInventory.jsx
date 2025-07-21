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
  Divider,
  Chip,
  InputAdornment
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Category as CategoryIcon
} from '@mui/icons-material';

const UpdateInventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample inventory data
  const [inventoryItems] = useState([
    {
      id: 1,
      name: 'BLADE GF - SLIP INS',
      articleNumber: '214090-BKL',
      availableQuantity: 160,
      category: 'Sketchers Go Golf > Go golf Antiskit series'
    },
    {
      id: 2,
      name: 'Aayush test case',
      articleNumber: '214090-WWG',
      availableQuantity: 65,
      category: 'Sketchers Go Golf > Go golf Antiskit series'
    },
    {
      id: 3,
      name: 'Test article',
      articleNumber: 'Test 01',
      availableQuantity: 20,
      category: 'Sketchers Go Golf > Go golf Antiskit series'
    }
  ]);

  const filteredItems = inventoryItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.articleNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdateInventory = (itemId) => {
    console.log('Update inventory for item:', itemId);
    // will Handle inventory update logic
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 3, mb: 3 }}>
        {/* Header */}
        <Paper elevation={2} sx={{ p: 2, mb: 3, backgroundColor: '#424242' }}>
          <Box display="flex" alignItems="center">
            <IconButton sx={{ color: 'white', mr: 2 }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>
              Update Inventory
            </Typography>
          </Box>
        </Paper>

        {/* Search Bar */}
        <Paper elevation={1} sx={{ p: 2, mb: 3, backgroundColor: '#424242' }}>
          <TextField
            fullWidth
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#ccc' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#424242',
                color: 'white',
                '& fieldset': {
                  border: 'none',
                },
              },
              '& .MuiInputBase-input::placeholder': {
                color: '#ccc',
                opacity: 1,
              },
            }}
          />
        </Paper>

        {/* Inventory Items */}
        <Grid container spacing={3}>
          {filteredItems.map((item) => (
            <Grid item xs={12} key={item.id}>
              <Card 
                elevation={2} 
                sx={{ 
                  backgroundColor: '#424242',
                  borderRadius: 3,
                  overflow: 'hidden'
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: 'white', 
                        fontWeight: 'bold',
                        mb: 2
                      }}
                    >
                      {item.name}
                    </Typography>
                    
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" sx={{ color: '#ccc', mb: 1 }}>
                          <strong>Article Number:</strong> {item.articleNumber}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" sx={{ color: '#ccc', mb: 1 }}>
                          <strong>Available Quantity:</strong> 
                          <Chip 
                            label={item.availableQuantity} 
                            size="small" 
                            sx={{ 
                              ml: 1,
                              backgroundColor: item.availableQuantity > 50 ? '#4caf50' : '#ff9800',
                              color: 'white'
                            }} 
                          />
                        </Typography>
                      </Grid>
                    </Grid>

                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" sx={{ color: '#ccc', mb: 1 }}>
                        <CategoryIcon sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle' }} />
                        <strong>Category:</strong> {item.category}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2, borderColor: '#666' }} />

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      variant="contained"
                      startIcon={<EditIcon />}
                      onClick={() => handleUpdateInventory(item.id)}
                      sx={{
                        backgroundColor: '#b39ddb',
                        color: '#424242',
                        borderRadius: '20px',
                        px: 3,
                        '&:hover': {
                          backgroundColor: '#9575cd',
                        },
                      }}
                    >
                      Update Inventory
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* No Results Message */}
        {filteredItems.length === 0 && (
          <Paper elevation={1} sx={{ p: 4, textAlign: 'center', backgroundColor: '#f5f5f5' }}>
            <Typography variant="h6" sx={{ color: '#666', mb: 2 }}>
              No items found
            </Typography>
            <Typography variant="body2" sx={{ color: '#999' }}>
              Try adjusting your search terms or check back later for new inventory items.
            </Typography>
          </Paper>
        )}

        {/* Summary Card */}
        <Paper elevation={1} sx={{ p: 3, mt: 3, backgroundColor: '#e3f2fd' }}>
          <Typography variant="h6" sx={{ color: '#1976d2', mb: 2 }}>
            Inventory Summary
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" sx={{ color: '#424242' }}>
                <strong>Total Items:</strong> {inventoryItems.length}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" sx={{ color: '#424242' }}>
                <strong>Low Stock:</strong> {inventoryItems.filter(item => item.availableQuantity < 50).length}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" sx={{ color: '#424242' }}>
                <strong>In Stock:</strong> {inventoryItems.filter(item => item.availableQuantity >= 50).length}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default UpdateInventory;