import PropTypes from 'prop-types';
// material
import { styled } from '@material-ui/core/styles';
import { Box, Typography, Grid, Container } from '@mui/material';

const MOCK_CAROUSELS = [
  {
    id: 1,
    image: '/static/court1.jpg',
    description: 'POS System'
  },
  {
    id: 2,
    image: '/static/court1.jpg',
    description: 'Inventory Management System'
  },
  {
    id: 3,
    image: '/static/court2.jpg',
    description: 'Court Rental Management System'
  },
  {
    id: 4,
    image: '/static/court3.jpg',
    description: 'Coffee Ordering System'
  }
];

const RootStyle = styled('div')(() => ({
  overflow: 'hidden',
  position: 'relative',
  // marginBottom: '25vh',
  height: 'auto',
  paddingBottom: '20px',
  // backgroundColor: '#363636'
}));

const CarouselImgStyle = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  margin: 'auto',
  objectFit: 'contain',
  transition: theme.transitions.create('all'),
  maxWidth: 500,
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
        color: 'black'
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
      <Container sx={{backgroundColor: 'grey[1]'}}>
        <Box sx={{ textAlign: 'center', mb:{xs:5, md:10}, mt: {xs:3, md:4} }}>
          <Typography variant='h4' sx={{ fontSize: { xs: '16px', md: '38px', color: 'black' } }}> Projects </Typography>
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