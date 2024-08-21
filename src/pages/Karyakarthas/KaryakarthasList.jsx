import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import {
  Box,
  Button,
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
} from '@mui/material';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { getUsers, removeUser } from '../../Api/user'; // Assuming you have the API functions in a file named api.js

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "white",
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: 11,
    minWidth: 110,
  },
}));

function KaryakarthasList() {
  const [users, setUsers] = useState([]); // Initialize as an empty array
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers('', page, rowsPerPage);
        console.log('API response:', response);
        
        if (response.data && Array.isArray(response.data.users)) {
          setUsers(response.data.users); // Extract the users array
        } else {
          console.error('Expected an array but got:', response.data);
          setUsers([]);
        }
      } catch (err) {
        console.error('Failed to fetch users:', err);
        setUsers([]);
      }
    };

    fetchUsers();
  }, [page]);

  const handleRemoveUser = async (userId) => {
    try {
      await removeUser(userId);
      setUsers(users.filter(user => user.id !== userId));
    } catch (err) {
      console.error('Failed to remove user:', err);
    }
  };

  if (!Array.isArray(users)) {
    console.error('users is not an array:', users);
    return <div>Error: User data is not in the expected format.</div>;
  }

  return (
    <div>
      <Box sx={{ p: 2 }}>
        <Typography sx={{ fontWeight: "bold", fontSize: "20px", textDecoration: "underline" }}>
          Karyakarthas List
        </Typography>
      </Box>
      <TableCustomized users={users} onRemoveUser={handleRemoveUser} />
    </div>
  );
}

export default KaryakarthasList;

function IconComponents({ order }) {
  return order === 'desc' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
}

IconComponents.propTypes = {
  order: PropTypes.string.isRequired,
};

function TableCustomized({ users, onRemoveUser }) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('epicNo');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (order === 'asc') {
      return a[orderBy] < b[orderBy] ? -1 : 1;
    }
    return a[orderBy] > b[orderBy] ? -1 : 1;
  });

  return (
    <Box>
      <Root>
        <Table aria-label="custom pagination table">
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
                    EPIC NO
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              {/* More TableCells... */}
            </TableRow>
          </TableHead>
          <tbody>
            {sortedUsers.map((user) => (
              <TableRow key={user.epicNo}>
                <TableCell>{user.epicNo}</TableCell>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>{user.constituency}</TableCell>
                <TableCell>{user.boothNo}</TableCell>
                <TableCell>
                  <LightTooltip
                    placement='bottom-end'
                    title={
                      <Box>
                        <Box sx={{
                          padding: "4px 5px",
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                        >
                          <Typography
                            sx={{
                              padding: "0 5px",
                              fontSize: "12px",
                              cursor: "pointer",
                              color: "#2F4CDD",
                            }}
                          >
                            View Details
                          </Typography>
                        </Box>
                        <Box sx={{
                          padding: "4px 5px",
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                        >
                          <Typography
                            sx={{
                              padding: "0 5px",
                              fontSize: "12px",
                              cursor: "pointer",
                              color: "#FF0000",
                            }}
                            onClick={() => onRemoveUser(user.id)} // Adjust according to your API response structure
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
        </Table>
      </Root>
    </Box>
  );
}

TableCustomized.propTypes = {
  users: PropTypes.array.isRequired,
  onRemoveUser: PropTypes.func.isRequired,
};

function CustomButton({ children, onClick, disabled }) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      sx={{
        backgroundColor: "#2F4CDD",
        color: "white",
        width: '120px', // Set width of pagination buttons
        margin: '0 4px',
        textAlign: 'center',
        borderRadius: "4px",
        "&:hover": {
          backgroundColor: "#2F4CDD"
        }
      }}
    >
      {children}
    </Button>
  );
}

CustomButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

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
