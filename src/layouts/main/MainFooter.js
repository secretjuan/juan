import { Icon } from '@iconify/react';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import { Link as ScrollLink } from 'react-scroll';
// material
import { styled } from '@material-ui/core/styles';
import { Grid, Link, Divider, Container, Typography, Stack, Box } from '@material-ui/core';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background.default,
  marginTop: '0px',
  overflow: 'hidden',
}));


// ----------------------------------------------------------------------

export default function MainFooter() {
  return (
    <RootStyle>
      <Divider />
      <Container maxWidth="lg" sx={{ pt: 10 }}>
        <Grid
          container
          justifyContent={{ xs: 'center', md: 'center' }}
          sx={{ textAlign: { xs: 'center', md: 'left' } }}
        >
          <Grid item xs={12} md={5} sx={{ textAlign: 'center' }}>
            <Typography variant="overline" sx={{ pr: { md: 5 } }}>
              Office address
            </Typography>
            <Typography variant="body2" sx={{ pr: { md: 5 }, mb: 3 }}>
              Caloocan City, Philippines
            </Typography>
          </Grid>

          <Grid item xs={12} md={3} sx={{ textAlign: 'center' }}>
            <Typography variant="overline" sx={{ pr: { md: 5 } }}>
              Email address
            </Typography>
            <Typography variant="body2" sx={{ pr: { md: 5 }, mb: 3 }}>
              sanchez.juanmiguel16@gmail.com
            </Typography>
          </Grid>
          <Grid item xs={12} md={3} sx={{ textAlign: 'center' }}>
            <Typography variant="overline" sx={{ pr: { md: 5 } }}>
              Call
            </Typography>
            <Typography variant="body2" sx={{ pr: { md: 5 }, mb: 3 }}>
              (+63) 9123768202
            </Typography>
          </Grid>
        </Grid>
        <Typography
          component="p"
          variant="body2"
          sx={{
            mt: 5,
            pb: 5,
            fontSize: 13,
            color: 'black',
            textAlign: { xs: 'center', md: 'center' },
          }}
        >
          © 2024. All rights reserved. JMS.
        </Typography>
      </Container>
    </RootStyle>
  );
}
