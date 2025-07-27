// ✅ specificproductgrid.jsx
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
  Button
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const SpecificProductGrid = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ title: '', image: '', category: category });

  const fetchCategoryProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/products/${category}`);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategoryProducts();
  }, [category]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewProduct({ title: '', image: '', category });
  };

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:8080/products", newProduct);
      await fetchCategoryProducts();
      handleClose();
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  return (
    <div>
      <Typography variant="h5" sx={{ m: 2 }}>Products in {category}</Typography>
      <Grid container spacing={3}>
        {products.map((product, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 4,
                backgroundColor: '#2f2b3e',
                color: '#fff',
              }}
            >
              <CardMedia
                component="img"
                height="160"
                image={product.image}
                alt={product.title}
              />
              <CardContent>
                <Typography variant="subtitle1" align="center" fontWeight="bold">
                  {product.title}
                </Typography>
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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            name="title"
            label="Title"
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SpecificProductGrid;
