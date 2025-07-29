import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  TextField,
  Button,
  IconButton,
  Grid
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Notifications as NotificationsIcon,
  Send as SendIcon
} from '@mui/icons-material';
import axios from 'axios';

const SendNotification = () => {
  const [formData, setFormData] = useState({
    title: '',
    message: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

 const handleSendNotification = async () => {
  try {
    await axios.post("http://localhost:8080/notifications", formData);
    alert("Notification sent!");
    setFormData({ title: '', message: '' });
  } catch (error) {
    console.error("Error sending notification:", error);
    alert("Failed to send notification.");
  }
};

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 3, mb: 3 }}>
        {/* Header */}
        <Paper elevation={2} sx={{ p: 2, mb: 3, backgroundColor: '#424242' }}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center">
              <IconButton sx={{ color: 'white', mr: 2 }}>
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>
                Send Notification
              </Typography>
            </Box>
            <IconButton sx={{ color: 'white' }}>
              <NotificationsIcon />
            </IconButton>
          </Box>
        </Paper>

        {/* Form Content */}
        <Paper elevation={1} sx={{ p: 4, backgroundColor: '#f5f5f5' }}>
          <Grid container spacing={3}>
            {/* Title Field */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                placeholder="Title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'white',
                    '& fieldset': {
                      borderColor: '#ddd',
                    },
                    '&:hover fieldset': {
                      borderColor: '#bbb',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#9c27b0',
                    },
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: '#999',
                    opacity: 1,
                  },
                }}
              />
            </Grid>

            {/* Message Field */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={6}
                placeholder="Message"
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'white',
                    '& fieldset': {
                      borderColor: '#ddd',
                    },
                    '&:hover fieldset': {
                      borderColor: '#bbb',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#9c27b0',
                    },
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: '#999',
                    opacity: 1,
                  },
                }}
              />
            </Grid>

            {/* Send Button */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                startIcon={<SendIcon />}
                fullWidth
                onClick={handleSendNotification}
                disabled={!formData.title.trim() || !formData.message.trim()}
                sx={{
                  py: 2,
                  backgroundColor: '#b39ddb',
                  color: '#424242',
                  borderRadius: '25px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: '#9575cd',
                  },
                  '&:disabled': {
                    backgroundColor: '#e0e0e0',
                    color: '#999',
                  },
                }}
              >
                Send Notification
              </Button>
            </Grid>
          </Grid>

          {/* Info Box */}
          <Box sx={{ mt: 4, p: 3, backgroundColor: '#e8f5e8', borderRadius: 2 }}>
            <Typography variant="body2" sx={{ color: '#2e7d32', textAlign: 'center' }}>
              <strong>Tip:</strong> Make sure your notification title is clear and message is informative. 
              All active users will receive this notification.
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default SendNotification;