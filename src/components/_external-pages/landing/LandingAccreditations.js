import { useRef } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
// material
import { useTheme, styled } from '@material-ui/core/styles';
import { Paper, Container, Typography, Box, Grid } from '@material-ui/core';

//
import { motion } from 'framer-motion';
import { varFadeInUp } from '../../animate';

const MOCK_CAROUSELS = [
  {
    id: 1,
    image: '/favicon/html.png',
    title: 'HTML'
  },
  {
    id: 2,
    image: '/favicon/css.png',
    title: 'CSS'
  },
  {
    id: 3,
    image: '/favicon/js.png',
    title: 'Javascript'
  },
  {
    id: 4,
    image: '/favicon/react.png',
    title: 'ReactJS'
  },
  {
    id: 5,
    image: '/favicon/node.png',
    title: 'NodeJS'
  },
  {
    id: 6,
    image: '/favicon/mongodb.png',
    title: 'MongoDB'
  },
  {
    id: 7,
    image: '/favicon/git.png',
    title: 'Git'
  }
];

const RootStyle = styled('div')(() => ({
  overflow: 'hidden',
  position: 'relative',
  marginTop: 128,
  backgroundColor: '#363636'
}));

const SliderStyle = styled('div')(() => ({
  overflow: 'hidden',
  position: 'relative',
  height: 300,
  marginBottom: 64,
}));

const CarouselImgStyle = styled('img')(({ theme }) => ({
  width: 180,
  height: 180,
  margin: 'auto',
  paddingTop: '10px',
  paddingBottom: '10px',
  objectFit: 'contain',
  transition: theme.transitions.create('all')
}));

// ----------------------------------------------------------------------

CarouselItem.propTypes = {
  item: PropTypes.object
};

function CarouselItem({ item }) {
  const { image, title } = item;

  return (
    <Paper
      sx={{
        mx: 1,
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
        color: 'black',
        textAlign: 'center'
      }}
    >
      <CarouselImgStyle alt={title} src={image} />
      <Typography variant="h5" sx={{ padding: '10px 0'}}>
        {title}
      </Typography>
      
    </Paper>
  );
}

export default function LandingAccreditations() {
  const carouselRef = useRef();
  const theme = useTheme();

  const settings = {
    speed: 1200,
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToScroll: 1,
    marginTop: '500px',
    slidesToShow: 4,
    rtl: Boolean(theme.direction === 'rtl'),
    appendDots: dots => (
      <div
          style={{
              marginTop: "290px" // Adjust as needed
          }}
      >
          {dots}
      </div>
  ),
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, centerPadding: '0' }
      }
    ]
  };

  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Box sx={{ mb: 10 }}>
          <motion.div variants={varFadeInUp} style={{ marginTop: 0 }}>
            <Typography
              variant="h2"
              sx={{
                color: 'common.black',
                margin: 'auto',
                textAlign: 'center',
                mt: { xs: 5, sm: 0, md: 5 }
              }}
              component="h2"
            >
              Knowledgeable in
            </Typography>
          </motion.div>
        </Box>
        <SliderStyle>
          <Slider ref={carouselRef} {...settings}>
            {MOCK_CAROUSELS.map((item) => (
              <CarouselItem key={item.title} item={item} />
            ))}
          </Slider>
        </SliderStyle>
        {/* <Box sx={{ mb: 4 }}>
          <motion.div variants={varFadeInUp} style={{ marginTop: 0 }}>
            <Typography
              variant="h2"
              sx={{
                color: 'common.black',
                margin: 'auto',
                textAlign: 'center',
                mt: { xs: 5, sm: 0, md: 0 }
              }}
              component="h2"
            >
              Compliances
            </Typography>
            <Grid container spacing={5} sx={{ mt: 1 }}>
              <Grid item xs={12} md={3}>
                <Typography
                  variant="h6"
                  sx={{ color: 'common.black', mt: 1, fontWeight: 400, textAlign: 'center' }}
                  component="p"
                >
                  Full compliance to DO 174 series of 2017
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography
                  variant="h6"
                  sx={{ color: 'common.black', mt: 1, fontWeight: 400, textAlign: 'center' }}
                  component="p"
                >
                  Full compliance to General Labor Standards
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography
                  variant="h6"
                  sx={{ color: 'common.black', mt: 1, fontWeight: 400, textAlign: 'center' }}
                  component="p"
                >
                  Full compliance to OSH standards
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography
                  variant="h6"
                  sx={{ color: 'common.black', mt: 1, fontWeight: 400, textAlign: 'center' }}
                  component="p"
                >
                  No pending labor cases as certified by DOLE
                </Typography>
              </Grid>
            </Grid>
          </motion.div>
        </Box> */}
      </Container>
    </RootStyle>
  );
}
