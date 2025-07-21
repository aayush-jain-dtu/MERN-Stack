import React from 'react';
import {
  Drawer, List, ListItem, ListItemText, ListItemIcon, Box, Button
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 240;

const Sidebar = ({ onNavigate, onLogout }) => {
  const menuItems = [
    { text: 'Home', icon: <HomeIcon /> },
    { text: 'Orders' },
    { text: 'Clients List' },
    { text: 'Employees' },
    { text: 'Reports' },
    { text: 'Update Inventory' },
    { text: 'Send Notification' },
    { text: 'Place Custom Orders' },
    { text: 'My Cart', icon: <ShoppingCartIcon /> },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#262335',
          color: '#fff'
        }
      }}
    >
      <Box sx={{ p: 2, fontSize: 20, fontWeight: 'bold' }}>Golfking</Box>
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} onClick={() => onNavigate(item.text)}>
            {item.icon && <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>}
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Box sx={{ position: 'absolute', bottom: 20, width: '100%', textAlign: 'center' }}>
        <Button 
          variant="contained" 
          color="secondary" 
          startIcon={<LogoutIcon />}
          onClick={onLogout}
        >
          Logout
        </Button>
      </Box>
    </Drawer>
  );
};

export default Sidebar;