// material
import { styled } from '@material-ui/core/styles';
import { Container, Typography, Grid, Link, Button } from '@material-ui/core';

//
import { motion } from 'framer-motion';
import { varFadeInUp } from '../../animate';

const RootStyle = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.blue.main,
  overflow: 'hidden',
  position: 'relative',
  height: 300,
  paddingTop: 42,
  paddingBottom: 42,
  display: 'flex',
  alignItems: 'center'
}));

export default function LandingTeam() {
  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Grid container spacing={5} sx={{ width: '100%' }}>
          <Grid item xs={12} md={9} sx={{ display: 'flex', alignItems: 'center' }}>
            <motion.div variants={varFadeInUp} style={{ marginTop: 0 }}>
              <Typography
                variant="h2"
                sx={{
                  color: 'common.white',
                  margin: 'auto',
                  mt: { xs: 5, sm: 0, md: 0 }
                }}
                component="h2"
              >
                Be Part Of Our Growing Team!
              </Typography>
              <Typography variant="h6" sx={{ color: 'common.white', mt: 1, fontWeight: 400 }} component="p">
                Apply in a few steps to get matched with our featured jobs.
              </Typography>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={3} sx={{ display: 'flex', alignItems: 'center' }}>
            <motion.div variants={varFadeInUp} style={{ marginTop: 0, width: '100%' }}>
              <Link
                color="common.white"
                href="/apply"
                rel="noreferrer"
                sx={{
                  display: 'block',
                  width: '100%',
                  '&:hover': {
                    textDecoration: 'none'
                  }
                }}
              >
                <Button
                  component="p"
                  variant="contained"
                  size="large"
                  sx={{
                    width: '100%',
                    fontSize: 18,
                    transition: 'all 0.4s ease',
                    backgroundColor: 'blue.light',
                    boxShadow: '1px solid #000',
                    '&:hover': {
                      transition: 'all 0.4s ease',
                      tranasform: 'scale(1,1)',
                      backgroundColor: 'common.white',
                      color: 'blue.main'
                    }
                  }}
                >
                  Apply Now
                </Button>
              </Link>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
