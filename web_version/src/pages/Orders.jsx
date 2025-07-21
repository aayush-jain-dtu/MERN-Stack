import React, { useState } from 'react';
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
  Paper
} from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';

const tabLabels = ['Pending', 'In Progress', 'Completed', 'Rejected', 'Cancelled'];

const mockOrders = [
  { id: 'ORD001', client: 'Yash Yash', amount: '₹1200', status: 'Pending', date: '2024-07-14' },
  { id: 'ORD002', client: 'Manubhav Batra', amount: '₹950', status: 'In Progress', date: '2024-07-13' },
  { id: 'ORD003', client: 'Prod Test', amount: '₹2100', status: 'Completed', date: '2024-07-10' },
  { id: 'ORD004', client: 'Test Client', amount: '₹750', status: 'Rejected', date: '2024-07-11' },
];

const Orders = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [search, setSearch] = useState('');

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const currentStatus = tabLabels[tabIndex];
  const filteredOrders = mockOrders.filter(
    (order) =>
      order.status === currentStatus &&
      order.id.toLowerCase().includes(search.toLowerCase())
  );

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
        <Link component="button" sx={{ color: '#a288e3' }}>
          Remove Filter
        </Link>
      </Box>

      {/* Table Section */}
      {filteredOrders.length > 0 ? (
        <TableContainer component={Paper} sx={{ backgroundColor: '#1f1f27' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: 'white' }}>Order ID</TableCell>
                <TableCell sx={{ color: 'white' }}>Client</TableCell>
                <TableCell sx={{ color: 'white' }}>Amount</TableCell>
                <TableCell sx={{ color: 'white' }}>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell sx={{ color: 'white' }}>{order.id}</TableCell>
                  <TableCell sx={{ color: 'white' }}>{order.client}</TableCell>
                  <TableCell sx={{ color: 'white' }}>{order.amount}</TableCell>
                  <TableCell sx={{ color: 'white' }}>{order.date}</TableCell>
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
