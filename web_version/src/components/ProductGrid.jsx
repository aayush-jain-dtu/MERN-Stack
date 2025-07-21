import React from 'react';
import { Grid, Card, CardContent, Typography, CardMedia } from '@mui/material';

const products = [
  {
    title: 'Earbuds',
    image: 'https://images.unsplash.com/photo-1667178173387-7e0cb51c0b4f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Yoga Mats',
    image: 'https://plus.unsplash.com/premium_photo-1675155952889-abb299df1fe7?q=80&w=1329&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Smart Watch',
    image: 'https://images.unsplash.com/photo-1617625802912-cde586faf331?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Pillows',
    image: 'https://plus.unsplash.com/premium_photo-1677418005606-4e89ffb34088?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Dumbell',
    image: 'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const ProductGrid = ({ searchTerm = '' }) => {
  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Grid container spacing={3}>
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.title}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 4,
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.03)',
                },
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
    
  );
};

export default ProductGrid;