import React, { useState } from 'react';
import Swal from 'sweetalert2'; // Ensure to include SweetAlert2 in your project
import { Box, Button, Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { searchEpicUsers } from "../../Api/user";
import InputField from '../../components/InputField'; // Update the path according to your project structure

const RemoveUser = () => {
  const [formData, setFormData] = useState({
    mobileNumber: '',
    epicNumber: '',
  });
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    try {
      const result = await searchEpicUsers(formData.mobileNumber, formData.epicNumber);
      setSearchResults(result.data); // Assuming result.data contains the user details
      Swal.fire("Success", "User search successful", "success");
    } catch (error) {
      Swal.fire("Error", "Failed to search users", "error");
    }
  };

 

  return (
    <Container maxWidth="lg" style={{ marginTop: '10px' }}>
      {/* <Typography variant="h5" gutterBottom>
        Remove USER
      </Typography> */}

      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px', }}>
        <Box sx={{ padding: '20px', border: '1px solid black', borderRadius: '8px', width: "50%" }}>
          <Typography variant="h6" gutterBottom>
            Search by
          </Typography>
          <Box>
            <InputField
              fullWidth
              label="Mobile Number"
              placeholder="Enter Mobile Number"
              name="mobileNumber"
              value={formData.mobileNumber}
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
          {searchResults.length > 0 ? (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Full Name</TableCell>
                    <TableCell>Mobile Number</TableCell>
                    <TableCell>EPIC ID</TableCell>
                    <TableCell>Constituency</TableCell>
                    <TableCell>Booth</TableCell>
                    <TableCell>Email</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {searchResults.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
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
          ) : (
            <Typography>No results found</Typography>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default RemoveUser;
