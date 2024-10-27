import React from 'react';
import { Container, Grid, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import { varFadeInLeft, varFadeInRight } from '../../animate';

const cover = '/favicon/bg.avif';

const RootStyle = styled('div')({
  position: 'relative',
  marginBottom: '0px',
  paddingTop: 42,
  paddingBottom: 42,
  height: 600,
  display: 'flex',
  alignItems: 'center',
  color: 'black',
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
});

export default function ProductShowcase() {
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
        <Grid container spacing={4} alignItems="center">
          {/* Left Side - Text Content */}
          <Grid item xs={12} md={6}>
            <Typography variant="h2" component="h2" gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2.5rem' } }}>
              Court Rental Management System
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 400, width: '90%', fontSize: { xs: '0.9rem', md: '1rem' } }}>
              Rent-a-Court is a court rental management system designed to simplify the process for players who want exclusive access to sports courts without the hassle of traditional rental procedures.
              The platform allows court owners, including public barangay courts, to list their facilities for rent. While it accommodates various types of courts, such as badminton and volleyball, it primarily focuses on basketball courts.
            </Typography>
            <Box mt={5}>
              <Button variant="outlined" color="inherit" sx={{ marginRight: 2 }}>
                Learn More
              </Button>
              <Button variant="contained" color="secondary">
                Shop Now
              </Button>
            </Box>
          </Grid>

          {/* Right Side - Product Image */}
          <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
            <motion.div variants={varFadeInLeft} style={{ marginTop: 0 }}>
              <Box
                component="img"
                src="/static/court1.jpg"
                sx={{
                  borderRadius: 4,
                  overflow: 'hidden',
                  width: '100%', // Make image responsive
                  height: 'auto' // Ensure the aspect ratio is maintained
                }}
              />
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
