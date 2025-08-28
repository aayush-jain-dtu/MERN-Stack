import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert,
  IconButton,
  Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LockIcon from '@mui/icons-material/Lock';

const API_URL = import.meta.env.VITE_API_URL;


export default function ClientsList() {
  const [clients, setClients] = useState([]);
  const [open, setOpen] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    address: '',
    password: ''
  });
  const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });

  const fetchClients = async () => {
    try {
      const response = await axios.get("${API_URL}/clients");
      setClients(response.data.clients);
      console.log('Clients fetched:', response.data.clients);
    } catch (error) {
      console.error('Error fetching clients:', error);
      setAlert({ show: true, message: 'Error fetching clients', type: 'error' });
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = {
        ...formData,
        password: formData.password || 'listiphy@123' // Default password if not provided
      };
      await axios.post("${API_URL}/clients", submitData);
      setAlert({ show: true, message: 'Client added successfully!', type: 'success' });
      setFormData({ name: '', email: '', contact: '', address: '', password: '' });
      setOpen(false);
      fetchClients(); // Refresh the list
    } catch (error) {
      console.error('Error adding client:', error);
      setAlert({ show: true, message: 'Error adding client', type: 'error' });
    }
  };

  const handleDelete = async (index) => {
    try {
      await axios.delete(`${API_URL}/clients/${index}`);
      setAlert({ show: true, message: 'Client deleted successfully!', type: 'success' });
      fetchClients(); // Refresh the list
    } catch (error) {
      console.error('Error deleting client:', error);
      setAlert({ show: true, message: 'Error deleting client', type: 'error' });
    }
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({ name: '', email: '', contact: '', address: '', password: '' });
  };

  const handlePasswordSubmit = () => {
    if (passwordInput === 'password123') {
      setShowPasswords(true);
      setPasswordDialogOpen(false);
      setPasswordInput('');
      setAlert({ show: true, message: 'Password column unlocked!', type: 'success' });
    } else {
      setAlert({ show: true, message: 'Incorrect password!', type: 'error' });
      setPasswordInput('');
    }
  };

  const handlePasswordDialogClose = () => {
    setPasswordDialogOpen(false);
    setPasswordInput('');
  };

  const togglePasswordVisibility = () => {
    if (showPasswords) {
      setShowPasswords(false);
      setAlert({ show: true, message: 'Password column locked!', type: 'info' });
    } else {
      setPasswordDialogOpen(true);
    }
  };

  return (
    <Box p={2} position="relative">
      {alert.show && (
        <Alert 
          severity={alert.type} 
          onClose={() => setAlert({ ...alert, show: false })}
          sx={{ mb: 2 }}
        >
          {alert.message}
        </Alert>
      )}

      <Box mb={2} display="flex" justifyContent="flex-end">
        <Tooltip title={showPasswords ? "Hide passwords" : "Show passwords"}>
          <IconButton 
            onClick={togglePasswordVisibility}
            sx={{ 
              color: showPasswords ? '#9F70FD' : 'gray',
              border: '1px solid',
              borderColor: showPasswords ? '#9F70FD' : 'gray'
            }}
          >
            {showPasswords ? <VisibilityIcon /> : <LockIcon />}
          </IconButton>
        </Tooltip>
      </Box>

      <TableContainer component={Paper} sx={{ backgroundColor: '#1f1f27' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>Name</TableCell>
              <TableCell sx={{ color: 'white' }}>Email</TableCell>
              <TableCell sx={{ color: 'white' }}>Contact</TableCell>
              <TableCell sx={{ color: 'white' }}>Address</TableCell>
              {showPasswords && (
                <TableCell sx={{ color: 'white' }}>Password</TableCell>
              )}
              <TableCell sx={{ color: 'white' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client, index) => (
              <TableRow key={index}>
                <TableCell sx={{ color: 'white' }}>{client.name}</TableCell>
                <TableCell sx={{ color: 'white' }}>{client.email}</TableCell>
                <TableCell sx={{ color: 'white' }}>{client.contact}</TableCell>
                <TableCell sx={{ color: 'white' }}>{client.address || '—'}</TableCell>
                {showPasswords && (
                  <TableCell sx={{ color: 'white', fontFamily: 'monospace' }}>
                    {client.password || 'listiphy@123'}
                  </TableCell>
                )}
                <TableCell sx={{ color: 'white' }}>
                  <IconButton 
                    sx={{ color: 'white' }} 
                    onClick={() => handleDelete(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Fab 
        color="primary" 
        sx={{ position: 'fixed', bottom: 24, right: 24, bgcolor: '#9F70FD' }}
        onClick={() => setOpen(true)}
      >
        <AddIcon />
      </Fab>

      {/* Add Client Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Client</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Name"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <TextField
              margin="dense"
              name="email"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <TextField
              margin="dense"
              name="contact"
              label="Contact"
              type="tel"
              fullWidth
              variant="outlined"
              value={formData.contact}
              onChange={handleInputChange}
              required
            />
            <TextField
              margin="dense"
              name="address"
              label="Address"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
            <TextField
              margin="dense"
              name="password"
              label="Password (optional - defaults to listiphy@123)"
              type="password"
              fullWidth
              variant="outlined"
              value={formData.password}
              onChange={handleInputChange}
              helperText="Leave blank to use default password: listiphy@123"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: '#9F70FD' }}>
              Add Client
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Password Dialog */}
      <Dialog open={passwordDialogOpen} onClose={handlePasswordDialogClose}>
        <DialogTitle>Enter Password to View Client Passwords</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handlePasswordSubmit();
              }
            }}
            helperText="Enter 'password123' to view passwords"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePasswordDialogClose}>Cancel</Button>
          <Button onClick={handlePasswordSubmit} variant="contained" sx={{ bgcolor: '#9F70FD' }}>
            Unlock
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
