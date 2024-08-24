import React, { useState, useEffect } from 'react';
import { Box, Typography, Select, MenuItem, Button, Grid, InputLabel, FormControl } from '@mui/material';
import InputField from '../../components/InputField'; // Update the path as per your project structure
import { getAllBooths } from '../../Api/booth'; // Assuming this function fetches the booth data from the API
import { getAllConstituencies } from '../../Api/constituencies';
import { registerEpicUser } from '../../Api/user'; // Import the registerEpicUser function

const AddUser = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    gender: '',
    age: 0,
    epicId: '',
    legislativeConstituency: '',
    boothNameOrNumber: '',
    mobileNumber: '',
    email: '',
  });

  const [booths, setBooths] = useState([]);
  const [constituencies, setConstituencies] = useState([]);

  useEffect(() => {
    const fetchBoothsAndConstituencies = async () => {
      try {
        const boothResponse = await getAllBooths();
        const constituencyResponse = await getAllConstituencies();

        if (boothResponse.success) {
          setBooths(boothResponse.data);
        }

        if (constituencyResponse.success) {
          setConstituencies(constituencyResponse.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBoothsAndConstituencies();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.name === 'age' ? parseInt(e.target.value, 10) : e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await registerEpicUser(formData);
      console.log('User registered successfully:', response);
      // You can add a success notification here
    } catch (error) {
      console.error('Error during registration:', error);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <Box sx={{ maxWidth: 'lg', margin: 'auto', padding: '20px', border: '1px solid black', borderRadius: '30px' }}>
      <Typography variant="h5" gutterBottom>
        Add New User
      </Typography>

      <Grid container spacing={2}>
        {/* Other input fields... */}
        <Grid item xs={12}>
          <InputField
            fullWidth
            label="Enter Full Name"
            placeholder="Enter Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            sx={{ bgcolor: '#EAECF0' }}
          />
        </Grid>

        <Grid item xs={12}>
          <InputField
            fullWidth
            label="Father Name"
            placeholder="Enter Father Name"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            sx={{ bgcolor: '#EAECF0' }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Gender</InputLabel>
            <Select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              variant="outlined"
              sx={{ bgcolor: '#EAECF0' }}
            >
              <MenuItem value="MALE">Male</MenuItem>
              <MenuItem value="FEMALE">Female</MenuItem>
              <MenuItem value="OTHER">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <InputField
            fullWidth
            type="number"
            label="AGE"
            placeholder="Enter Age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            sx={{ bgcolor: '#EAECF0' }}
          />
        </Grid>

        <Grid item xs={12}>
          <InputField
            fullWidth
            label="VOTER ID"
            placeholder="Enter EPIC Number"
            name="epicId"
            value={formData.epicId}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            sx={{ bgcolor: '#EAECF0' }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Legislative Constituency</InputLabel>
            <Select
              name="legislativeConstituency"
              value={formData.legislativeConstituency}
              onChange={handleChange}
              variant="outlined"
              sx={{ bgcolor: '#EAECF0', marginTop:2 }}
            >
              {constituencies.map((constituency) => (
                <MenuItem key={constituency.id} value={constituency.name}>
                  {constituency.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Booth Name/Number</InputLabel>
            <Select
              name="boothNameOrNumber"
              value={formData.boothNameOrNumber}
              onChange={handleChange}
              variant="outlined"
              sx={{ bgcolor: '#EAECF0', marginTop:2 }}
            >
              {booths.map((booth) => (
                <MenuItem key={booth.id} value={booth.name}>
                  {booth.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <InputField
            fullWidth
            label="Contact Number"
            placeholder="Enter Contact Number"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            sx={{ bgcolor: '#EAECF0' }}
          />
        </Grid>

        <Grid item xs={12}>
          <InputField
            fullWidth
            label="Email"
            placeholder="Enter Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            sx={{ bgcolor: '#EAECF0' }}
          />
        </Grid>

        <Grid item xs={12}>
          <Button fullWidth variant="contained" color="primary" size="large" onClick={handleSubmit}>
            Add USER
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddUser;
