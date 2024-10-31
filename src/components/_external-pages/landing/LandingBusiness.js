// material
import { Container, Typography, Grid, Button, Link, Box,  Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';

//
import { motion } from 'framer-motion';
import { varFadeInLeft, varFadeInRight } from '../../animate';
import React, { useState } from 'react';
import { styled } from '@mui/system';
import { IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBack from '@mui/icons-material/ArrowBack';

const cover = '/favicon/bg1.png';

const fadeOutLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

const images = [
  '/static/projects/teamba2.png',
  '/static/projects/teamba1.png',
  '/static/projects/teamba.png', // Replace with your second image path
];


const RootStyle = styled('div')(() => ({
  position: 'relative',
  marginBottom: '0px',
  paddingTop: 42,
  paddingBottom: 42,
  height: 'auto',
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

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleChangeImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePreviousImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
        <Grid container spacing={2} sx={{ width: '100%' }}>
          <Grid 
            item 
            xs={12} 
            md={10} 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              position: 'relative',
            }}
          >
            <motion.div 
              initial="hidden" 
              animate="visible" 
              exit="hidden" 
              variants={fadeOutLeft} 
              transition={{ duration: 0.7 }}
              key={currentIndex} // This key prop helps trigger the exit/entrance animations
            >
              <Box 
                component="img" 
                src={images[currentIndex]} 
                sx={{
                  borderRadius: 4,
                  overflow: 'hidden',
                  width: '100%', // Make image responsive
                  height: 'auto' // Ensure the aspect ratio is maintained
                }}
              />
            </motion.div>

            <IconButton
              sx={{
                position: 'absolute',
                top: '50%',
                left: '43px',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                borderRadius: '50%',
                width: 40,
                height: 40,
                '&:hover': {
                  backgroundColor: '#FF9800',
                },
              }}
              onClick={handlePreviousImage}
            >
              <ArrowBack 
                sx={{ 
                  color: '#FF9800', 
                  '&:hover': {
                    color: 'white',
                    transition: 'color 0.2s ease',
                  }, 
                }} 
              />
            </IconButton>

            {/* Arrow Button to Navigate to the Next Image */}
            <IconButton
              sx={{
                position: 'absolute',
                top: '50%',
                right: '20px',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                borderRadius: '50%',
                width: 40,
                height: 40,
                '&:hover': {
                  backgroundColor: '#FF9800',
                },
              }}
              onClick={handleChangeImage}
            >
              <ArrowForwardIcon 
                sx={{ 
                  color: '#FF9800', 
                  '&:hover': {
                    color: 'white',
                    transition: 'color 0.2s ease',
                  }, 
                }} 
              />
            </IconButton>
          </Grid>
          <Grid item xs={12} md={8} sx={{ display: 'flex', alignItems: 'flex-end',}}>
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
              <Button 
                variant="outlined" 
                color="inherit" 
                sx={{ marginRight: 2 }} 
                onClick={handleOpen} // Open modal on click
              >
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
