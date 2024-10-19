import { useRef } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
// material
import { useTheme, styled } from '@material-ui/core/styles';
import { Paper, Container } from '@material-ui/core';

const MOCK_CAROUSELS = [
  {
    id: 1,
    image: '/static/stores/jolibee-updated-300x300.png'
  },
  {
    id: 2,
    image: '/static/stores/chowking-updated-300x300.png'
  },
  {
    id: 3,
    image: '/static/stores/mang-inasal-updated-300x300.png'
  },
  {
    id: 4,
    image: '/static/stores/zarks-updated-300x300.png'
  }
];

const RootStyle = styled('div')(() => ({
  overflow: 'hidden',
  position: 'relative',
  marginTop: 64,
  height: 300
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

export default function LandingStores() {
  const carouselRef = useRef();
  const theme = useTheme();

  const settings = {
    speed: 1200,
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToScroll: 1,
    slidesToShow: 3,
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
        <Slider ref={carouselRef} {...settings}>
          {MOCK_CAROUSELS.map((item) => (
            <CarouselItem key={item.title} item={item} />
          ))}
        </Slider>
      </Container>
    </RootStyle>
  );
}
