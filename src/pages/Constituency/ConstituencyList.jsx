import React, { useEffect, useState } from 'react';
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
  TableBody,
  TableFooter,
  Table,
  CircularProgress
} from '@mui/material';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { getConstituencies, deleteConstituency } from '../../Api/constituencies'; // Adjust the import path according to your project structure

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#ffffff", // White background for tooltip
    color: "#000000", // Black text for tooltip
    fontSize: 11,
    minWidth: 110,
  },
}));

function ConstituencyList() {
  return (
    <div>
      <Box sx={{ p: 2 }}>
        <Typography sx={{ fontWeight: "bold", fontSize: "20px", textDecoration: "underline", color: "#00000" }}>
          Constituency List
        </Typography>
      </Box>
      <TableCustomized />
    </div>
  );
}

export default ConstituencyList;

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
      backgroundColor: item.page === page ? "#ffffff !important" : "transparent",
      borderColor: item.page === page ? "#ffffff" : "#E3E4EB",
      color: item.page === page ? "#000000" : "#2F4CDD",
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
  const [orderBy, setOrderBy] = useState('name');
  const [rows, setRows] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);

  const getData = async (page = 1) => {
    setLoading(true);
    try {
      const res = await getConstituencies(page);
      setTotalItems(res.data.pagination.totalItems);
      setRows(res.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
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

  const removeConstituency = async (id) => {
    await deleteConstituency(id);
    await getData();
  };

  return (
    <Box>
      <Root>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
          </Box>
        ) : (
          <Table aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: 'white' }}>
                  <Tooltip title="Sort by Name" arrow>
                    <TableSortLabel
                      active={orderBy === 'name'}
                      direction={orderBy === 'name' ? order : 'asc'}
                      onClick={(event) => handleRequestSort(event, 'name')}
                      IconComponent={() => <IconComponents order={orderBy === 'name' ? order : 'asc'} />}
                      sx={{ color: 'white' }}
                    >
                      Name
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell sx={{ color: 'white' }}>
                  <Typography variant="h6">Action</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell sx={{ color: 'white' }}>{row.name}</TableCell>
                  <TableCell>
                    <LightTooltip
                      placement='bottom-end'
                      title={
                        <Box>
                          <Box sx={{ padding: "4px 5px", display: "flex", alignItems: "center", cursor: "pointer" }}>
                            <Typography sx={{ padding: "0 5px", fontSize: "15px", cursor: "pointer", color: "#2F4CDD" }}>
                              View Details
                            </Typography>
                          </Box>
                          <Box sx={{ padding: "4px 5px", display: "flex", alignItems: "center", cursor: "pointer" }}>
                            <Typography
                              sx={{ padding: "0 5px", fontSize: "15px", cursor: "pointer", color: "#FF0000" }}
                              onClick={() => removeConstituency(row.id)}
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
                          backgroundColor: "white", // Ensure button background is white
                          "&:hover": {
                            backgroundColor: "#f2f4f8",
                          }
                        }}
                      >
                        <MoreHorizIcon />
                      </Button>
                    </LightTooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={2}>
                  <CustomTablePagination
                    count={Math.ceil(totalItems / rowsPerPage)}
                    page={page}
                    onPageChange={handleChangePage}
                  />
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        )}
      </Root>
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
  backgroundColor: '#ffffff', // White background for the root component
  color: '#000000', // Black text color
  '& .MuiTableHead-root': {
    backgroundColor: '#ffffff', // White background for table header
  },
  '& .MuiTableBody-root': {
    backgroundColor: '#ffffff', // White background for table body
  },
  '& .MuiTableCell-root': {
    borderBottom: `1px solid ${theme.palette.divider}`,
    color: '#000000', // Black text color for table cells
  },
  '& .MuiTableSortLabel-root': {
    color: '#000000', // Black color for sort labels
  },
}));
