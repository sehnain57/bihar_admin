import React, { useState } from 'react';
import { Box, Button, Container, Typography, Paper, CircularProgress, TextField } from '@mui/material';
import { loginUser } from '../../Api/karyakarthas'; // Ensure this path is correct

const AddKaryakartha = () => {
  const [loginData, setLoginData] = useState({
    phoneNum: '',
    epicNumber: '',  // EPIC number should be stored separately
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const data = await loginUser(loginData);
      setSuccessMessage('User logged in successfully');
      // Handle further actions here, such as redirecting the user or saving tokens
    } catch (error) {
      setError('Failed to log in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Add New Karyakartha
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
        <Paper elevation={3} sx={{ padding: '30px', borderRadius: '8px', width: "50%" }}>
          <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
            Search by
          </Typography>
          <Box>
            <TextField
              fullWidth
              label="Phone Number"
              placeholder="Enter Phone Number"
              name="phoneNum"
              variant="outlined"
              margin="normal"
              value={loginData.phoneNum} 
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="EPIC NUMBER"
              placeholder="Enter EPIC Number"
              name="epicNumber"
              variant="outlined"
              margin="normal"
              value={loginData.epicNumber} 
              onChange={handleChange}
            />
          </Box>

          {error && (
            <Typography color="error" sx={{ textAlign: 'center', marginTop: '10px' }}>
              {error}
            </Typography>
          )}

          {successMessage && (
            <Typography color="success" sx={{ textAlign: 'center', marginTop: '10px' }}>
              {successMessage}
            </Typography>
          )}

          <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#007AFF", width: '100%' }}
              size="large"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Search'}
            </Button>
          </Box>
        </Paper>
      </Box>

      <Box sx={{ marginTop: '40px' }}>
        <Typography variant="h6" gutterBottom>
          Results
        </Typography>
        <Paper elevation={3} sx={{ padding: '20px', minHeight: '200px', borderRadius: '8px' }}>
          <Typography>No results to display</Typography>
          {/* Here you can map through and display results */}
        </Paper>
      </Box>

      <Box sx={{ textAlign: 'center', marginTop: '40px' }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#007AFF", padding: '10px 30px', fontSize: '16px' }}
          size="large"
        >
          Add as Karyakartha
        </Button>
      </Box>
    </Container>
  );
};

export default AddKaryakartha;
