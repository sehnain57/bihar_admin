import React, { useState } from 'react';
import { Box, Button, Container, Typography, Paper } from '@mui/material';
import Swal from 'sweetalert2';
import axios from 'axios';

import InputField from '../../components/InputField';

const searchUser = async (fullName, epicNumber) => {
  try {
    // Assuming there's an API to search users by fullName or epicNumber
    const response = await axios.get('https://biharb.leadgenadvertisements.com/api/user/v1/users', {
      params: {
        fullName, // Add this only if searching by fullName
        epicNumber, // Add this only if searching by epicNumber
      },
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you're storing the token in localStorage
      },
    });

    // Assuming the response contains the user data
    if (response.data && response.data.length > 0) {
      return response.data[0]; // Return the first matched user
    } 
      Swal.fire('Error', 'User not found', 'error');
      return null;
    
  } catch (err) {
    console.error('Failed to search user:', err.response ? err.response.data : err.message);
    Swal.fire('Error', 'Failed to search user', 'error');
    throw err;
  }
};

const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`https://biharb.leadgenadvertisements.com/api/user/v1/users/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.data.success) {
      Swal.fire('Success', 'User deleted successfully', 'success');
      return response.data;
    }
  } catch (err) {
    console.error('Failed to delete user:', err.response ? err.response.data : err.message);
    Swal.fire('Error', 'Failed to delete user', 'error');
    throw err;
  }
};

function RemoveKaryakarthas() {
  const [epicNumber, setEpicNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [userId, setUserId] = useState(null); // to store the ID of the user to delete
  const [searchResult, setSearchResult] = useState(null); // to store the search result

  const handleSearch = async () => {
    try {
      const user = await searchUser(fullName, epicNumber);
      if (user) {
        setUserId(user.id);
        setSearchResult(user);
      }
    } catch (err) {
      console.error('Failed to search user:', err);
    }
  };

  const handleDelete = async () => {
    if (userId) {
      try {
        await deleteUser(userId);
        setSearchResult(null); // Clear the search result after deletion
        setEpicNumber('');
        setFullName('');
        setUserId(null);
      } catch (err) {
        console.error('Failed to delete user:', err);
      }
    } else {
      Swal.fire('Error', 'Please search and select a user to delete', 'error');
    }
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '10px' }}>
      <Typography variant="h5" gutterBottom>
        Remove Karyakartha
      </Typography>

      <Box sx={{ justifyContent: 'center', marginTop: '20px' }}>
        <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
          Search by
        </Typography>
        <Box sx={{ padding: '20px', border: '1px solid black', borderRadius: '8px', width: "60%", margin: "0px auto" }}>
          <Box>
            <InputField
              fullWidth
              label="Full Name"
              placeholder="Enter Full Name"
              variant="outlined"
              margin="normal"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              sxLabel={{ marginTop: "20px" }}
            />
            <InputField
              fullWidth
              label="EPIC NUMBER"
              placeholder="Enter EPIC Number"
              variant="outlined"
              margin="normal"
              value={epicNumber}
              onChange={(e) => setEpicNumber(e.target.value)}
              sxLabel={{ marginTop: "20px" }}
            />
          </Box>

          <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
            <Button variant="contained" sx={{ backgroundColor: "#007AFF" }} size="large" onClick={handleSearch}>
              Search
            </Button>
          </Box>
        </Box>
      </Box>

      <Box sx={{ marginTop: '40px' }}>
        <Typography variant="h6" gutterBottom>
          Results
        </Typography>
        <Paper elevation={3} sx={{ padding: '20px', minHeight: '200px', borderRadius: '8px' }}>
          {searchResult ? (
            <div>
              <Typography variant="body1"><strong>Full Name:</strong> {searchResult.fullName}</Typography>
              <Typography variant="body1"><strong>EPIC Number:</strong> {searchResult.epicNumber}</Typography>
              <Typography variant="body1"><strong>Email:</strong> {searchResult.email}</Typography>
            </div>
          ) : (
            <Typography variant="body1">No results found</Typography>
          )}
        </Paper>
      </Box>

      <Box sx={{ textAlign: 'center', marginTop: '40px' }}>
        <Button variant="contained" sx={{ backgroundColor: "#007AFF" }} size="large" onClick={handleDelete}>
          Remove as Karyakartha
        </Button>
      </Box>
    </Container>
  );
}

export default RemoveKaryakarthas;
