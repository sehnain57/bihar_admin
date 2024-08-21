import React, { useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Box, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

function EventDetail({ Id }) { // Assuming Id will be used later
  useEffect(() => {
    // You can use Id here if needed, for example, to fetch event details based on Id
  }, [Id]);

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
          <TableRow>
            <TableCell>
              <Grid container spacing={2}>
                <Grid item>
                  <img height={20} width={20} src={`https://biharb.leadgenadvertisements.com/`} alt='Profile' />
                </Grid>
                <Grid item>
                  <Typography variant="body2" color="#2F4CDD">
                    {/* {v.fullName} {v.fatherName}, {v.boothNameOrNumber} */}fdss
                  </Typography>
                  <Typography variant="body2">{"Name"}</Typography>
                </Grid>
              </Grid>
            </TableCell>
            <TableCell>This is my description</TableCell>
            <TableCell>DD-MM-YYYY</TableCell>
            <TableCell>Person Name</TableCell>
            <TableCell>Accepted</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
}

// Add PropTypes validation
EventDetail.propTypes = {
  Id: PropTypes.string.isRequired, // or PropTypes.number, depending on your use case
};

export default EventDetail;
