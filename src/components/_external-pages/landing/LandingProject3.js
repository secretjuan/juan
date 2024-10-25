import React from 'react';
import { Container, Grid, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/system';

const cover = '/favicon/bg1.png';

const RootStyle = styled('div')({
  backgroundColor: '#363636', // Dark background color
  paddingTop: 60,
  paddingBottom: 60,
  color: '#fff',
 // White text color for contrast
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
            <Typography variant="h3" component="h2" gutterBottom>
              Beetle X31 SSD
            </Typography>
            <Typography variant="body1" gutterBottom>
              Combining unparalleled power and portability in one device, the Beetle X31 allows you to effortlessly access and organize your data wherever you go.
            </Typography>
            <Box mt={3}>
              <Button variant="outlined" color="inherit" sx={{ marginRight: 2 }}>
                Learn More
              </Button>
              <Button variant="contained" color="secondary">
                Shop Now
              </Button>
            </Box>
          </Grid>

          {/* Right Side - Product Image */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              // backgroundColor: '#363636', // Black background for the image side
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%', // Ensures the content takes the full height
            }}
          >
            <Box
              component="img"
              src="/static/court2.jpg" // Replace with the actual path of the image
              alt="Beetle X31 SSD"
              sx={{
                width: '100%',
                maxWidth: 400, // Limit the max width of the image
                display: 'block',
                margin: '0 auto',
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
