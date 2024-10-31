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
  '/static/projects/POS1.png',
  '/static/projects/POS.png',
  '/static/projects/POS2.png',
  
   // Replace with your second image path
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
    height: 'auto',
    paddingTop: 24,
    paddingBottom: 24,
  },
  '@media (min-width:601px) and (max-width:900px)': {
    paddingTop: 30,
    paddingBottom: 30,
    height: 'auto',
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
          {/* Left Side - Text Content */}
          <Grid item xs={12} md={4}>
            <Typography variant="h2" component="h2" gutterBottom>
              POS System
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 400, width: '90%' }}>
              I developed a simple point-of-sale system for my family's small meat shop. 
              This system is designed exclusively for issuing 'not official receipts' 
              and maintaining inventory records. 
              Please note that it is not registered with the Bureau of Internal Revenue (BIR).
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
          </Grid>

          <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>More About the POS System</DialogTitle>
          <DialogContent dividers>
            <Typography variant="body1" paragraph>
              This POS system was developed to streamline transactions in my family's small meat shop.
              The system is exclusively for issuing 'not official receipts' and maintaining inventory
              records. It allows for easy tracking of stock levels, itemized purchases, and pricing, helping
              our shop operate more efficiently without complex bookkeeping.
            </Typography>
            <Typography variant="body1" paragraph>
              Key features include:
              <ul>
                <li>Simple inventory management</li>
                <li>Easy transaction logging</li>
                <li>User-friendly interface</li>
              </ul>
            </Typography>
            <Typography variant="body1" paragraph>
              Please note that this POS system is custom-built for internal use only and is not registered
              with the Bureau of Internal Revenue (BIR), so it is limited to informal transactions.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

          {/* Right Side - Product Image */}
          <Grid 
            item 
            xs={12} 
            md={8} 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              position: 'relative' 
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
        </Grid>
      </Container>
    </RootStyle>
  );
}
