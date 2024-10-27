// material
import { styled } from '@material-ui/core/styles';
import { Container, Typography, Grid, Button, Link, Box } from '@material-ui/core';

//
import { motion } from 'framer-motion';
import { varFadeInLeft, varFadeInRight } from '../../animate';

const cover = '/favicon/bg1.png';

const RootStyle = styled('div')(() => ({
  position: 'relative',
  marginBottom: '0px',
  paddingTop: 42,
  paddingBottom: 42,
  height: 600,
  display: 'flex',
  alignItems: 'center',
  color: 'white',
  '@media (max-width:600px)': {
    height: 'auto', // Allow height to adjust for smaller screens
    paddingTop: 24,
    paddingBottom: 24,
  },
  '@media (min-width:601px) and (max-width:900px)': {
    paddingTop: 30,
    paddingBottom: 30,
    height: 'auto', // Adjust height for medium screens
  }
}));

export default function LandingBusiness() {
  return (
    <RootStyle
      sx={{
        backgroundImage: `url(${cover})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#FFFFFF',
        backgroundAttachment: 'fixed'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5} sx={{ width: '100%' }}>
          <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
            <motion.div variants={varFadeInLeft} style={{ marginTop: 0 }}>
              <Box 
                component="img" 
                src="/static/court1.jpg" 
                sx={{ 
                  borderRadius: 4, 
                  overflow: 'hidden',
                  width: '100%',
                  height: 'auto',
                
                }} 
              />
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center',}}>
            <motion.div variants={varFadeInRight} style={{ marginTop: 0, width: '100%' }}>
              <Typography
                variant="h2"
                sx={{
                  margin: 'auto',
                  mt: { xs: 5, sm: 0, md: 0 }
                }}
                component="h2"
              >
                Inventory Management System
              </Typography>
              <Typography variant="h6" sx={{mt: 1, fontWeight: 400 }}>
                TEAMBA, a inventory management system, I developed for my mini-capstone project during my second year in college.
              </Typography>

              <Box mt={5}>
                <Button variant="outlined" color="inherit" sx={{ marginRight: 2 }}>
                  Learn More
                </Button>
                <Button variant="contained" color="secondary">
                  Shop Now
                </Button>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
