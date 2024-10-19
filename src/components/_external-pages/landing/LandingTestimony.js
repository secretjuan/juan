import { useRef } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
// material
import { useTheme, styled } from '@material-ui/core/styles';
import { Paper, Container, Typography, Box, CardContent } from '@material-ui/core';

//
import { motion } from 'framer-motion';
import { varFadeInUp } from '../../animate';

const MOCK_CAROUSELS = [
  {
    id: 1,
    name: 'Ms. Phet Avila',
    company: 'Group Manager, Jollibee Metro North  COC Group',
    description:
      '7-star has been our partners for more than 3 years and i have nothing but good words for them. The people from 7-star are all approachable and committed in providing excellent service. With their help, we were able to adapt quickly in this difficult situation we are all in. Over the years, we have developed a great partnership built on trust and respect.',
    image: '/static/testimony/phet-avila-updated.jpg'
  },
  {
    id: 2,
    name: 'Mr. Francis Agojo',
    company: 'Group Manager Ng Kong Sing Group',
    description:
      'For the past years of partnership, I’m very grateful to have 7-star in NKC Group. You always ensure the efficiency and effectiveness of your people, especially those who are deployed in their respective stores of assignment. From the board of directors, management team down to office staff, all are working hand in hand to make us, your client, more updated and satisfied for the development of your services. Looking forward for more fruitful years of partnership with you 7-star. God bless us even more',
    image: '/static/testimony/francis-agojo-updated.jpg'
  },
  {
    id: 3,
    name: ' Mr. Jan Felix Andrei T. Gantioqui',
    company: 'Zark’s Food Ventures Corporation',
    description:
      '7 Star Manpower services had been nothing but reliable in terms of supplying our manpower needs and had been very flexible in whatever our business requirements we would ask of them.',
    image: '/static/testimony/avatar_default.jpg'
  },
  {
    id: 4,
    name: 'Ms. Rossana Aliwalas',
    company: 'Group Manager, Jollibee Metro South COC Group',
    description:
      'Operating in a food industry with 7-star as our partner in providing manpower needs seized the opportunity to get ahead of the curve as they are really hands on in providing not just the quantity, more so the quality of their manpower. Spearheaded by young entrepreneurs who’s commitment and dedication are truly remarkable. Thank you 7-star for the delightful partnership and we’re looking forward for more years with you. ',
    image: '/static/testimony/rossana-aliwalas-updated.jpg'
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
  marginBottom: 64
}));

const CarouselImgStyle = styled('img')(({ theme }) => ({
  width: 180,
  height: 180,
  margin: 'auto',
  objectFit: 'cover',
  transition: theme.transitions.create('all'),
  borderRadius: '100%'
}));

const cover = '/static/background/wavy-two.png';

// ----------------------------------------------------------------------

CarouselItem.propTypes = {
  item: PropTypes.object
};

function CarouselItem({ item }) {
  const { image, description, company, name } = item;

  return (
    <Paper
      sx={{
        my: 1,
        mx: 2,
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
        py: 4,
        px: 1,
        boxShadow: '0 2px 32px rgb(0,0,0,0.05)',
        height: { xs: 'auto', sm: 'auto', md: 700 },
        borderBottom: '6px solid #091A7A'
      }}
    >
      <CarouselImgStyle alt={name} src={image} />
      <CardContent
        sx={{
          zIndex: 9,
          width: '100%',
          textAlign: 'center',
          color: 'common.white',
          position: 'relative'
        }}
      >
        <Typography variant="h6" paragraph color="blue.main" sx={{ mb: 0 }}>
          {name}
        </Typography>
        <Typography variant="body2" paragraph color="common.black" style={{ fontWeight: 400 }}>
          {company}
        </Typography>
        <Typography variant="body1" paragraph color="common.black" sx={{ lineHeight: '32px' }}>
          {description}
        </Typography>
      </CardContent>
    </Paper>
  );
}

export default function LandingTestimony() {
  const carouselRef = useRef();
  const theme = useTheme();

  const settings = {
    speed: 1200,
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToScroll: 1,
    slidesToShow: 2,
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
    <RootStyle
      sx={{
        backgroundImage: `url(${cover})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#FFFFFF'
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: 10 }}>
          <motion.div variants={varFadeInUp} style={{ marginTop: 0 }}>
            <Typography
              variant="h3"
              sx={{
                color: 'common.black',
                margin: 'auto',
                textAlign: 'center',
                mt: { xs: 5, sm: 0, md: 0 }
              }}
              component="h2"
            >
              Don’t take our word for it. Hear what our customers have to say.
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: 'common.black', mt: 1, fontWeight: 400, textAlign: 'center' }}
              component="p"
            >
              We pride ourselves on building positive relationships with our clients and employees. See what some of
              them have to say about us!
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
      </Container>
    </RootStyle>
  );
}
