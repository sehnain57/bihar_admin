import React, { useEffect, useState } from 'react';
import { Box, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { getAcceptedEvents } from '../Api/event';

function EventDetail() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getAcceptedEvents();
        // Log the response to verify its structure
        console.log(response);

        // Assuming response.data contains the events array
        if (Array.isArray(response.data)) {
          setEvents(response.data);
        } else {
          console.error("Expected an array for events, but got:", response.data);
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Event Details</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Invited By</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(events) && events.length > 0 ? (
            events.map(event => (
              <TableRow key={event.id}>
                <TableCell>
                  <Grid container spacing={2}>
                    <Grid item>
                      <img height={20} width={20} src={`https://biharb.leadgenadvertisements.com/`} alt='Profile' />
                    </Grid>
                    <Grid item>
                      <Typography variant="body2" color="#2F4CDD">
                        {event.title}
                      </Typography>
                      <Typography variant="body2">{"Name"}</Typography>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell>{event.description}</TableCell>
                <TableCell>{new Date(event.created_at).toLocaleDateString()}</TableCell>
                <TableCell>{"Person Name"}</TableCell>
                <TableCell>{event.status === 0 ? 'Accepted' : 'Rejected'}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5}>No events available</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Box>
  );
}

export default EventDetail;
