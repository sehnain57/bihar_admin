import { useState } from 'react';
// material
import { styled, alpha } from '@mui/material/styles';
import { Input, InputAdornment } from '@mui/material';
// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const SearchbarStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: 500,   // Set width to 120px
  height: 50,   // Set height to 60px
  padding: theme.spacing(0, 1.5),  // Adjusted padding for smaller size
  backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${alpha(theme.palette.grey[500], 0.32)}`,
}));

// ----------------------------------------------------------------------

export default function Searchbar() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <SearchbarStyle>
      <Input
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        disableUnderline
        placeholder="Search…"
        endAdornment={
          <InputAdornment position="end">
            <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
          </InputAdornment>
        }
        sx={{ fontWeight: 'fontWeightBold' }}
      />
    </SearchbarStyle>
  );
}
