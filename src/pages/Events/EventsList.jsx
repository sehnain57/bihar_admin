import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import {
  Box,
  Button,
  CircularProgress, // Import CircularProgress
  Pagination,
  TableSortLabel,
  Tooltip,
  tooltipClasses,
  Typography,
  PaginationItem,
  TableRow,
  TableCell,
  TableHead,
  Table,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { deleteEvent, getAdminEvents} from '../../Api/event';
// import { getUsers } from '../../Api/user'
import EventDetail from '../../components/EventDetail';

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "white",
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: 13,
    minWidth: 110,
  },
}));

function EventList() {
  return (
    <div>
      <Box sx={{ p: 2 }}>
        <Typography sx={{ fontWeight: "bold", fontSize: "20px", textDecoration: "underline" }}>
          Event List
        </Typography>
      </Box>
      <TableCustomized />
    </div>
  );
}

export default EventList;

function IconComponents({ order }) {
  return order === 'desc' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
}

IconComponents.propTypes = {
  order: PropTypes.string.isRequired,
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

function TableCustomized() {
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('epicNo');
  const [rows, setRows] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true); // Add loading state
  // const [users, setUsers] = useState([]); // Add users state
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const getData = async (page = 1) => {
    setLoading(true); // Start loading
    await getAdminEvents(page).then((res) => {
      setTotalItems(res.data.pagination.totalItems);
      setRows(res.data.data);
      setLoading(false); // Stop loading
    });
  };

  // const getUsersData = async () => {
  //   await getUsers().then((res) => {
  //     setUsers(res.data.users); // Set the users data
  //   });
  // };

  useEffect(() => {
    getData();
    // getUsersData(); // Fetch users data when component mounts
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    getData(newPage);
  };

  const removeEvent = async (id) => {
    await deleteEvent(id);
    await getData();
  };

  // const handleKaryakarthaChange = (id, value) => {
  //   setRows(prevRows =>
  //     prevRows.map(row =>
  //       row.id === id ? { ...row, karyakartha: value } : row
  //     )
  //   );
  // };
 // Function to generate a formatted Token ID
 const formatTokenId = (id) => {
  // Convert id to string (in case it's a number) and extract the first 5 digits
  const idStr = id.toString();
  const firstFiveDigits = idStr.substring(0, 5);
  
  // Return formatted Token ID
  return `ID-${firstFiveDigits}`;
};
const handleOpenDetails = (event) => {
  setSelectedEvent(event);
  setOpen(true);
};
const handleCloseDetails = () => {
  setOpen(false);
  setSelectedEvent(null);
};
  return (
    <Box>
      {loading ? ( // Conditionally render loading indicator
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      ) : (
        <Root>
          <Table aria-label="custom pagination table" sx={{backgroundColor:"white"}}>
          <TableHead>
  <TableRow>
    <TableCell>
      <Tooltip title="Sort by EPIC No." arrow>
      <TableSortLabel
                      active={orderBy === 'epicNo'}
                      direction={orderBy === 'epicNo' ? order : 'asc'}
                      onClick={(event) => handleRequestSort(event, 'epicNo')}
                      IconComponent={() => <IconComponents order={orderBy === 'epicNo' ? order : 'asc'} />}
                    >
                      Token ID
                    </TableSortLabel>
      </Tooltip>
    </TableCell>
    <TableCell>
      <Typography variant="h6" component="div">Date</Typography>
    </TableCell>
    <TableCell>
      <Typography variant="h6" component="div">Mobile Number</Typography>
    </TableCell>
    <TableCell>
      <Typography variant="h6" component="div">Constituency</Typography>
    </TableCell>
    <TableCell>
      <Typography variant="h6" component="div">Booth Number</Typography>
    </TableCell>
    {/* <TableCell>
      <Typography variant="h6" component="div">Karyakartha</Typography>
    </TableCell> */}
    <TableCell>
      <Typography variant="h6" component="div">Actions</Typography>
    </TableCell>
  </TableRow>
</TableHead>
            <tbody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                   <TableCell>{formatTokenId(row.id)}</TableCell>
                
                  <TableCell>{`${row.date.slice(0, 10)} ${row.date.slice(11, 16)}`}</TableCell>
                  <TableCell>{row.mobileNumber}</TableCell>
                  <TableCell>{row?.constituency || "constituency not found"}</TableCell>
                  <TableCell>{row.boothNumber}</TableCell>
                  {/* <TableCell>
                    <Select
                      value={row.karyakartha || ''}
                      onChange={(e) => handleKaryakarthaChange(row.id, e.target.value)}
                      displayEmpty
                      fullWidth
                    >
                      <MenuItem value="" disabled>
                        Select Karyakartha
                      </MenuItem>
                      {users.map(user => (
                        <MenuItem key={user.id} value={user.fullName}>
                          {user.fullName}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell> */}
                  <TableCell>
                    <LightTooltip
                      placement='bottom-end'
                      title={
                        <Box>
                          <Box sx={{ padding: "4px 5px", display: "flex", alignItems: "center", cursor: "pointer" }}>
                          <Typography
                              sx={{ padding: "0 5px", fontSize: "15px", cursor: "pointer", color: "#2F4CDD" }}
                              onClick={() => handleOpenDetails(row)}
                            >
                              View Details
                            </Typography>
                          </Box>
                          <Box sx={{ padding: "4px 5px", display: "flex", alignItems: "center", cursor: "pointer" }}>
                            <Typography
                              sx={{ padding: "0 5px", fontSize: "15px", cursor: "pointer", color: "#FF0000" }}
                              onClick={() => removeEvent(row.id)}
                            >
                              Remove
                            </Typography>
                          </Box>
                        </Box>
                      }
                    >
                      <Button
                        sx={{
                          color: "#3E4954",
                          textTransform: "none",
                          borderRadius: "8px",
                          height: "37px",
                          p: 1,
                          "&:hover": {
                            backgroundColor: "rgba(242, 244, 248, 0.25)",
                            borderColor: "#2F4CDD",
                          }
                        }}
                      >
                        <MoreHorizIcon />
                      </Button>
                    </LightTooltip>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
            <tfoot>
              <TableRow>
                <TableCell colSpan={7}>
                  <CustomTablePagination
                    count={Math.ceil(totalItems / rowsPerPage)}
                    page={page}
                    onPageChange={handleChangePage}
                  />
                </TableCell>
              </TableRow>
            </tfoot>
          </Table>
          <Dialog open={open} onClose={handleCloseDetails}>
            <DialogTitle>Event Details</DialogTitle>
            <DialogContent>
              <Typography variant="h6">Event Title: {selectedEvent?.eventTitle}</Typography>
              <Typography>Date: {`${selectedEvent?.date.slice(0, 10)} ${selectedEvent?.date.slice(11, 16)}`}</Typography>
              <Typography>Mobile Number: {selectedEvent?.mobileNumber}</Typography>
              <Typography>Constituency: {selectedEvent?.constituency || "constituency not found"}</Typography>
              <Typography>Booth Number: {selectedEvent?.boothNumber}</Typography>
              <Typography>Created At: {new Date(selectedEvent?.createdAt).toLocaleDateString()} {new Date(selectedEvent?.createdAt).toLocaleTimeString()}</Typography>
              <Typography>Updated At: {new Date(selectedEvent?.updatedAt).toLocaleDateString()} {new Date(selectedEvent?.updatedAt).toLocaleTimeString()}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDetails} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Root>
      )}
      <Box sx={{backgroundColor:"white", marginTop:8}}>
        <EventDetail />
      </Box>
    </Box>
  );
}

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

const Root = styled('div')(({ theme }) => ({
  '& .MuiTableHead-root': {
    backgroundColor: theme.palette.background.default,
  },
  '& .MuiTableCell-root': {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  '& .MuiTableSortLabel-root': {
    color: theme.palette.text.primary,
  },
}));
