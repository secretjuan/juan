// material
import { styled } from '@material-ui/core/styles';
import { Container, Typography, Grid, Link, Button } from '@material-ui/core';

//
import { motion } from 'framer-motion';
import { varFadeInUp } from '../../animate';

const RootStyle = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  overflow: 'hidden',
  position: 'relative',
  height: 300,
  paddingTop: 42,
  paddingBottom: 42,
  display: 'flex',
  alignItems: 'center'
}));

export default function ServicesQuestion() {
  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Grid container spacing={5} sx={{ width: '100%', margin: { xs: 0 } }}>
          <Grid item xs={12} md={9} sx={{ display: 'flex', alignItems: 'center', p: { xs: '0 !important' } }}>
            <motion.div variants={varFadeInUp} style={{ marginTop: 0 }}>
              <Typography
                variant="h2"
                sx={{
                  color: 'common.black',
                  margin: 'auto',
                  mt: { xs: 5, sm: 0, md: 0 }
                }}
                component="h2"
              >
                Got Some Questions?
              </Typography>
              <Typography variant="h6" sx={{ color: 'common.black', mt: 1, fontWeight: 400 }} component="p">
                Send us your question thru our inquiry form
              </Typography>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={3} sx={{ display: 'flex', alignItems: 'center', px: { xs: '0 !important' } }}>
            <motion.div variants={varFadeInUp} style={{ marginTop: 0, width: '100%' }}>
              <Link
                color="common.black"
                href="/inquiry"
                rel="noreferrer"
                target="_blank"
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
                  style={{ backgroundColor: "#ff9800", color: '#fff' }}
                  sx={{
                    width: '100%',
                    fontSize: 18,
                    transition: 'all 0.4s ease',
                    backgroundColor: 'blue.main',
                    boxShadow: '1px solid #000',
                    '&:hover': {
                      transition: 'all 0.4s ease',
                      tranasform: 'scale(1,1)',
                      backgroundColor: 'blue.light',
                      color: 'common.white'
                    }
                  }}
                >
                  Send Inquiry
                </Button>
              </Link>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
