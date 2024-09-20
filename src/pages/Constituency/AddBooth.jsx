import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Select, MenuItem } from '@mui/material';
import Swal from 'sweetalert2';
import { createBooth } from '../../Api/booth'; // Adjust the import path according to your project structure
import { getAllConstituencies } from '../../Api/constituencies';

function AddBooth() {
  const [formData, setFormData] = useState({
    name: '',
    hindiName: '', // New field for Hindi name
    constituencyId: '',
  });

  const [constituencies, setConstituencies] = useState([]);

  // Fetch constituencies data on component mount
  useEffect(() => {
    const fetchConstituencies = async () => {
      try {
        const response = await getAllConstituencies();
        const data = response.data || [];

        // Extract constituencies with IDs and names
        setConstituencies(data);
      } catch (err) {
        console.error('Error fetching constituencies:', err);
      }
    };

    fetchConstituencies();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        name: formData.name,
        hindiName: formData.hindiName, // Include Hindi name in the payload
        constituencyId: formData.constituencyId,
      };

      await createBooth(payload);
      Swal.fire("Success", "Booth added successfully", "success");
      setFormData({ name: '', hindiName: '', constituencyId: '' }); // Clear the form fields after submission
    } catch (err) {
      console.error('Error adding booth:', err);
      Swal.fire("Error", "Failed to add booth", "error");
    }
  };

  return (
    <Box sx={{ maxWidth: '600px', margin: '0 auto', p: 2, backgroundColor: 'white', borderRadius: 2, boxShadow: 10 }}>
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
          sx={{ paddingBottom: '14px' }}
        />
        
        <TextField
          label="Hindi Name"
          name="hindiName"
          value={formData.hindiName}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
          sx={{ paddingBottom: '14px' }}
        />

        {/* Dropdown for Constituency */}
        <Select
          label="Constituency"
          name="constituencyId"
          value={formData.constituencyId}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
          displayEmpty
          sx={{ paddingBottom: '14px' }}
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
