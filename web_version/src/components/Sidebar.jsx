import React from 'react';
import {
  Drawer, List, ListItem, ListItemText, ListItemIcon, Box, Button
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';

const API_URL = import.meta.env.VITE_API_URL;

const drawerWidth = 240;

const Sidebar = ({ onNavigate, onLogout, userRole }) => {
  // Define menu items based on role
  const getMenuItems = () => {
    const allMenuItems = [
      { text: 'Home', icon: <HomeIcon />, roles: ['owner', 'employee', 'client'] },
      { text: 'Orders', roles: ['owner', 'employee', 'client'] },
      { text: 'Clients List', roles: ['owner', 'employee'] },
      { text: 'Employees', roles: ['owner'] },
      { text: 'Reports', roles: ['owner', 'employee'] },
      { text: 'Update Inventory', roles: ['owner', 'employee'] },
      { text: 'Send Notification', roles: ['owner', 'employee'] },
      { text: 'Place Custom Orders', roles: ['owner', 'employee', 'client'] },
      { text: 'My Cart', icon: <ShoppingCartIcon />, roles: ['owner', 'employee', 'client'] },
    ];

    return allMenuItems.filter(item => item.roles.includes(userRole));
  };

  const menuItems = getMenuItems();

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
      <Box sx={{ p: 2, fontSize: 20, fontWeight: 'bold' }}>
        Golfking
        <Box sx={{ fontSize: 12, color: '#aaa', mt: 1 }}>
          Role: {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
        </Box>
      </Box>
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
