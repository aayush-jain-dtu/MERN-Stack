import React from 'react';
import { useState,useEffect } from 'react';
import axios from "axios";
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
  Fab
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const employees = [
  { name: 'Emp 1', email: 'emp1@yopmail.com', contact: '1234567980', role: 'Employee', dept: 'Operations' },
  { name: 'Bhawani Sharma', email: '1234567890@gmail.com', contact: '1234567890', role: 'Employee', dept: 'Operations' },
  { name: 'Manubhav Batra', email: 'batra123@yopmail.com', contact: '9718046008', role: 'Employee', dept: 'Operations' },
  { name: 'Prod Test', email: 'prodtest@yopmail.com', contact: '9999955555', role: 'Employee', dept: 'Production' },
];

export default function Employees() {
  const [array, setArray] = useState([]);

  const fetchAPI=async()=>{
    const response = await axios.get("http://localhost:8080/api");
    setArray(response.data.fruits);
    console.log(response.data.fruits);
  };

  useEffect(()=>{
   fetchAPI();
  },[])
  return (
    <>
    <Box p={2} position="relative">
      <TableContainer component={Paper} sx={{ backgroundColor: '#1f1f27' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>Name</TableCell>
              <TableCell sx={{ color: 'white' }}>Email</TableCell>
              <TableCell sx={{ color: 'white' }}>Contact</TableCell>
              <TableCell sx={{ color: 'white' }}>Role</TableCell>
              <TableCell sx={{ color: 'white' }}>Department</TableCell>
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
                <TableCell sx={{ color: 'white' }}>
                  <IconButton sx={{ color: 'white' }}><EditIcon /></IconButton>
                  <IconButton sx={{ color: 'white' }}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Fab color="primary" sx={{ position: 'fixed', bottom: 24, right: 24, bgcolor: '#9F70FD' }}>
        <AddIcon />
      </Fab>
    </Box>
   </>
    
  );
}
