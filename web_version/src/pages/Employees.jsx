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
  IconButton,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert,
  MenuItem,
  Tooltip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LockIcon from '@mui/icons-material/Lock';

const API_URL = import.meta.env.VITE_API_URL;

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    role: '',
    dept: '',
    salary: '',
    leaves: '',
    password: ''
  });
  const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${API_URL}/employees`);
      setEmployees(response.data.employees);
      console.log('Employees fetched:', response.data.employees);
    } catch (error) {
      console.error('Error fetching employees:', error);
      setAlert({ show: true, message: 'Error fetching employees', type: 'error' });
    }
  };

  useEffect(() => {
    fetchEmployees();
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
        password: formData.password || 'listiphy@1234' // Default password if not provided
      };
      await axios.post(`${API_URL}/employees`, submitData);
      setAlert({ show: true, message: 'Employee added successfully!', type: 'success' });
      setFormData({ name: '', email: '', contact: '', role: '', dept: '', salary: '', leaves: '', password: '' });
      setOpen(false);
      fetchEmployees(); // Refresh the list
    } catch (error) {
      console.error('Error adding employee:', error);
      setAlert({ show: true, message: 'Error adding employee', type: 'error' });
    }
  };

  const handleDelete = async (index) => {
    try {
      console.log('Employee data structure:', employees[0]);
      await axios.delete(`${API_URL}/employees/${index}`);
      setAlert({ show: true, message: 'Employee deleted successfully!', type: 'success' });
      fetchEmployees(); // Refresh the list
    } catch (error) {
      console.error('Error deleting employee:', error);
      setAlert({ show: true, message: 'Error deleting employee', type: 'error' });
    }
  };

  const handleIncreaseLeaves = async (index) => {
    try {
      // Update locally first for immediate feedback
      const updatedEmployees = [...employees];
      updatedEmployees[index].leaves += 1;
      setEmployees(updatedEmployees);

      // Then update on server
      await axios.patch(`${API_URL}/employees/${index}/leaves`, {
        leaves: updatedEmployees[index].leaves
      });
      
      setAlert({ show: true, message: 'Leaves updated successfully!', type: 'success' });
    } catch (error) {
      console.error('Error updating leaves:', error);
      setAlert({ show: true, message: 'Error updating leaves', type: 'error' });
      // Revert local change on error
      fetchEmployees();
    }
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({ name: '', email: '', contact: '', role: '', dept: '', salary: '', leaves: '', password: '' });
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

  const departments = ['Operations', 'Production', 'HR', 'IT', 'Finance', 'Marketing'];
  const roles = ['Employee', 'Team Lead', 'Manager', 'Senior Manager', 'Director'];

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
              <TableCell sx={{ color: 'white' }}>Role</TableCell>
              <TableCell sx={{ color: 'white' }}>Department</TableCell>
              <TableCell sx={{ color: 'white' }}>Salary (INR)</TableCell>
              <TableCell sx={{ color: 'white' }}>Leaves in Month</TableCell>
              {showPasswords && (
                <TableCell sx={{ color: 'white' }}>Password</TableCell>
              )}
              <TableCell sx={{ color: 'white' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((emp, index) => (
              <TableRow key={index}>
                <TableCell sx={{ color: 'white' }}>{emp.name}</TableCell>
                <TableCell sx={{ color: 'white' }}>{emp.email}</TableCell>
                <TableCell sx={{ color: 'white' }}>{emp.contact}</TableCell>
                <TableCell sx={{ color: 'white' }}>{emp.role}</TableCell>
                <TableCell sx={{ color: 'white' }}>{emp.dept}</TableCell>
                <TableCell sx={{ color: 'white' }}>₹{emp.salary?.toLocaleString()}</TableCell>
                <TableCell sx={{ color: 'white' }}>
                  <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
                    {emp.leaves}
                    <IconButton 
                      size="small"
                      sx={{ color: '#9F70FD', padding: '2px' }} 
                      onClick={() => handleIncreaseLeaves(index)}
                    >
                      <AddCircleOutlineIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
                {showPasswords && (
                  <TableCell sx={{ color: 'white', fontFamily: 'monospace' }}>
                    {emp.password || 'listiphy@1234'}
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

      {/* Add Employee Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Employee</DialogTitle>
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
              name="role"
              label="Role"
              select
              fullWidth
              variant="outlined"
              value={formData.role}
              onChange={handleInputChange}
              required
            >
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              margin="dense"
              name="dept"
              label="Department"
              select
              fullWidth
              variant="outlined"
              value={formData.dept}
              onChange={handleInputChange}
              required
            >
              {departments.map((dept) => (
                <MenuItem key={dept} value={dept}>
                  {dept}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              margin="dense"
              name="salary"
              label="Salary (INR)"
              type="number"
              fullWidth
              variant="outlined"
              value={formData.salary}
              onChange={handleInputChange}
              required
            />
            <TextField
              margin="dense"
              name="leaves"
              label="Leaves in Month"
              type="number"
              fullWidth
              variant="outlined"
              value={formData.leaves}
              onChange={handleInputChange}
              required
              inputProps={{ min: 0, max: 31 }}
            />
            <TextField
              margin="dense"
              name="password"
              label="Password (optional - defaults to listiphy@1234)"
              type="password"
              fullWidth
              variant="outlined"
              value={formData.password}
              onChange={handleInputChange}
              helperText="Leave blank to use default password: listiphy@1234"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: '#9F70FD' }}>
              Add Employee
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Password Dialog */}
      <Dialog open={passwordDialogOpen} onClose={handlePasswordDialogClose}>
        <DialogTitle>Enter Password to View Employee Passwords</DialogTitle>
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
