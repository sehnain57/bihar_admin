import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Drawer } from '@mui/material';

import useResponsive from '../../hooks/useResponsive';
import Logo from '../../assest/logpnav.jpeg';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
import { CountsTotalGet } from '../../Api/counts';
import { GetNavConfig } from './NavConfig'; // Import GetNavConfig

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();
  const [grievanceCount, setGrievanceCount] = useState(0);
  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const result = await CountsTotalGet();
        setGrievanceCount(result.data.grievanceCount);
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, []);

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
  }, [pathname, isOpenSidebar, onCloseSidebar]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
        backgroundColor: 'white'
      }}
    >
      <Box sx={{ px: 2.5, py: 1, display: 'inline-flex' }} />

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "20px" }}>
        <img height={75} width={75} src={Logo} alt='logo' />
        <h1 style={{ color: "#3C4469", lineHeight: 1 }}><strong>Samastipur Loksabha</strong></h1>
      </div>

      <NavSection navConfig={GetNavConfig(grievanceCount)} />
      <Box sx={{ flexGrow: 1 }} />
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
