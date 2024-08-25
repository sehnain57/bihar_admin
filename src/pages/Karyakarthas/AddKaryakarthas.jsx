import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  CircularProgress,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { searchUsers } from '../../Api/user'; // Ensure this path is correct

const AddKaryakartha = () => {
  const [loginData, setLoginData] = useState({
    phoneNum: '',
    epicNumber: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [searchResults, setSearchResults] = useState([]); // State to store search results

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    setSuccessMessage('');
    setSearchResults([]);

    try {
      const data = await searchUsers(loginData.phoneNum, loginData.epicNumber);
      setSearchResults(data.data); // Update to use the 'data' array from the API response
      setSuccessMessage('User search completed successfully');
    } catch (error) {
      setError('Failed to search users. Please try again.');
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
              onClick={handleSearch}
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
        <Paper elevation={3} sx={{ padding: '20px', borderRadius: '8px' }}>
          {searchResults.length === 0 ? (
            <Typography>No results to display</Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="user search results">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Name</strong></TableCell>
                    <TableCell><strong>Phone</strong></TableCell>
                    <TableCell><strong>EPIC Number</strong></TableCell>
                    <TableCell><strong>Constituency</strong></TableCell>
                    <TableCell><strong>Booth</strong></TableCell>
                    <TableCell><strong>Email</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchResults.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.fullName}</TableCell>
                      <TableCell>{user.mobileNumber}</TableCell>
                      <TableCell>{user.epicId}</TableCell>
                      <TableCell>{user.legislativeConstituency}</TableCell>
                      <TableCell>{user.boothNameOrNumber}</TableCell>
                      <TableCell>{user.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default AddKaryakartha;
