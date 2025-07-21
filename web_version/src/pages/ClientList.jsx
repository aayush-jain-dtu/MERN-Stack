import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Fab
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const clients = [
  { name: 'Yash Yash', email: 'dealer02@yopmail.com', contact: '4444444444' },
  { name: 'Test User', email: 'testuser.yash@yopmail.com', contact: '9999999993' },
  { name: 'Test User', email: 'testuser2.yash@yopmail.com', contact: '9999999994' },
  { name: 'Test User', email: 'testuser3.yash@yopmail.com', contact: '9999999995' },
  { name: 'Test Client', email: 'leadingarraye2@gmail.com', contact: '8295937215', address: 'Hisar, Hisar, Haryana, India, 125001' },
];

export default function ClientsList() {
  return (
    <Box p={2} position="relative">
      <TableContainer component={Paper} sx={{ backgroundColor: '#1f1f27' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>Name</TableCell>
              <TableCell sx={{ color: 'white' }}>Email</TableCell>
              <TableCell sx={{ color: 'white' }}>Contact</TableCell>
              <TableCell sx={{ color: 'white' }}>Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client, index) => (
              <TableRow key={index}>
                <TableCell sx={{ color: 'white' }}>{client.name}</TableCell>
                <TableCell sx={{ color: 'white' }}>{client.email}</TableCell>
                <TableCell sx={{ color: 'white' }}>{client.contact}</TableCell>
                <TableCell sx={{ color: 'white' }}>{client.address || '—'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Fab color="primary" sx={{ position: 'fixed', bottom: 24, right: 24, bgcolor: '#9F70FD' }}>
        <AddIcon />
      </Fab>
    </Box>
  );
}
