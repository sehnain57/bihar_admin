import React, { useEffect, useState } from 'react';
import { Box, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { getAcceptedEvents } from '../Api/event';

function EventDetail() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getAcceptedEvents();
        setEvents(response.data.data); // Adjust based on the exact structure of your response
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error fetching events: {error.message}</Typography>;

  // Status mapping
  const statusMapping = {
    0: 'Accepted',
    1: 'Processing',
    2: 'Completed',
    3: 'Rejected',
  };

  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Event Title</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>From Time</TableCell>
            <TableCell>To Time</TableCell>
            <TableCell>Constituency</TableCell>
            <TableCell>Booth Number</TableCell>
            <TableCell>Mobile Number</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell>
                <Grid container spacing={2}>
                  <Grid item>
                    <img height={20} width={20} src={`https://biharb.leadgenadvertisements.com/`} alt='Profile' />
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" color="#2F4CDD">
                      {event.owner} {/* Adjust as needed */}
                    </Typography>
                    <Typography variant="body2">{event.eventTitle}</Typography>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
              <TableCell>{event.fromTime}</TableCell>
              <TableCell>{event.toTime}</TableCell>
              <TableCell>{event.constituency || 'N/A'}</TableCell>
              <TableCell>{event.boothNumber || 'N/A'}</TableCell>
              <TableCell>{event.mobileNumber || 'N/A'}</TableCell>
              <TableCell>{statusMapping[event.status] || 'Unknown'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

export default EventDetail;
