import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import SpecificProductGrid from '../components/SpecificProductGrid';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Badge
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [hasUnread, setHasUnread] = useState(false);

  // Check if there's a newer notification than last read
  const checkUnread = (notifications) => {
    const lastRead = localStorage.getItem("lastNotificationReadTime");
    if (!lastRead) return true;

    const lastReadTime = new Date(lastRead).getTime();
    const latestNotifTime = notifications.length > 0 ? new Date(notifications[0].date).getTime() : 0;

    return latestNotifTime > lastReadTime;
  };

  const fetchNotifications = async () => {
    try {
      const res = await axios.get("${API_URL}/notifications");
      setNotifications(res.data);
      setHasUnread(checkUnread(res.data));
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleNotifOpen = () => {
    setNotifOpen(true);
    setHasUnread(false);
    localStorage.setItem("lastNotificationReadTime", new Date().toISOString());
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h5" gutterBottom>
                  Golfking products category
                </Typography>

                {/* Notification Bell with Red Dot */}
                <IconButton onClick={handleNotifOpen}>
                  <Badge
                    color="error"
                    variant="dot"
                    overlap="circular"
                    invisible={!hasUnread}
                  >
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Box>

              <TextField
                fullWidth
                placeholder="Search for category..."
                sx={{ mb: 3 }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <ProductGrid searchTerm={searchTerm} />

              {/* Notifications Dialog */}
              <Dialog
                open={notifOpen}
                onClose={() => setNotifOpen(false)}
                fullWidth
                maxWidth="sm"
              >
                <DialogTitle>Notifications</DialogTitle>
                <DialogContent dividers>
                  <List>
                    {notifications.length > 0 ? (
                      notifications.map((n) => (
                        <ListItem key={n.id} divider>
                          <ListItemText
                            primary={n.title}
                            secondary={`${n.message} — ${new Date(n.date).toLocaleString()}`}
                          />
                        </ListItem>
                      ))
                    ) : (
                      <Typography>No notifications yet</Typography>
                    )}
                  </List>
                </DialogContent>
              </Dialog>
            </>
          }
        />
        <Route path="/category/:category" element={<SpecificProductGrid />} />
      </Routes>
    </Box>
  );
};

export default Home;
