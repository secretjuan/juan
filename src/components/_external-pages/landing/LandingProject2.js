import React, { useState } from 'react';
import { Container, Grid, Typography, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import { IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBack from '@mui/icons-material/ArrowBack';

const cover = '/favicon/bg.avif';

const fadeOutLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

const images = [
  '/static/projects/renta.png',
  '/static/projects/renta2.png',
  '/static/projects/renta3.png',
  '/static/projects/renta1.png',
];

const RootStyle = styled('div')({
  position: 'relative',
  marginBottom: '0px',
  paddingTop: 42,
  paddingBottom: 42,
  height: 'auto',
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
        <Grid container spacing={4} alignItems="center">
        <Grid 
            item 
            xs={12} 
            md={8} 
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
          {/* Left Side - Text Content */}
          <Grid item xs={12} md={4}>
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
        </Grid>
      </Container>
    </RootStyle>
  );
}
