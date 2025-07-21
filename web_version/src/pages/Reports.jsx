import React from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';

const reports = [
  { title: 'Inventory Report' },
  { title: 'Ordered Articles' },
];

export default function Reports() {
  return (
    <Box p={2}>
      {reports.map((report, index) => (
        <Card key={index} sx={{ mb: 2, background: '#1f1f27', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2 }}>
          <CardContent>
            <Typography fontWeight="bold">{report.title}</Typography>
          </CardContent>
          <Button variant="contained" sx={{ bgcolor: '#C9A7F4', color: 'black', mr: 2 }}>
            Download
          </Button>
        </Card>
      ))}
    </Box>
  );
}
