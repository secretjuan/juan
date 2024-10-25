import React from 'react';
import { Container, Grid, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import { varFadeInLeft, varFadeInRight } from '../../animate';

const cover = '/favicon/bg1.png';

const RootStyle = styled('div')({
  position: 'relative',
  marginBottom: '0px',
  paddingTop: 42,
  paddingBottom: 42,
  height: 600,
  display: 'flex',
  alignItems: 'center',
  color: '#fff'
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
            <Typography variant="h2" component="h2" gutterBottom>
              Court Rental Management System
            </Typography>
            <Typography variant="h6" sx={{fontWeight: 400, width: '90%' }}>
            I developed a simple point-of-sale system for my family's small meat shop. 
            This system is designed exclusively for issuing 'not official receipts' 
            and maintaining inventory records. 
            Please note that it is not registered with the Bureau of Internal Revenue (BIR).
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
              <Box component="img" src="/static/court1.jpg" sx={{ borderRadius: 4, overflow: 'hidden' }} />
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
