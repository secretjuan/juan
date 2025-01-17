import PropTypes from 'prop-types';
// material
import { styled } from '@material-ui/core/styles';
import { Box, Typography, Grid, Container } from '@mui/material';

const MOCK_CAROUSELS = [
  {
    id: 1,
    image: '/static/projects/POS1.png',
    description: 'POS System'
  },
  {
    id: 2,
    image: '/static/projects/teamba2.png',
    description: 'Inventory Management System'
  },
  {
    id: 3,
    image: '/static/projects/rentacourt1.png',
    description: 'Court Rental System'
  },
  {
    id: 4,
    image: '/favicon/comingsoon.jpg',
    description: 'Coffee Ordering System'
  }
];

const cover = '/favicon/bg.avif';

const RootStyle = styled('div')(() => ({
  overflow: 'hidden',
  position: 'relative',
  marginBottom: '0vh',
  height: 'auto',
  paddingBottom: '50px',
  backgroundColor: '#363636',
  color: 'white'
}));

const CarouselImgStyle = styled('img')(({ theme }) => ({
  width: '100%',
  height: '30vh',
  margin: 'auto',
  objectFit: 'contain', // Makes sure images are fully covered and centered
  transition: theme.transitions.create('all', {
    duration: theme.transitions.duration.short
  }),
  [theme.breakpoints.down('sm')]: {
    maxWidth: 250
  }
}));

// ----------------------------------------------------------------------

CarouselItem.propTypes = {
  item: PropTypes.object
};

function CarouselItem({ item }) {
  const { image, title, description } = item;

  return (
    <Box
      sx={{
        mx: 1,
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
        width:{xs:'90%', md:'100%'},
        textAlign: 'center',
        boxShadow: 3, // Add shadow for visual separation
        backgroundColor: '#222024',
        // maxWidth: 1000, // Larger size for better visibility
        // maxHeight: 'auto',
        
      }}
    >
      <CarouselImgStyle alt={title} src={image} />
      <Typography variant='h5'> {description}</Typography>
    </Box>
  );
}

export default function Card() {
  return (
    <RootStyle>
      <Container sx={{backgroundColor: 'grey[1]', alignContent: 'center'}}>
        <Box sx={{ textAlign: 'center', mb:{xs:5, md:10}, mt: {xs:3, md:4} }}>
          <Typography variant='h2' sx={{ fontSize: { xs: '16px', md: '38px', } }} component={'h2'}> Projects </Typography>
        </Box>
        <Grid container spacing={1} justifyContent="center">
          {MOCK_CAROUSELS.map((item) => (
            <Grid item xs={6} sm={4} md={3} key={item.id}>
              <CarouselItem item={item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </RootStyle>
  );
}