import React, { useState } from 'react';
import { Container, TextField, MenuItem, Button, Box, Typography, Paper, IconButton, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const states = ['Bihar'];
const districts = ['Select District'];
const assemblies = ['Select Assembly'];
const languages = ['Select Language'];

const VoterList = () => {
  const [alertOpen, setAlertOpen] = useState(true);

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {alertOpen && (
        <Alert
          severity="info"
          sx={{ mb: 2 }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleCloseAlert}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          This is an important notice for all voters.
        </Alert>
      )}
      <Typography variant="h6" gutterBottom sx={{ mb: 2, bgcolor: '#e0f7fa', p: 1 }}>
        Electoral Roll
      </Typography>

      <Paper elevation={3} sx={{ p: 3 }}>

        <Box component="form" noValidate autoComplete="off">
          <TextField
            select
            label="State"
            fullWidth
            margin="normal"
            required
            defaultValue={states[0]}
          >
            {states.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="District"
            fullWidth
            margin="normal"
            defaultValue={districts[0]}
          >
            {districts.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Assembly Constituency"
            fullWidth
            margin="normal"
            required
            defaultValue={assemblies[0]}
            disabled
          >
            {assemblies.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Select Language"
            fullWidth
            margin="normal"
            required
            defaultValue={languages[0]}
          >
            {languages.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <Box display="flex" alignItems="center" mt={2}>
            <img src="captcha_image_url" alt="captcha" style={{ marginRight: '16px', border: '1px solid #ccc' }} />
            <TextField
              label="Captcha"
              required
              sx={{ flexGrow: 1 }}
            />
            <Button variant="outlined" sx={{ ml: 2 }}>↻</Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default VoterList;
