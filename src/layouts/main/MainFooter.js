import { Icon } from '@iconify/react';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import { Link as ScrollLink } from 'react-scroll';
// material
import { styled } from '@material-ui/core/styles';
import { Grid, Link, Divider, Container, Typography, Stack, Box } from '@material-ui/core';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background.default
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
              Maximina Street, Villa Arca Ave, Project 8, Quezon City
            </Typography>
          </Grid>

          <Grid item xs={12} md={3} sx={{ textAlign: 'center' }}>
            <Typography variant="overline" sx={{ pr: { md: 5 } }}>
              Email address
            </Typography>
            <Typography variant="body2" sx={{ pr: { md: 5 }, mb: 3 }}>
              rentacourt.temporary@gmail.com
            </Typography>
          </Grid>
          <Grid item xs={12} md={3} sx={{ textAlign: 'center' }}>
            <Typography variant="overline" sx={{ pr: { md: 5 } }}>
              Call
            </Typography>
            <Typography variant="body2" sx={{ pr: { md: 5 }, mb: 3 }}>
              (02) 1234 5647
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
            textAlign: { xs: 'center', md: 'center' }
          }}
        >
          © 2024. All rights reserved. Rent A Court.
        </Typography>
      </Container>
    </RootStyle>
  );
}
