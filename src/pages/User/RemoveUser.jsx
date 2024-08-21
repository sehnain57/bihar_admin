import React, { useState } from 'react';
import { Box, Button, Container, Typography, Paper } from '@mui/material';
import { getUsers, removeUser } from '../../Api/user';
import InputField from '../../components/InputField'; // Update the path according to your project structure

const RemoveUser = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    epicNumber: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    // Add your search logic here
    await getUsers(formData.fullName).then((res) => {
      console.log(res)
    })
    console.log('Search Data:', formData);
  };

  const handleRemove = async (id) => {
    // Add your remove logic here
    await removeUser(id);

    // Swal.fire("Success", "User removed successfully", "success")
    console.log('Remove User:', formData);
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '10px' }}>
      <Typography variant="h5" gutterBottom>
        Remove USER
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px', }}>
        <Box sx={{ padding: '20px', border: '1px solid black', borderRadius: '8px', width: "50%" }}>
          <Typography variant="h6" gutterBottom>
            Search by
          </Typography>
          <Box>
            <InputField
              fullWidth
              label="Full Name"
              placeholder="Enter Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              sx={{ mb: 4 }}
            />
            <InputField
              fullWidth
              label="EPIC NUMBER"
              placeholder="Enter EPIC Number"
              name="epicNumber"
              value={formData.epicNumber}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            />
          </Box>
          <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
            <Button variant="contained" color="primary" size="large" onClick={handleSearch}>
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
          {/* Results will be displayed here */}
        </Paper>
      </Box>

      <Box sx={{ textAlign: 'center', marginTop: '40px' }}>
        <Button variant="contained" color="primary" size="large" onClick={handleRemove}>
          Remove USER
        </Button>
      </Box>
    </Container>
  );
};

export default RemoveUser;
