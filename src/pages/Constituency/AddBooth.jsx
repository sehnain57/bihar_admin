import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Select, MenuItem } from '@mui/material';
import Swal from 'sweetalert2';
import { createBooth, getAllBooths } from '../../Api/booth'; // Adjust the import path according to your project structure

function AddBooth() {
  const [formData, setFormData] = useState({
    name: '',
    constituencyId: '', // Changed from constituency to constituencyId
  });

  const [constituencies, setConstituencies] = useState([]);

  // Fetch booth data on component mount
  useEffect(() => {
    const fetchBooths = async () => {
      try {
        const response = await getAllBooths();
        const data = response.data || [];

        // Extract unique constituencies with IDs and names
        const uniqueConstituencies = [...new Map(data.map(booth => [booth.constituency.id, booth.constituency])).values()];
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
        constituencyId: formData.constituencyId, // Sending constituencyId instead of name
      };

      await createBooth(payload);
      Swal.fire("Success", "Booth added successfully", "success");
      setFormData({ name: '', constituencyId: '' }); // Clear the form fields after submission
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
          name="constituencyId" // Changed from constituency to constituencyId
          value={formData.constituencyId}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
          displayEmpty
        >
          <MenuItem value="">
            <em>Select Constituency</em>
          </MenuItem>
          {constituencies.map((constituency) => (
            <MenuItem key={constituency.id} value={constituency.id}>
              {constituency.name}
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
