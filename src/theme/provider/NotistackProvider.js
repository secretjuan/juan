import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { SnackbarProvider } from 'notistack5';
import infoFill from '@iconify/icons-eva/info-fill';
import alertCircleFill from '@iconify/icons-eva/alert-circle-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import checkmarkCircle2Fill from '@iconify/icons-eva/checkmark-circle-2-fill';
// material
import { makeStyles, createStyles } from '@material-ui/styles';
import { alpha } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles(() => {
  const createStyle = {
    color: `#212B36 !important`,
    backgroundColor: `#fff !important`
  };

  return createStyles({
    containerRoot: {
      pointerEvents: 'unset',
      '& .MuiCollapse-wrapperInner': {
        width: '100%'
      }
    },
    contentRoot: {
      width: '280px',
      padding: '24px',
      margin: '6px 0',
      boxShadow: 'rgba(32,32,32,0.05)',
      borderRadius: '16px',
      color: '#212B36',
      backgroundColor: '#161C24'
    },
    message: {
      padding: 0,
      fontWeight: '400'
    },
    action: {
      marginRight: -4,
      '& svg': {
        width: 20,
        height: 20,
        opacity: 0.48,
        '&:hover': { opacity: 1 }
      }
    },
    info: { ...createStyle },
    success: { ...createStyle },
    warning: { ...createStyle },
    error: { ...createStyle }
  });
});

// ----------------------------------------------------------------------

SnackbarIcon.propTypes = {
  icon: PropTypes.object,
  color: PropTypes.string
};

function SnackbarIcon({ icon, color }) {
  return (
    <Box
      component="span"
      sx={{
        mr: 1.5,
        width: 40,
        height: 40,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        color: `${color}.main`,
        bgcolor: (theme) => alpha(theme.palette[color].main, 0.16)
      }}
    >
      <Icon icon={icon} width={24} height={24} />
    </Box>
  );
}

NotistackProvider.propTypes = {
  children: PropTypes.node
};

export default function NotistackProvider({ children }) {
  const classes = useStyles();

  return (
    <SnackbarProvider
      dense
      maxSnack={5}
      // preventDuplicate
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      iconVariant={{
        success: <SnackbarIcon icon={checkmarkCircle2Fill} color="success" />,
        error: <SnackbarIcon icon={infoFill} color="error" />,
        warning: <SnackbarIcon icon={alertTriangleFill} color="warning" />,
        info: <SnackbarIcon icon={alertCircleFill} color="info" />
      }}
      classes={{
        containerRoot: classes.containerRoot,
        contentRoot: classes.contentRoot,
        message: classes.message,
        action: classes.action,
        variantInfo: classes.info,
        variantSuccess: classes.success,
        variantWarning: classes.warning,
        variantError: classes.error
      }}
    >
      {children}
    </SnackbarProvider>
  );
}
