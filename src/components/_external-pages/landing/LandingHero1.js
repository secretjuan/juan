import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import flashFill from '@iconify/icons-eva/flash-fill';
// material
import { styled } from '@material-ui/core/styles';
import { Button, Link, Container, Typography, Stack } from '@material-ui/core';

//
import { varFadeIn, varFadeInUp, varWrapEnter, varFadeInRight, varFadeInDown } from '../../animate';

// ----------------------------------------------------------------------

const RootStyle = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.grey[400],
  overflow: 'hidden',
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
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
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(15)
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

export default function LandingHero() {
  return (
    <>
      <RootStyle initial="initial" animate="animate" variants={varWrapEnter}>
        <HeroOverlayStyle alt="get-started-get-discovered-overlay" src="/static/overlay.svg" variants={varFadeIn} />

        <HeroImgStyle
          alt="get-started-get-discovered"
          src="/static/get-started-get-discovered.jpg"
          variants={varFadeInUp}
          style={{
            height: '100vh',
            objectFit: 'cover',
            objectPosition: 'center'
          }}
        />

        <Container maxWidth="lg">
          <ContentStyle>
            <motion.div variants={varFadeInDown}>
              <Typography variant="h1" sx={{ color: 'common.white' }}>
                Welcome to Rent-A-Court!
              </Typography>
            </motion.div>

            <motion.div variants={varFadeInUp} style={{ marginTop: 0 }}>
              <Typography
                variant="h5"
                sx={{
                  color: 'common.white',
                  width: { xs: '100%', sm: '100%', md: '75%' },
                  margin: 'auto',
                  mt: { xs: 5, sm: 0, md: 0 },
                  fontWeight: 400
                }}
                component="p"
              >
                Find Your Perfect Court Rental
                Experience top-tier court facilities and elevate your game with Rent-A-Court. Whether you're an individual player, a team, or an organization, we offer premium court rental services tailored to suit your needs.
              </Typography>
              <Typography variant="h4" sx={{ color: 'common.white', mt: 6 }} component="p">
                Begin Your Journey! Book your court rental today and unlock the next level of your game.
              </Typography>
            </motion.div>

            <motion.div variants={varFadeInRight} style={{ marginTop: 0 }}>
              <Link
                sx={{
                  '&:hover': {
                    textDecoration: 'none'
                  }
                }}
                rel="noreferrer"
                href="/services"
              >
                <Button
                  size="large"
                  variant="contained"
                  sx={{ boxShadow: 'none', mt: 3 }}
                  endIcon={<Icon icon={flashFill} width={20} height={20} />}
                  style={{ backgroundColor: "#ff9800", color: '#fff' }}
                >
                  Available Court
                </Button>
              </Link>
            </motion.div>
          </ContentStyle>
        </Container>
      </RootStyle>
    </>
  );
}
