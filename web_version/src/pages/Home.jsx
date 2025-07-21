import React, { useState } from 'react';
import ProductGrid from '../components/ProductGrid';
import { Box, Typography, TextField } from '@mui/material';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Golfking products category
      </Typography>
      <TextField 
        fullWidth 
        placeholder="Search for category..." 
        sx={{ mb: 3 }}
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <ProductGrid searchTerm={searchTerm} />
    </Box>
  );
};

export default Home;