// Orders.jsx with role-based filtering
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Tabs,
  Tab,
  InputAdornment,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Card,
  CardMedia,
  CardContent
} from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const tabLabels = ['Pending', 'In Progress', 'Completed', 'Rejected', 'Cancelled'];

const Orders = ({ userRole, userEmail }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [search, setSearch] = useState('');
  const [orders, setOrders] = useState([]);
  const [customDetails, setCustomDetails] = useState(null);

  const fetchOrders = async () => {
    const res = await axios.get("${API_URL}/orders");
    setOrders(res.data);
  };

  const handleShowCustomDetails = async (orderId) => {
    try {
      const res = await axios.get(`${API_URL}/orders/${orderId}/custom-details`);
      setCustomDetails(res.data);
    } catch (err) {
      console.error('Error fetching custom details:', err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    await axios.patch(${API_URL}/orders/${id}/status`, { status: newStatus });
    fetchOrders();
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
    setCustomDetails(null); // hide custom details on tab switch
  };

  const currentStatus = tabLabels[tabIndex];
  
  // Filter orders based on user role
  const filteredOrders = orders.filter((order) => {
    const matchesStatus = order.status === currentStatus;
    const matchesSearch = order.id.toLowerCase().includes(search.toLowerCase());
    
    // If client, only show orders for their email
    if (userRole === 'client') {
      return matchesStatus && matchesSearch && order.email === userEmail;
    }
    
    // For owner and employee, show all orders
    return matchesStatus && matchesSearch;
  });

  return (
    <Box sx={{ px: 3, py: 2, backgroundColor: '#1c1b23', color: 'white', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Orders</Typography>
        <Box>
          <IconButton sx={{ color: 'white' }}>
            <NotificationsIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Role indicator for clients */}
      {userRole === 'client' && (
        <Typography variant="body2" sx={{ color: '#aaa', mb: 2 }}>
          Showing orders for: {userEmail}
        </Typography>
      )}

      {/* Tabs */}
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        textColor="inherit"
        indicatorColor="secondary"
      >
        {tabLabels.map((label) => (
          <Tab key={label} label={label} sx={{ color: 'white', fontWeight: 'bold' }} />
        ))}
      </Tabs>

      {/* Search */}
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 3, mb: 2, gap: 1 }}>
        <TextField
          fullWidth
          placeholder="Search by order number..."
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            input: { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#555' },
              '&:hover fieldset': { borderColor: '#888' },
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton sx={{ color: 'white' }}>
                  <SortIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <IconButton sx={{ color: 'white' }}>
          <AccountCircleIcon />
        </IconButton>
      </Box>

      {/* Filter Info */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="body2" sx={{ color: '#aaa' }}>Today</Typography>
        <Link component="button" sx={{ color: '#a288e3' }} onClick={() => setSearch('')}>
          Remove Filter
        </Link>
      </Box>

      {/* Custom Details Card */}
      {customDetails && (
        <Box sx={{ mt: 3, mb: 3 }}>
          <Card sx={{ maxWidth: 600, mx: 'auto', backgroundColor: '#2e2e38', position: 'relative' }}>
            {/* Close Button */}
            <IconButton
              onClick={() => setCustomDetails(null)}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                color: '#ccc',
                backgroundColor: '#444',
                '&:hover': { backgroundColor: '#666' }
              }}
              size="small"
            >
              <CloseIcon />
            </IconButton>

            {/* Image */}
            <CardMedia
              component="img"
              height="300"
              image={customDetails.image}
              alt={customDetails.productName}
            />

            {/* Text Info */}
            <CardContent>
              <Typography variant="h6" sx={{ color: 'white' }}>
                {customDetails.productName}
              </Typography>
              <Typography variant="body2" sx={{ color: '#ccc', mt: 1 }}>
                {customDetails.description}
              </Typography>
              <Typography variant="caption" sx={{ color: '#aaa', mt: 2, display: 'block' }}>
                Client: {customDetails.client} | Email: {customDetails.email} | Date: {customDetails.date}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Table Section */}
      {filteredOrders.length > 0 ? (
        <TableContainer component={Paper} sx={{ backgroundColor: '#1f1f27' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: 'white' }}>Order ID</TableCell>
                <TableCell sx={{ color: 'white' }}>Product Name</TableCell>
                <TableCell sx={{ color: 'white' }}>Client</TableCell>
                <TableCell sx={{ color: 'white' }}>Email</TableCell>
                <TableCell sx={{ color: 'white' }}>Price</TableCell>
                <TableCell sx={{ color: 'white' }}>Quantity</TableCell>
                <TableCell sx={{ color: 'white' }}>Total</TableCell>
                <TableCell sx={{ color: 'white' }}>Date</TableCell>
                {userRole !== 'client' && <TableCell sx={{ color: 'white' }}>Actions</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell sx={{ color: 'white' }}>{order.id}</TableCell>
                  <TableCell sx={{ color: 'white' }}>{order.productName || order.productTitle || 'N/A'}</TableCell>
                  <TableCell sx={{ color: 'white' }}>{order.client}</TableCell>
                  <TableCell sx={{ color: 'white' }}>{order.email}</TableCell>
                  <TableCell sx={{ color: 'white' }}>₹{order.price}</TableCell>
                  <TableCell sx={{ color: 'white' }}>{order.quantity}</TableCell>
                  <TableCell sx={{ color: 'white' }}>₹{order.price * order.quantity}</TableCell>
                  <TableCell sx={{ color: 'white' }}>{order.date}</TableCell>
                  {userRole !== 'client' && (
                    <TableCell sx={{ color: 'white' }}>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {order.status === 'Pending' && (
                          <>
                            <Button variant="outlined" size="small" color="warning" onClick={() => handleStatusChange(order.id, 'In Progress')}>Move to Progress</Button>
                            <Button variant="outlined" size="small" color="error" onClick={() => handleStatusChange(order.id, 'Rejected')}>Move to Rejected</Button>
                          </>
                        )}
                        {order.status === 'In Progress' && (
                          <>
                            <Button variant="outlined" size="small" color="success" onClick={() => handleStatusChange(order.id, 'Completed')}>Move to Completed</Button>
                            <Button variant="outlined" size="small" color="error" onClick={() => handleStatusChange(order.id, 'Rejected')}>Move to Rejected</Button>
                          </>
                        )}
                        {order.is_custom && (
                          <Button variant="contained" size="small" color="secondary" onClick={() => handleShowCustomDetails(order.id)}>
                            Show Custom Details
                          </Button>
                        )}
                      </Box>
                    </TableCell>
                  )}
                  {userRole === 'client' && order.is_custom && (
                    <TableCell sx={{ color: 'white' }}>
                      <Button variant="contained" size="small" color="secondary" onClick={() => handleShowCustomDetails(order.id)}>
                        Show Custom Details
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1" align="center" sx={{ mt: 10, color: '#aaa' }}>
          No Results Found!
        </Typography>
      )}
    </Box>
  );
};

export default Orders;
