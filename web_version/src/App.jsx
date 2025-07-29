import React, { useState } from 'react';
import Sidebar from './components/Sidebar.jsx'
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
  const [userRole, setUserRole] = useState(''); // 'owner', 'employee', 'client'
  const [userEmail, setUserEmail] = useState('');

  const handleLogin = (role, email) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setUserEmail(email);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('');
    setUserEmail('');
    setSelectedPage('Home');
  };

  // If not authenticated, show login page
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar 
        onNavigate={setSelectedPage} 
        onLogout={handleLogout} 
        userRole={userRole}
      />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {selectedPage === 'Home' && <Home />}
        {selectedPage === 'Orders' && <Orders userRole={userRole} userEmail={userEmail} />}
        {selectedPage === 'Clients List' && userRole !== 'client' && <ClientsList />}
        {selectedPage === 'Employees' && userRole === 'owner' && <Employees/>}
        {selectedPage === 'Reports' && userRole !== 'client' && <Reports />}
        {selectedPage === 'Update Inventory' && userRole !== 'client' && <UpdateInventory />}
        {selectedPage === 'Send Notification' && userRole !== 'client' && <SendNotification />}
        {selectedPage === 'Place Custom Orders' && <CustomOrder />}
        {selectedPage === 'My Cart' && <Cart/>}
      </Box>
    </Box>
  );
}

export default App;