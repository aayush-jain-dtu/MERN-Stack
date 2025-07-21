import React, { useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import Home from './pages/Home';
import Orders from './pages/Orders';
import ClientsList from './pages/ClientList.jsx';
import Employees from './pages/Employees.jsx';
import Reports from './pages/Reports.jsx';
import UpdateInventory from './pages/UpdateInventory.jsx';
import SendNotification from './pages/SendNotification.jsx';
import CustomOrder from './pages/CustomOrder.jsx';
import Cart from './pages/Cart.jsx';
import Login from './pages/Login.jsx';
import { Box } from '@mui/material';

function App() {
  const [selectedPage, setSelectedPage] = useState('Home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setSelectedPage('Home');
  };

  // If not authenticated, show login page
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar onNavigate={setSelectedPage} onLogout={handleLogout} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {selectedPage === 'Home' && <Home />}
        {selectedPage === 'Orders' && <Orders />}
        {selectedPage === 'Clients List' && <ClientsList />}
        {selectedPage === 'Employees' && <Employees/>}
        {selectedPage === 'Reports' && <Reports />}
        {selectedPage === 'Update Inventory' && <UpdateInventory />}
        {selectedPage === 'Send Notification' && <SendNotification />}
        {selectedPage === 'Place Custom Orders' && <CustomOrder />}
        {selectedPage === 'My Cart' && <Cart/>}
      </Box>
    </Box>
  );
}

export default App;