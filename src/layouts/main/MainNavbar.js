import { NavLink as RouterLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

// material
import { styled } from '@material-ui/core/styles';
import { Box, Link, AppBar, Toolbar, Container } from '@material-ui/core';
// hooks
import useOffSetTop from '../../hooks/useOffSetTop';
import { MHidden } from '../../components/@material-extend';
//
import MenuDesktop from './MenuDesktop';
import MenuMobile from './MenuMobile';
import navConfig from './MenuConfig';
import { varBounceInDown } from '../../components/animate';
// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 88;

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: APP_BAR_MOBILE,
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  [theme.breakpoints.up('md')]: {
    height: APP_BAR_DESKTOP
  }
}));

const ToolbarShadowStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: 'auto',
  borderRadius: '50%',
  position: 'absolute',
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8
}));

// ----------------------------------------------------------------------

export default function MainNavbar() {
  const isOffset = useOffSetTop(570);
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <AppBar sx={{ boxShadow: isOffset ? 3 : 0, bgcolor: isOffset ? 'background.neutral' : 'transparent' }}>
      <ToolbarStyle
        disableGutters
        sx={{
          bgcolor: isOffset ? 'background.neutral' : 'transparent',
          ...(isOffset && {
            height: { md: APP_BAR_DESKTOP - 12 },
            transition: 'background-color 0.3s ease, height 0.3s ease' // Ensuring smooth transitions
          })
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            overflow: 'hidden',
          }}
        >
          <Link component={RouterLink} to="/" underline="none">
            <Box sx={{ width: '250px', height: '50px', mx: 'auto', my: 1, display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: 200, pr: { xs: 10, sm: 5, md: 5 }, pl: 0, py: 5 }}>
                <motion.img variants={varBounceInDown} src="/favicon/jms2.png" style={{ objectFit: 'contain' }} />
              </Box>
            </Box>
          </Link>

          <Box sx={{ flexGrow: 1 }} />

          <MHidden width="mdDown">
            <MenuDesktop isOffset={isOffset} isHome={isHome} navConfig={navConfig} />
          </MHidden>

          <MHidden width="mdUp">
            <MenuMobile isOffset={isOffset} isHome={isHome} navConfig={navConfig} />
          </MHidden>
        </Container>
      </ToolbarStyle>

      {isOffset && <ToolbarShadowStyle />}
    </AppBar>
  );
}
