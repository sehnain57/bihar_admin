import React, { useState } from 'react';
import { Box, Typography, Select, MenuItem, Button, Grid, InputLabel, FormControl } from '@mui/material';
import InputField from '../../components/InputField'; // Update the path as per your project structure

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
    email: '', // Add email if it's part of the form
  });

  const handleChange = (e) => {
    // console.log(e.target.name)
    setFormData({ ...formData, [e.target.name]: e.target.name === "age" ? parseInt(e.target.value, 10) : e.target.value });
  };

  const handleSubmit = async () => {
    try {
      // const response = await registerUser(formData);
      // console.log('User registered successfully:', response);
      // Swal.fire("Success", "User added successfuly", "success")
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
            sx={{ bgcolor: "#EAECF0" }}
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
            sx={{ bgcolor: "#EAECF0" }}
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
              sx={{ bgcolor: "#EAECF0" }}
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
            sx={{ bgcolor: "#EAECF0" }}
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
            sx={{ bgcolor: "#EAECF0" }}
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
              sx={{ bgcolor: "#EAECF0" }}
            >
              <MenuItem value="Constituency 1">Constituency 1</MenuItem>
              <MenuItem value="Constituency 2">Constituency 2</MenuItem>
              <MenuItem value="Constituency 3">Constituency 3</MenuItem>
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
              sx={{ bgcolor: "#EAECF0" }}
            >
              <MenuItem value="Booth 1">Booth 1</MenuItem>
              <MenuItem value="Booth 2">Booth 2</MenuItem>
              <MenuItem value="Booth 3">Booth 3</MenuItem>
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
            sx={{ bgcolor: "#EAECF0" }}
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
            sx={{ bgcolor: "#EAECF0" }}
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
