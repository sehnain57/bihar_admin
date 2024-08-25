import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Grid,
  CircularProgress,
  TextField,
  Autocomplete,
  Select,
  MenuItem,
} from '@mui/material';

import { GrievancesGet, assignGrievanceUser, updateStatus } from '../Api/grievance';
import { getUsers } from '../Api/user';

const Grievances = () => {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const grievancesRes = await GrievancesGet();
        setData(grievancesRes.data.data);

        const usersRes = await getUsers();
        setUsers(usersRes.data.users);

        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleKaryakarthaChange = async (id, selectedUser) => {
    if (selectedUser) {
      const { mobileNumber } = selectedUser;

      try {
        await assignGrievanceUser(id, mobileNumber);
        setData(prevData =>
          prevData.map(item =>
            item.id === id ? { ...item, assignedTo: selectedUser.fullName } : item
          )
        );
      } catch (err) {
        console.error('Error assigning grievance:', err);
      }
    }
  };

  const handleStatusChange = async (id, value) => {
    setData(prevData =>
      prevData.map(item =>
        item.id === id ? { ...item, status: value } : item
      )
    );

    try {
      await updateStatus(id, value);
      console.log(`Status for ID ${id} updated to ${value}`);
    } catch (err) {
      console.error('Error updating status:', err);
      // Optionally, you could revert the status change if the API call fails
    }
  };

  return (
    <TableContainer component={Paper}>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Details</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Assigned to</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((v, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Grid container spacing={2}>
                    <Grid item>
                      <img height={20} width={20} src={`https://biharb.leadgenadvertisements.com/${v.attachments[0]}`} alt='Profile' />
                    </Grid>
                    <Grid item>
                      <Typography variant="body2" color="#2F4CDD">
                        {v.fullName} {v.fatherName}, {v.boothNameOrNumber}
                      </Typography>
                      <Typography variant="body2">{v.ticketTitle}</Typography>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2" component="div">
                      {v.description}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{v.category}</Typography>
                  <Typography variant="body2">{v.subCategory}</Typography>
                </TableCell>
                <TableCell>
                  <Autocomplete
                    options={users}
                    getOptionLabel={(option) => option.fullName || ''}
                    value={users.find(user => user.fullName === v.assignedTo) || null}
                    onChange={(event, newValue) => handleKaryakarthaChange(v.id, newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        size="small"
                        placeholder="Search Karyakartha"
                        fullWidth
                      />
                    )}
                  />
                </TableCell>
                <TableCell>
                  <Select
                    value={v.status !== undefined ? v.status : ''}
                    onChange={(e) => handleStatusChange(v.id, e.target.value)}
                    displayEmpty
                    fullWidth
                  >
                    <MenuItem value="" disabled>
                      Select Status
                    </MenuItem>
                    <MenuItem value="0">Accepted</MenuItem>
                    <MenuItem value="1">Pending</MenuItem>
                    <MenuItem value="2">Completed</MenuItem>
                    <MenuItem value="3">Rejected</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default Grievances;
