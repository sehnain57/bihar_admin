import React, { useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import Swal from 'sweetalert2';

import { createConstituencies } from '../../Api/constituencies'; // Adjust the import paths as per your project structure
import InputField from '../../components/InputField'; // Update the path according to your project structure

const AddConstituencies = () => {
  const [formData, setFormData] = useState({
    name: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    try {
      await createConstituencies(formData.name);
      Swal.fire("Success", "Constituency added successfully", "success");
      setFormData({ name: '' }); // Clear the input field after creation
    } catch (err) {
      console.error('Error creating constituency:', err);
      Swal.fire("Error", "Failed to add constituency", "error");
    }
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '10px' }}>
      <Typography variant="h5" gutterBottom>
        Add Constituency
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Box sx={{ padding: '20px', border: '1px solid black', borderRadius: '8px', width: "50%",backgroundColor:'white', boxShadow:10 }}>
          <Typography variant="h6" gutterBottom>
            Enter Constituency Details
          </Typography>
          <Box>
            <InputField
              fullWidth
              label="Constituency Name"
              placeholder="Enter Constituency Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            />
          </Box>
          <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
            <Button variant="contained" color="primary" size="large" onClick={handleCreate}>
              Add Constituency
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default AddConstituencies;
