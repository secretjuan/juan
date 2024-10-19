import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
import { NavLink as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
// material
import { alpha, styled } from '@material-ui/core/styles';
import {
  Box,
  List,
  Drawer,
  Link,
  Collapse,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Button
} from '@material-ui/core';
// components
import NavSection from '../../components/NavSection';
import Scrollbar from '../../components/Scrollbar';
import { MIconButton } from '../../components/@material-extend';
//
import menuConfig from './MenuConfig';
import { varBounceInDown } from '../../components/animate';

import storage from '../../api/base/storage';

// ----------------------------------------------------------------------

const ICON_SIZE = 22;
const ITEM_SIZE = 48;
const PADDING = 2.5;

const ListItemStyle = styled(ListItemButton)(({ theme }) => ({
  ...theme.typography.body2,
  height: ITEM_SIZE,
  textTransform: 'capitalize',
  paddingLeft: theme.spacing(PADDING),
  paddingRight: theme.spacing(2.5),
  color: theme.palette.text.secondary
}));

// ----------------------------------------------------------------------

MenuMobileItem.propTypes = {
  item: PropTypes.object,
  isOpen: PropTypes.bool,
  isActive: PropTypes.bool,
  onOpen: PropTypes.func
};

function MenuMobileItem({ item, isOpen, isActive, onOpen }) {
  const { title, path, icon, children } = item;

  if (children) {
    return (
      <div key={title}>
        <ListItemStyle onClick={onOpen}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText disableTypography primary={title} />
          <Box
            component={Icon}
            icon={isOpen ? arrowIosDownwardFill : arrowIosForwardFill}
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </ListItemStyle>

        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <Box sx={{ display: 'flex', flexDirection: 'column-reverse' }}>
            <NavSection
              navConfig={menuConfig[2].children}
              sx={{
                '&.MuiList-root:last-child .MuiListItem-root': {
                  height: 200,
                  backgroundSize: '92%',
                  backgroundPosition: 'center',
                  bgcolor: 'background.neutral',
                  backgroundRepeat: 'no-repeat',
                  backgroundImage: 'url(/static/illustrations/illustration_dashboard.png)',
                  '& > *:not(.MuiTouchRipple-root)': { display: 'none' }
                },
                '& .MuiListSubheader-root': {
                  pl: PADDING,
                  display: 'flex',
                  alignItems: 'center',
                  '&:before': {
                    ml: '6px',
                    mr: '22px',
                    width: 8,
                    height: 2,
                    content: "''",
                    borderRadius: 2,
                    bgcolor: 'currentColor'
                  }
                },
                '& .MuiListItem-root': {
                  pl: PADDING,
                  '&:before': { display: 'none' },
                  '&.active': { color: 'blue.main', bgcolor: 'transparent' }
                },
                '& .MuiListItemIcon-root': {
                  width: ICON_SIZE,
                  height: ICON_SIZE,
                  '&:before': {
                    width: 4,
                    height: 4,
                    content: "''",
                    borderRadius: '50%',
                    bgcolor: 'currentColor'
                  }
                }
              }}
            />
          </Box>
        </Collapse>
      </div>
    );
  }

  return (
    <>
      <ListItemStyle
        key={title}
        to={path}
        component={RouterLink}
        sx={{
          ...(isActive && {
            color: 'blue.main',
            fontWeight: 'fontWeightMedium',
            bgcolor: (theme) => alpha(theme.palette.blue.main, theme.palette.action.selectedOpacity)
          })
        }}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText disableTypography primary={title} />
      </ListItemStyle>
    </>
  );
}

MenuMobile.propTypes = {
  isOffset: PropTypes.bool,
  isHome: PropTypes.bool
};

export default function MenuMobile({ isOffset, isHome }) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (mobileOpen) {
      handleDrawerClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleDrawerOpen = () => {
    setMobileOpen(true);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleSignout = async () => {
    await storage.remove();
    navigate('/login', { replace: true });
  };

  return (
    <>
      <MIconButton
        onClick={handleDrawerOpen}
        sx={{
          ml: 1,
          ...(isHome && { color: 'blue.main' }),
          ...(isOffset && { color: 'text.primary' })
        }}
      >
        <Icon icon={menu2Fill} />
      </MIconButton>

      <Drawer
        open={mobileOpen}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }}
        PaperProps={{ sx: { pb: 5, width: 260 } }}
      >
        <Scrollbar>
          <Link component={RouterLink} to="/" sx={{ display: 'inline-flex' }}>
            <Box
              sx={{
                width: '250px',
                height: '50px',
                mx: 'auto',
                my: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Box sx={{ width: 200, py: 5, px: 3 }}>
                <motion.img variants={varBounceInDown} src="/static/logo.png" style={{ objectFit: 'contain' }} />
              </Box>
            </Box>
          </Link>

          <List disablePadding>
            {menuConfig.map((link) => (
              <MenuMobileItem
                key={link.title}
                item={link}
                isOpen={open}
                onOpen={handleOpen}
                isActive={pathname === link.path}
              />
            ))}
            <Box
              color="common.white"
              sx={{
                display: 'block',
                textAlign: 'center',
                my: 2,
                '&:hover': {
                  textDecoration: 'none'
                }
              }}
            >
              <Button
                component="p"
                variant="contained"
                size="large"
                color="blue"
                sx={{ width: '80%', mx: 'auto' }}
                onClick={() => handleSignout()}
              >
                Sign out
              </Button>
            </Box>
          </List>
        </Scrollbar>
      </Drawer>
    </>
  );
}
