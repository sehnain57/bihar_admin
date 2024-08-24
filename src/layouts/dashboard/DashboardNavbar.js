import React, { useState } from 'react';

import PropTypes from 'prop-types';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, AppBar, Toolbar, IconButton, Link,Typography,Badge, Avatar, Button} from '@mui/material';
 
// components
import Iconify from '../../components/Iconify';

//
import Searchbar from './Searchbar';
 
// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};




export default function DashboardNavbar({ onOpenSidebar }) {

  const [activeLink, setActiveLink] = useState(null);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };


  return (
    <RootStyle>
  <ToolbarStyle>
    <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary', display: { lg: 'none' } }}>
      <Iconify icon="eva:menu-2-fill" />
    </IconButton>

    <Searchbar />
    <Box sx={{ flexGrow: 1 }} />

    {/* Navigation links container with space between elements */}
    <Box sx={{ display: 'flex', justifyContent: 'space-start',gap:2, alignItems: 'center', width: '20%' }}>
      {['About', 'Tools', 'Help'].map((item) => (
        <Box key={item} sx={{ position: 'relative' }}>
          <Link
            href="#"
            underline="none"
            color="inherit"
            sx={{
              fontSize: '14px',
              fontWeight: 'bold',
              color: 'black',
              paddingBottom: '5px',
              borderBottom: activeLink === item ? '2px solid blue' : 'none',
            }}
            onFocus={() => handleLinkClick(item)}
          >
            <Typography variant="subtitle1">{item}</Typography>
          </Link>
        </Box>
      ))}
    </Box>

    <Box display="flex" alignItems="center" >
      {/* Notification Icons with Badge */}
      <Box display="flex" alignItems="center" sx={{ gap: 2, mr: 4 }}>

      <Box position="relative">
  <Badge
    badgeContent={12} // Set the badge content
    color="secondary" // Badge color
    style={{ 
      position: 'absolute', 
      top: 0, 
      right: 0, 
      transform: 'translate(50%, -50%)' 
    }}
  >
    <Box 
      bgcolor={"#E9ECFF"} 
      height={45} 
      width={45} 
      style={{ 
        borderRadius: 4, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}
    >
      <Iconify 
        icon="typcn:bell" 
        style={{ fontSize: 30, color: '#2F4CDD' }} 
      />
    </Box>
  </Badge>
</Box>





      {/* <IconButton>
          <Badge badgeContent={12} color="primary">
            <Iconify icon="iconify-icons/eva/bell-fill" style={{ fontSize: 30, color: '#3C4469' }} />
          </Badge>
        </IconButton>
        <IconButton>
          <Badge badgeContent={5} color="primary">
            <Iconify icon="iconify-icons/eva/message-circle-fill" style={{ fontSize: 30, color: '#3C4469' }} />
          </Badge>
        </IconButton>
        <IconButton>
          <Badge badgeContent={1} color="error">
            <Iconify icon="iconify-icons/eva/settings-2-fill" style={{ fontSize: 30, color: '#FF6B6B' }} />
          </Badge>
        </IconButton> */}
      </Box>


      <Box display="flex" alignItems="center" sx={{ gap: 4, mr: 4 ,ml:3}}>

<Box position="relative">
<Badge
badgeContent={5} // Set the badge content
color="secondary" // Badge color
style={{ 
position: 'absolute', 
top: 0, 
right: 0, 
transform: 'translate(50%, -50%)' 
}}
>
<Box 
bgcolor={"#E9ECFF"} 
height={45} 
width={45} 
style={{ 
  borderRadius: 4, 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center' 
}}
>
<Iconify 
  icon="mdi-light:message-text" 
  style={{ fontSize: 30, color: '#2F4CDD' }} 
/>
</Box>
</Badge>
</Box>





{/* <IconButton>
    <Badge badgeContent={12} color="primary">
      <Iconify icon="iconify-icons/eva/bell-fill" style={{ fontSize: 30, color: '#3C4469' }} />
    </Badge>
  </IconButton>
  <IconButton>
    <Badge badgeContent={5} color="primary">
      <Iconify icon="iconify-icons/eva/message-circle-fill" style={{ fontSize: 30, color: '#3C4469' }} />
    </Badge>
  </IconButton>
  <IconButton>
    <Badge badgeContent={1} color="error">
      <Iconify icon="iconify-icons/eva/settings-2-fill" style={{ fontSize: 30, color: '#FF6B6B' }} />
    </Badge>
  </IconButton> */}
</Box>

<Box display="flex" alignItems="center" sx={{ gap: 4, mr: 4 ,ml:3}}>

<Box position="relative">
<Badge
badgeContent={5} // Set the badge  content
color="secondary" // Badge color
style={{ 
position: 'absolute', 
top: 0, 
right: 0, 
transform: 'translate(50%, -50%)' 
}}
>
<Box 
bgcolor={"#FFEBE7"} 
height={45} 
width={45} 
style={{ 
  borderRadius: 4, 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center' 
}}
>
<Iconify 
  icon="iconamoon:settings-thin" 
  style={{ fontSize: 30, color: '#FF6D4D' }} 
/>
</Box>
</Badge>
</Box>





{/* <IconButton>
    <Badge badgeContent={12} color="primary">
      <Iconify icon="iconify-icons/eva/bell-fill" style={{ fontSize: 30, color: '#3C4469' }} />
    </Badge>
  </IconButton>
  <IconButton>
    <Badge badgeContent={5} color="primary">
      <Iconify icon="iconify-icons/eva/message-circle-fill" style={{ fontSize: 30, color: '#3C4469' }} />
    </Badge>
  </IconButton>
  <IconButton>
    <Badge badgeContent={1} color="error">
      <Iconify icon="iconify-icons/eva/settings-2-fill" style={{ fontSize: 30, color: '#FF6B6B' }} />
    </Badge>
  </IconButton> */}
</Box>
      {/* User Greeting and Avatar */}
      <Button
  variant="contained"
  sx={{
    backgroundColor: '#2F4CDD',
    color: 'white',
    borderRadius: '12px 32px 32px 12px', // Keep the initial curve
    paddingRight: '50px', // Adjust to ensure space for both text and avatar
    paddingLeft: 2,
    textTransform: 'none',
    fontWeight: 'bold',
    whiteSpace: 'nowrap', // Prevents text from wrapping
    position: 'relative', // Positioning the avatar relative to the button
    overflow: 'hidden', // Ensures the button retains its shape
    '&:hover': {
      backgroundColor: '#3C4469',
    },
  }}
  endIcon={
    <Avatar
      sx={{
        width: 36, // Adjusted size to fit well within the button
        height: 36,
        position: 'absolute', // Absolute positioning to place it in the curve
        right: -2, // Adjusted to center the avatar in the curve
        top: '50%',
        transform: 'translateY(-50%)', // Centering the avatar vertically
        borderRadius: '50%',
        backgroundColor: 'white', // White background for the avatar
        boxShadow: '0 0 0 2px #2F4CDD', // Optional: adds a border around the avatar to match the button color
      }}
    />
  }
>
  Hello, Sairam
</Button>


    </Box>
    

    {/* <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
      <LanguagePopover />
      <NotificationsPopover />
      <AccountPopover />
    </Stack> */}
  </ToolbarStyle>
</RootStyle>
  );
}
