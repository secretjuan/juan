import { motion } from 'framer-motion';
// material
import { styled } from '@material-ui/core/styles';
import { Container, Typography, Stack } from '@material-ui/core';

//
import { varFadeIn, varFadeInUp, varWrapEnter, varFadeInDown } from '../../animate';

// ----------------------------------------------------------------------

const RootStyle = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.grey[400],
  overflow: 'hidden',
  height: '50vw',
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: '30vh',
    display: 'flex',
    alignItems: 'center'
  }
}));

const ContentStyle = styled((props) => <Stack spacing={5} {...props} />)(({ theme }) => ({
  zIndex: 10,
  maxWidth: '100%',
  margin: 'auto',
  textAlign: 'center',
  position: 'relative',
  paddingTop: theme.spacing(15)
}));

const HeroOverlayStyle = styled(motion.img)({
  zIndex: 9,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
  opacity: 0.1
});

const HeroImgStyle = styled(motion.img)(() => ({
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  width: '100%',
  margin: 'auto',
  position: 'absolute'
}));

// ----------------------------------------------------------------------

export default function AboutHero() {
  return (
    <>
      <RootStyle initial="initial" animate="animate" variants={varWrapEnter}>
        <HeroOverlayStyle alt="about-us-overlay" src="/static/overlay.svg" variants={varFadeIn} />

        <HeroImgStyle
          alt="about-us"
          src="/static/news-event.jpg"
          variants={varFadeInUp}
          style={{
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top'
          }}
        />

        <Container maxWidth="lg">
          <ContentStyle>
            <motion.div variants={varFadeInDown}>
              <Typography variant="h1" sx={{ color: 'common.white' }}>
                News and Events
              </Typography>
            </motion.div>
          </ContentStyle>
        </Container>
      </RootStyle>
    </>
  );
}
