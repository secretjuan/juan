import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { keyframes } from '@mui/system';
import flashFill from '@iconify/icons-eva/flash-fill';
// material
import { styled } from '@material-ui/core/styles';
import { Button, Link, Container, Typography, Stack } from '@material-ui/core';

//
import { varFadeIn, varFadeInUp, varWrapEnter, varFadeInRight, varFadeInDown, varFadeInLeft } from '../../animate';
// ----------------------------------------------------------------------


const RootStyle = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.grey[1],
  overflow: 'hidden',
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: '105vh',
    display: 'flex',
    alignItems: 'center'
  }
}));

const ContentStyle = styled((props) => <Stack spacing={5} {...props} />)(({ theme }) => ({
  zIndex: 1,
  maxWidth: '100%',
  margin: 'auto',
  textAlign: 'center',
  position: 'relative',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(15)
}));

const waveAnimation = keyframes`
  0% { transform: rotate(0deg); }
  10% { transform: rotate(14deg); }
  20% { transform: rotate(-8deg); }
  30% { transform: rotate(14deg); }
  40% { transform: rotate(-4deg); }
  50% { transform: rotate(10deg); }
  60% { transform: rotate(0deg); }
  100% { transform: rotate(0deg); }
`;

// Create a styled span for the waving emoji
const WavingEmoji = styled('span')`
  display: inline-block;
  animation-name: ${waveAnimation};
  animation-duration: 2.5s;
  animation-iteration-count: infinite;
  transform-origin: 70% 70%;  /* Adjust pivot point if needed */
`;


const HeroVideoStyle = styled(motion.video)({
  zIndex: -1,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
  top: 0,
  left: 0,
  opacity: 0.1, // Adjust opacity as needed
});


// const HeroOverlayStyle = styled(motion.img)({
//   zIndex: 9,
//   width: '100%',
//   height: '100%',
//   objectFit: 'cover',
//   position: 'absolute',
//   opacity: 0.1
// });

// const HeroImgStyle = styled(motion.img)(() => ({
//   top: 0,
//   right: 0,
//   bottom: 0,
//   zIndex: 8,
//   width: '100%',
//   margin: 'auto',
//   position: 'absolute'
// }));

// ----------------------------------------------------------------------

export default function LandingHero() {
  return (
    <>
      <RootStyle initial="initial" animate="animate" variants={varWrapEnter}>
      <HeroVideoStyle
        autoPlay
        loop
        muted
        variants={varFadeIn}
        style={{ 
          filter: 'blur(${blur}px)', 
          position: 'absolute', 
          top: 0, left: 0, 
          width: '100%', height: '100%', 
          zIndex: 1 
        }}
      >
        <source src="/favicon/vg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </HeroVideoStyle>

        <Container maxWidth="lg">
          <ContentStyle>
            <motion.div variants={varFadeInLeft}>
              <Typography variant="h1" 
                sx={{ 
                  color: 'common.white',
                  textAlign: 'left',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  paddingLeft: '20px'
                  
                }}
              >
                Hi!
                <WavingEmoji>
                  👋
                </WavingEmoji>
              </Typography>
            </motion.div>

            <motion.div variants={varFadeInUp} style={{ marginTop: 0 }}>
              <Typography
                variant="h3"
                sx={{
                  color: 'common.white',
                  width: { xs: '100%', sm: '100%', md: '75%' },
                  mt: { xs: 5, sm: 0, md: 1 },
                  textAlign:'left',
                  marginLeft: '20px',
                  fontSize: '25px'
                }}
                component="h1"
              >
                I am Juan Miguel Sanchez.
              </Typography>
              <Typography 
                variant="h4" 
                sx={{ 
                  color: 'common.white', 
                  mt: 6,
                  textAlign: 'left',
                  marginLeft: '20px',
                  maxWidth: '55%',
                  fontSize: { xs: '18px', md: '23px'}
  
                }} 
                component="p"
              >
                A <span style={{color: 'red' }}>web developer </span>
                who appreciates the beauty of <span style={{color: 'red' }}>landscape </span> and <span style={{color: 'red' }}>scenery</span>, I’m committed to continuous learning and growth. 
                I create websites that not only function well but also show a sense of place and beauty. 
                Every feature is built with purpose, ensuring that each element serves a meaningful role in the overall experience. Let’s bring your ideas to life together!
              </Typography>
            </motion.div>
          </ContentStyle>
        </Container>
      </RootStyle>
    </>
  );
}