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
    image: '/static/accreditations/accreditations-bir.png'
  },
  {
    id: 2,
    image: '/static/accreditations/accreditations-dole.png'
  },
  {
    id: 3,
    image: '/static/accreditations/accreditations-pagibig.png'
  },
  {
    id: 4,
    image: '/static/accreditations/accreditations-sec.png'
  },
  {
    id: 4,
    image: '/static/accreditations/accreditations-sss.png'
  }
];

const RootStyle = styled('div')(() => ({
  overflow: 'hidden',
  position: 'relative',
  marginTop: 128
}));

const SliderStyle = styled('div')(() => ({
  overflow: 'hidden',
  position: 'relative',
  height: 300,
  marginBottom: 64
}));

const CarouselImgStyle = styled('img')(({ theme }) => ({
  width: 180,
  height: 180,
  margin: 'auto',
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
        position: 'relative'
      }}
    >
      <CarouselImgStyle alt={title} src={image} />
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
    slidesToShow: 4,
    rtl: Boolean(theme.direction === 'rtl'),
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
                mt: { xs: 5, sm: 0, md: 0 }
              }}
              component="h2"
            >
              Our Accreditations
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: 'common.black', mt: 1, fontWeight: 400, textAlign: 'center' }}
              component="p"
            >
              7-Star holds a wide range of credentials needed to provide the highest level of expertise and
              professionalism in the services you need. We strive for excellence in all aspects of the business
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
        <Box sx={{ mb: 4 }}>
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
        </Box>
      </Container>
    </RootStyle>
  );
}
