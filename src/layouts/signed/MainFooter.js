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
          <Grid item xs={12} sx={{ mb: 10, mx: 'auto' }}>
            <ScrollLink to="move_top" spy smooth>
              <Box component="img" src="/favicon/jms2.png" sx={{ width: 250, objectFit: 'contain', mx: 'auto' }} />
            </ScrollLink>
          </Grid>
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
          <Grid item xs={12} md={1}>
            <Stack direction="row" justifyContent={{ xs: 'center', md: 'center' }} sx={{ mt: 1, mb: { xs: 5, md: 0 } }}>
              <Link
                rel="noreferrer"
                target="_blank"
                href="#"
                sx={{
                  color: 'common.grey',
                  mx: 2,
                  transition: 'all 0.4s ease',
                  '&:hover': {
                    color: 'common.blue',
                    transform: 'scale(1.1)',
                    transition: 'all 0.4s ease'
                  }
                }}
              >
                <Icon icon={facebookFill} width={24} height={24} color="blue" />
              </Link>
            </Stack>
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
          © 2022. All rights reserved. Rent A Court.
        </Typography>
      </Container>
    </RootStyle>
  );
}
