import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [clients, setClients] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  // Fetch employees and clients data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch employees
        try {
          const employeesResponse = await axios.get(`${API_URL}/employees`);
          console.log('Raw employees data:', employeesResponse.data);
          
          let employeesData = [];
          if (Array.isArray(employeesResponse.data)) {
            employeesData = employeesResponse.data;
          } else if (employeesResponse.data.employees && Array.isArray(employeesResponse.data.employees)) {
            employeesData = employeesResponse.data.employees;
          } else if (employeesResponse.data.data && Array.isArray(employeesResponse.data.data)) {
            employeesData = employeesResponse.data.data;
          } else if (typeof employeesResponse.data === 'object') {
            employeesData = Object.values(employeesResponse.data);
          }
          
          setEmployees(employeesData);
          console.log('Processed employees:', employeesData);
        } catch (err) {
          console.log('Could not fetch employees:', err);
          setEmployees([]);
        }

        // Fetch clients
        try {
          const clientsResponse = await axios.get(`${API_URL}/clients`);
          console.log('Raw clients data:', clientsResponse.data);
          
          let clientsData = [];
          if (Array.isArray(clientsResponse.data)) {
            clientsData = clientsResponse.data;
          } else if (clientsResponse.data.clients && Array.isArray(clientsResponse.data.clients)) {
            clientsData = clientsResponse.data.clients;
          } else if (clientsResponse.data.data && Array.isArray(clientsResponse.data.data)) {
            clientsData = clientsResponse.data.data;
          } else if (typeof clientsResponse.data === 'object') {
            clientsData = Object.values(clientsResponse.data);
          }
          
          setClients(clientsData);
          console.log('Processed clients:', clientsData);
        } catch (err) {
          console.log('Could not fetch clients, trying alternative endpoint...');
          try {
            const clientsResponse = await axios.get(`${API_URL}/clientsList`);
            console.log('Raw clientsList data:', clientsResponse.data);
            
            let clientsData = [];
            if (Array.isArray(clientsResponse.data)) {
              clientsData = clientsResponse.data;
            } else if (typeof clientsResponse.data === 'object') {
              clientsData = Object.values(clientsResponse.data);
            }
            
            setClients(clientsData);
            console.log('Processed clients from alternative endpoint:', clientsData);
          } catch (err2) {
            console.log('Could not fetch clients from any endpoint:', err2);
            setClients([]);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setDataLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic validation
    if (!email || !password || !role) {
      setError('Please fill in all fields and select a role');
      setLoading(false);
      return;
    }

    try {
      if (role === 'owner') {
        // Fixed credentials for owner
        if (email === 'admin@golfking.com' && password === 'password123') {
          onLogin('owner', email);
        } else {
          setError('Invalid owner credentials');
        }
      } else if (role === 'employee') {
        console.log('Checking against employees:', employees);
        
        const employee = employees.find(emp => {
          // Handle different possible field names
          const empEmail = emp.email || emp.gmail || emp.mail || emp.employeeEmail;
          const empPassword = emp.password || emp.pass || emp.employeePassword;
          console.log(`Checking employee: ${empEmail} against ${email}, password match: ${empPassword === password}`);
          return empEmail === email && empPassword === password;
        });
        
        if (employee) {
          onLogin('employee', email);
        } else {
          setError('Invalid employee credentials');
        }
      } else if (role === 'client') {
        console.log('Checking against clients:', clients);
        
        const client = clients.find(cli => {
          // Handle different possible field names
          const clientEmail = cli.email || cli.gmail || cli.mail || cli.clientEmail;
          const clientPassword = cli.password || cli.pass || cli.clientPassword;
          console.log(`Checking client: ${clientEmail} against ${email}, password match: ${clientPassword === password}`);
          return clientEmail === email && clientPassword === password;
        });
        
        if (client) {
          onLogin('client', email);
        } else {
          setError('Invalid client credentials');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again.');
    }
    
    setLoading(false);
  };

  // Show loading while fetching data
  if (dataLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            width: '100%',
            maxWidth: 400,
            padding: 3,
            boxShadow: 3,
            backgroundColor: '#2f2b3e',
            color: '#fff'
          }}
        >
          <CardContent>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Welcome to Stockify
              </Typography>
              <Typography variant="h6" color="rgba(255,255,255,0.7)">
                Sign in to your account
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <FormControl fullWidth margin="normal">
                <InputLabel sx={{ color: 'rgba(255,255,255,0.7)' }}>I am a</InputLabel>
                <Select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  label="I am a"
                  sx={{
                    color: '#fff',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255,255,255,0.3)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255,255,255,0.5)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#fff',
                    },
                    '& .MuiSvgIcon-root': {
                      color: '#fff',
                    },
                  }}
                >
                  <MenuItem value="owner">Owner</MenuItem>
                  <MenuItem value="employee">Employee</MenuItem>
                  <MenuItem value="client">Client</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(255,255,255,0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255,255,255,0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#fff',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255,255,255,0.7)',
                  },
                  '& .MuiOutlinedInput-input': {
                    color: '#fff',
                  },
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(255,255,255,0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255,255,255,0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#fff',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255,255,255,0.7)',
                  },
                  '& .MuiOutlinedInput-input': {
                    color: '#fff',
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                startIcon={<LoginIcon />}
                disabled={loading}
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: '#4caf50',
                  '&:hover': {
                    backgroundColor: '#45a049',
                  },
                  padding: '12px',
                  fontSize: '16px'
                }}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="rgba(255,255,255,0.6)">
               <br/>
                Demo credentials:
              </Typography>
              <Typography variant="body2" color="rgba(255,255,255,0.6)">
                Owner - Email: admin@golfking.com, Password: password123
              </Typography>
              <Typography variant="body2" color="rgba(255,255,255,0.6)">
                Employee/Client credentials from server data
              </Typography>
              <Typography variant="body2" color="rgba(255,255,255,0.5)" sx={{ mt: 1, fontSize: '0.75rem' }}>
                Employees loaded: {employees.length} | Clients loaded: {clients.length}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Login;
