import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Select, MenuItem } from '@mui/material';
import Swal from 'sweetalert2';
import { createBooth, getAllBooths } from '../../Api/booth'; // Adjust the import path according to your project structure

function AddBooth() {
  const [formData, setFormData] = useState({
    name: '',
    constituency: '',
  });
  
  const [constituencies, setConstituencies] = useState([]);

  // Fetch booth data on component mount
  useEffect(() => {
    const fetchBooths = async () => {
      try {
        const response = await getAllBooths();
        const data = response.data || [];
        
        // Extract unique constituency values
        const uniqueConstituencies = [...new Set(data.map(booth => booth.constituency).filter(Boolean))];
        setConstituencies(uniqueConstituencies);
      } catch (err) {
        console.error('Error fetching booths:', err);
      }
    };

    fetchBooths();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        name: formData.name,
        constituency: formData.constituency,
      };
      
      await createBooth(payload);
      Swal.fire("Success", "Booth added successfully", "success");
      setFormData({ name: '', constituency: '' }); // Clear the form fields after submission
    } catch (err) {
      console.error('Error adding booth:', err);
      Swal.fire("Error", "Failed to add booth", "error");
    }
  };

  return (
    <Box sx={{ maxWidth: '600px', margin: '0 auto', p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Add Booth
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          label="Booth Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
        />

        {/* Dropdown for Constituency */}
        <Select
          label="Constituency"
          name="constituency"
          value={formData.constituency}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
          displayEmpty
        >
          <MenuItem value="">
            <em>Select Constituency</em>
          </MenuItem>
          {constituencies.map((constituency, index) => (
            <MenuItem key={index} value={constituency}>
              {constituency}
            </MenuItem>
          ))}
        </Select>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 2 }}
          fullWidth
        >
          Add Booth
        </Button>
      </Box>
    </Box>
  );
}

export default AddBooth;
