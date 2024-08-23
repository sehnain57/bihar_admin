import PropTypes from 'prop-types';
import { useEffect } from 'react';
import {  useLocation } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Drawer } from '@mui/material';

import useResponsive from '../../hooks/useResponsive';
// components
import Logo from '../../assest/logo.png';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
//
import navConfig from './NavConfig';
// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

// const AccountStyle = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//    padding: theme.spacing(2, 2.5),
//   borderRadius: Number(theme.shape.borderRadius) * 1.5,
//   backgroundColor: theme.palette.blue[500_12],
// }));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
        backgroundColor:'white'
      }}
    >
      <Box sx={{ px: 2.5, py: 1, display: 'inline-flex' }} />

      {/* <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
            <Avatar src={account.photoURL} alt="photoURL" />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {account.displayName}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {account.role}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box> */}

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "20px" }}>
        <img height={75} width={75} src={Logo} alt='logo' />
        <h1 style={{ color: "#3C4469", lineHeight: 1 }}><strong>Samastipur Loksabha</strong></h1>
      </div>

      <NavSection navConfig={navConfig} />

      <Box sx={{ flexGrow: 1 }} />

      <br />
      <br />
      <br />
      <br />
      <br />
    </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
