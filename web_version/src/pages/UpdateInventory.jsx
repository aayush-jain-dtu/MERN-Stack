import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  const [inventoryItems, setInventoryItems] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8080/products");
        setInventoryItems(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);

  const filteredItems = inventoryItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdateInventory = async (title) => {
    const quantityToAdd = parseInt(quantities[title]);
    if (isNaN(quantityToAdd)) return;

    try {
      await axios.patch(`http://localhost:8080/products/${title}`, {
        quantityToAdd
      });
      const res = await axios.get("http://localhost:8080/products");
      setInventoryItems(res.data);
      setQuantities({ ...quantities, [title]: '' });
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 3, mb: 3 }}>
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

        <Grid container spacing={3}>
          {filteredItems.map((item, idx) => (
            <Grid item xs={12} key={idx}>
              <Card elevation={2} sx={{ backgroundColor: '#424242', borderRadius: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}>
                      {item.title}
                    </Typography>

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" sx={{ color: '#ccc', mb: 1 }}>
                          <strong>Category:</strong> {item.category}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" sx={{ color: '#ccc', mb: 1 }}>
                          <strong>Available Quantity:</strong>
                          <Chip
                            label={item.quantity}
                            size="small"
                            sx={{
                              ml: 1,
                              backgroundColor: item.quantity > 50 ? '#4caf50' : '#ff9800',
                              color: 'white'
                            }}
                          />
                        </Typography>
                      </Grid>
                    </Grid>

                    <TextField
                      type="number"
                      size="small"
                      label="Add Quantity"
                      variant="outlined"
                      value={quantities[item.title] || ''}
                      onChange={(e) =>
                        setQuantities({ ...quantities, [item.title]: e.target.value })
                      }
                      sx={{ mt: 2, backgroundColor: '#fff', borderRadius: 1 }}
                    />
                  </Box>

                  <Divider sx={{ my: 2, borderColor: '#666' }} />

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      variant="contained"
                      startIcon={<EditIcon />}
                      onClick={() => handleUpdateInventory(item.title)}
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
      </Box>
    </Container>
  );
};

export default UpdateInventory;
