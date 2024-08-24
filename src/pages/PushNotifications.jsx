import React, { useState } from 'react';
import { Box, Button, Container, Typography, Grid} from '@mui/material';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import InputField from '../components/InputField'; // Update the path according to your project structure

const AddEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    time: '',
    date: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (newDate) => {
    setFormData({ ...formData, date: newDate });
  };

  const handleSend = () => {
    // Add your send logic here
    console.log('Event Data:', formData);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '50px' }}>
      <Box>
        <Typography variant="h4" align="left" gutterBottom>
          Push Notifications
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Notifications Title</Typography>
            <InputField
              fullWidth
              label="EVENT Title"
              placeholder="Enter Event title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              sx={{ mb: 4 }}

            />
            <Typography variant="subtitle1">Description</Typography>
            <InputField
              fullWidth
              label="Event Description"
              placeholder="Write Description..."
              name="description"
              value={formData.description}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
              sx={{ mb: 4 }}

            />
            <InputField
              fullWidth
              type="time"
              label="Select Time"
              placeholder="Select Time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              sx={{ mb: 4 }}

            />
            {/* <Box sx={{ marginTop: '16px', textAlign: 'center' }}>
              <IconButton color="primary">
                <AttachFileIcon />
              </IconButton>
              <Typography variant="caption" display="block">
                Add Document (if any)
              </Typography>
            </Box> */}
          </Grid>

          <Grid item xs={12} md={6}>
            {/* Calendar */}
            <Box
              sx={{
                border: '1px solid #e0e0e0',
                padding: '16px',
                borderRadius: '8px',
                textAlign: 'center',
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  value={formData.date}
                  onChange={handleDateChange}
                />
              </LocalizationProvider>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ textAlign: 'center', marginTop: '32px' }}>
          <Button variant="contained" color="primary" size="large" onClick={handleSend}>
            Send
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddEvent;
