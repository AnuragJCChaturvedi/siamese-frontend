import React, { useEffect, useState } from 'react';
import { Typography, Container, Grid, Button } from '@mui/material';
import './UserData.css'; // Import the CSS file

const UserData = () => {
  const [isActive, setIsActive] = useState(false);
  const user = JSON.parse(sessionStorage.getItem('user'));
  const [money, setMoney] = useState(0); // State for storing user's money

  // Simulate fetching user's money from an API
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsActive(true);
      setMoney(1000); // Simulate fetching money amount
    }, 1000); // Increased delay for better UX

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Container className={`userDataContainer ${isActive ? 'active' : ''}`} >
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h4" align="center">Welcome, {user.firstName} {user.lastName}!</Typography>
        </Grid>
        <Grid item xs={12} md={6} style={{ marginTop: '10px' }}>
          <Button variant="contained" color="primary" fullWidth>Check Balance</Button>
        </Grid>
        <Grid item xs={12} md={6} style={{ marginTop: '10px' }}>
          <Button variant="contained" color="primary" fullWidth>Fund Transfer</Button>
        </Grid>
        <Grid item xs={12} md={6} style={{ marginTop: '10px' }}>
          <Button variant="contained" color="primary" fullWidth>Savings Account</Button>
        </Grid>
        <Grid item xs={12} md={6} style={{ marginTop: '10px' }}>
          <Button variant="contained" color="primary" fullWidth>Quick Cash</Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserData;