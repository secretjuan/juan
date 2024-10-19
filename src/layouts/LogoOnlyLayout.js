import { Link, Box } from '@material-ui/core';
import { motion } from 'framer-motion';

import { Link as RouterLink, Outlet } from 'react-router-dom';
// material
import { styled } from '@material-ui/core/styles';

import { varBounceInDown } from '../components/animate';

// ----------------------------------------------------------------------

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5, 5, 0)
  }
}));

// ----------------------------------------------------------------------

export default function LogoOnlyLayout() {
  return (
    <>
      <HeaderStyle>
        <Link component={RouterLink} to="/" underline="none">
          <Box sx={{ width: '50px', height: '50px', mx: 'auto', my: 1 }}>
            <motion.img variants={varBounceInDown} src="/static/logo.png" />
          </Box>
        </Link>
      </HeaderStyle>
      <Outlet />
    </>
  );
}
