import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import PropTypes from 'prop-types'; // Add PropTypes import
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  CircularProgress,
  TextField,
  Autocomplete,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Pagination,
  Typography,
  PaginationItem,
 
 
} from '@mui/material';

import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { GrievancesGet, assignGrievanceUser, updateStatus } from '../Api/grievance';
import { getUsers } from '../Api/user';

function CustomTablePagination({ count, page, onPageChange }) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" m={2}>
      <TablePaginationAction
        count={count}
        page={page}
        onPageChange={onPageChange}
      />
    </Box>
  );
}

CustomTablePagination.propTypes = {
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};


function TablePaginationAction({ count, page, onPageChange }) {
  return (
    <CustomPagination count={count} page={page} onPageChange={onPageChange} />
  );
}

TablePaginationAction.propTypes = {
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export const CustomPagination = ({ count, page = 1, onPageChange }) => {

  const renderItem = (item) => (
    <PaginationItem {...item} sx={{
      backgroundColor: item.page === page ? "white !important" : "transparent",
      borderColor: item.page === page ? "white" : "#E3E4EB",
      color: item.page === page ? "black" : "blue",
      borderRadius: "5px",
      padding: "10px",
      m: 0.5,
    }} />
  );

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'right', width: "100%" }}>
      <CustomButton
        disabled={page === 1}
        onClick={() => onPageChange(null, page - 1)}
      >
        <KeyboardDoubleArrowLeftIcon />Previous
      </CustomButton>
      <Pagination
        count={count}
        page={page}
        renderItem={renderItem}
        variant='outlined'
        shape="rounded"
        onChange={onPageChange}
        hidePrevButton
        hideNextButton
        sx={{ mx: 2, backgroundColor: "#E3E4EB" }}
      />
      <CustomButton
        disabled={page === count}
        onClick={() => onPageChange(null, page + 1)}
      >
        Next<KeyboardDoubleArrowRightIcon />
      </CustomButton>
    </div>
  );
};

CustomPagination.propTypes = {
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
const Grievances = () => {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const grievancesRes = await GrievancesGet(page);
        setData(grievancesRes.data.data);
        setTotalPages(grievancesRes.data.pagination.totalPages);

        const usersRes = await getUsers();
        setUsers(usersRes.data.users);

        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);
  const handleViewDetails = (user) => {
    // console.log("user------->",user)
    setSelectedUser(user);
    setOpenDialog(true);
  };
  const handleChangePage = (event, newPage) => {
    console.log("handle page", newPage);
    setPage(newPage);
  };
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
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };
  return (
    <>
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
              <TableCell>Action</TableCell>
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
                        style={{ width: '300px' }}
                      />
                    )}
                  />
                </TableCell>
                <TableCell> <Box sx={{ padding: "4px 5px", display: "flex", alignItems: "center", cursor: "pointer" }}    onClick={() => handleViewDetails(v)}>
                            <Typography sx={{ padding: "0 5px", fontSize: "16px", cursor: "pointer", color: "#2F4CDD" }}>
                              View
                            </Typography>
                          </Box></TableCell>
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
          <tfoot>
              <TableRow>
                <TableCell colSpan={6}>
                  <CustomTablePagination
                    count={totalPages}
                    page={page}
                    onPageChange={handleChangePage}
                  />
                </TableCell>
              </TableRow>
            </tfoot>
        </Table>
      )}
    </TableContainer>
    <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
    <DialogTitle>User Details</DialogTitle>
    <DialogContent>
      {selectedUser && (
        <Box>
          <Typography variant="h6">Full Name: {selectedUser.fullName}</Typography>
          <Typography variant="body1"><span style={{fontWeight:"bold"}}>Father's Name: </span>{selectedUser.fatherName}</Typography>
          <Typography variant="body1"><span style={{fontWeight:"bold"}}>Category:</span> {selectedUser.category}</Typography>
          <Typography variant="body1"> <span style={{fontWeight:"bold"}}>Sub-Category:</span> {selectedUser.subCategory}</Typography>
          <Typography variant="body1"> <span style={{fontWeight:"bold"}}>Legislative Constituency:</span>{selectedUser.legislativeConstituency}</Typography>
          <Typography variant="body1"><span style={{fontWeight:"bold"}}>Booth Name/Number:</span> {selectedUser.boothNameOrNumber}</Typography>
          <Typography variant="body1"><span style={{fontWeight:"bold"}}>Contact Number:</span> {selectedUser.contactNumber}</Typography>
          <Typography variant="body1"><span style={{fontWeight:"bold"}}>Gender:</span>{selectedUser.gender}</Typography>
          <Typography variant="body1"><span style={{fontWeight:"bold"}}>Age:</span> {selectedUser.age}</Typography>
          {/* Add more fields if needed */}
        </Box>
      )}
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCloseDialog} color="primary">
        Close
      </Button>
    </DialogActions>
  </Dialog>
  </>
  );
};

export default Grievances;
const CustomButton = styled(Button)({
  backgroundColor: "#2F4CDD",
  color: "white",
  width: '120px',
  margin: '0 4px',
  textAlign: 'center',
  borderRadius: "4px",
  "&:hover": {
    backgroundColor: "#2F4CDD",
  },
});