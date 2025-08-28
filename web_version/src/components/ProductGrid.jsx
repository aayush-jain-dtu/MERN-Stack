import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const ProductGrid = ({ searchTerm = '' }) => {
  const [array, setArray] = useState([]);
  const [open, setOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ title: '', image: '' });
  const navigate = useNavigate();

  const fetchAPI = async () => {
    try {
      const response = await axios.get("${API_URL}/api");
      setArray(response.data.fruits);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  const filteredProducts = array.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewCategory({ title: '', image: '' });
  };

  const handleChange = (e) => {
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("${API_URL}/api", newCategory);
      await fetchAPI(); // Refresh category list
      handleClose();
    } catch (err) {
      console.error("Error adding category:", err);
    }
  };

  return (
    <>
      <Grid container spacing={3}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.title}>
              <Card
                onClick={() => navigate(`/category/${product.title}`)}
                sx={{
                  cursor: 'pointer',
                  borderRadius: 3,
                  boxShadow: 4,
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.03)' },
                  backgroundColor: '#2f2b3e',
                  color: '#fff',
                }}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image={product.image}
                  alt={product.title}
                  sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                />
                <CardContent>
                  <Typography variant="subtitle1" align="center" fontWeight="bold">
                    {product.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography
              variant="h6"
              align="center"
              color="text.secondary"
              sx={{ mt: 4 }}
            >
              No products found matching "{searchTerm}"
            </Typography>
          </Grid>
        )}
      </Grid>

      <Fab
        color="primary"
        onClick={handleOpen}
        sx={{ position: 'fixed', bottom: 40, right: 40 }}
      >
        <AddIcon />
      </Fab>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            name="title"
            label="Title"
            value={newCategory.title}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="dense"
            name="image"
            label="Image URL"
            value={newCategory.image}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductGrid;

