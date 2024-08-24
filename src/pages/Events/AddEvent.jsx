import React, { useState } from 'react';
import { Box, Button, Container, Typography, Grid, FormControl } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import InputField from '../../components/InputField'; // Update the path as per your project structure
import { addEvent } from '../../Api/event';

const AddEvent = () => {
  const [formData, setFormData] = useState({
    eventTitle: '',
    date: '',
    fromTime: '',
    toTime: '',
    constituency: '',
    boothNumber: '',
    status: 1,
    documents: null, // Assuming document is a file
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Manually convert date to UTC ISO format
    const localDate = dayjs(formData.date);
    const utcDate = localDate.add(localDate.utcOffset(), 'minute').format(); // Manually adjust for UTC

    const formDataToSend = new FormData();

    // Append all the form data, with the manually converted UTC date
    formDataToSend.append('eventTitle', formData.eventTitle);
    formDataToSend.append('date', utcDate);
    formDataToSend.append('fromTime', formData.fromTime);
    formDataToSend.append('toTime', formData.toTime);
    formDataToSend.append('constituency', formData.constituency);
    formDataToSend.append('boothNumber', formData.boothNumber);
    formDataToSend.append('status', formData.status);
    if (formData.documents) {
      formDataToSend.append('documents', formData.documents);
    }

    console.log("Form Data being sent:", formDataToSend);

    await addEvent(formDataToSend).then((res) => {
      console.log(res);
    });
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '50px', backgroundColor: "white", padding: 20, borderRadius: 5 }}>
      <Box>
        <Typography variant="h4" align="left" gutterBottom>
          Add Event
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box sx={{ border: '1px solid #e0e0e0', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar
                    onChange={(date) => setFormData({ ...formData, date })}
                  />
                </LocalizationProvider>
              </Box>

              <InputField
                fullWidth
                type="time"
                label="Select Start Time"
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
                type="time"
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
                  name="documents"
                  onChange={handleChange}
                />
                <FormControl fullWidth margin="normal">
                  <Button
                    component="label"
                    htmlFor="file-input"
                    variant="outlined"
                    sx={{
                      width: 60,
                      height: 60,
                      minWidth: 60,
                      minHeight: 60,
                      borderRadius: '50%',
                      borderColor: '#007AFF',
                      backgroundColor: '#f0f0f0',
                      '&:hover': {
                        backgroundColor: '#e0e0e0',
                      },
                    }}
                  >
                    Add
                  </Button>
                </FormControl>
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
