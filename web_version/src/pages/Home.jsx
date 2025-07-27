import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import SpecificProductGrid from '../components/SpecificProductGrid';
import { Box, Typography, TextField } from '@mui/material';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Box sx={{ padding: 3 }}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Typography variant="h5" gutterBottom>
                Golfking products category
              </Typography>
              <TextField
                fullWidth
                placeholder="Search for category..."
                sx={{ mb: 3 }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <ProductGrid searchTerm={searchTerm} />
            </>
          }
        />
        <Route path="/category/:category" element={<SpecificProductGrid />} />
      </Routes>
    </Box>
  );
};

export default Home;
