import React, { useState } from 'react';
import { Box, Button, Container, Typography, Grid } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import InputField from '../../components/InputField'; // Update the path as per your project structure
import { addEvent } from '../../Api/event';
// import axios from 'axios';.s

const AddEvent = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  const [formData, setFormData] = useState({
    // constituency: user.legislativeConstituency,
    toTime: '',
    // mobileNumber: user.mobileNumber,
    date: '',
    status: 1,
    fromTime: '',
    document: null, // Assuming document is a file
    eventTitle: '',
    // boothNumber: user.boothNameOrNumber
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user)

    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });

    await addEvent(formDataToSend).then((res) => {
      console.log(res)
    })
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '50px' }}>
      <Box>
        <Typography variant="h4" align="left" gutterBottom>
          Add Event
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              {/* Calendar */}
              <Box sx={{ border: '1px solid #e0e0e0', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar
                    onChange={(date) => setFormData({ ...formData, date: date.format('YYYY-MM-DD') })}
                  />
                </LocalizationProvider>
              </Box>

              <InputField
                fullWidth
                type='time'
                label="Select Time"
                placeholder="Select Time"
                name="fromTime"
                value={formData.fromTime}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                sxLabel={{ marginTop: "20px" }}
              />

              <InputField
                fullWidth
                type='time'
                label="Select End Time"
                placeholder="Select Time"
                name="toTime"
                value={formData.toTime}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                sxLabel={{ marginTop: "20px" }}
              />

            </Grid>

            <Grid item xs={12} md={6}>
              <InputField
                fullWidth
                label="Event Title"
                placeholder="Enter Event Title"
                name="eventTitle"
                value={formData.eventTitle}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
              <InputField
                fullWidth
                label="Event Description"
                placeholder="Write Description..."
                name="eventDescription"
                value={formData.eventDescription}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                multiline
                rows={10}
                sxLabel={{ marginTop: "20px" }}
              />

              <Box sx={{ marginTop: '16px', textAlign: 'center' }}>
                <input
                  accept="application/pdf,application/msword"
                  style={{ display: 'none' }}
                  id="file-input"
                  type="file"
                  name="document"
                  onChange={handleChange}
                />
                <label htmlFor="file-input">
                  {/* <Button
                    component="span"
                    variant="outlined"
                    startIcon={<AttachFileIcon />}
                    aria-label="Add Document"
                  > */}
                  Add Document
                  {/* /  </Button> */}
                </label>
                <Typography variant="caption" display="block">
                  Add Document (if any)
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ textAlign: 'center', marginTop: '32px' }}>
            <Button variant="contained" size="large" type="submit" sx={{ backgroundColor: "#007AFF" }}>
              Add To Schedule
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default AddEvent;
