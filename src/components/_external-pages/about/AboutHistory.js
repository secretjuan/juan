// material
import { styled } from '@material-ui/core/styles';
import { Container, Typography, Grid, Button, Link, Box } from '@material-ui/core';

//
import { motion } from 'framer-motion';
import { varFadeInLeft, varFadeInRight } from '../../animate';

const RootStyle = styled('div')(() => ({
  position: 'relative',
  marginBottom: 64,
  paddingTop: 42,
  paddingBottom: 42,
  display: 'flex',
  alignItems: 'center'
}));
const ImgStyle = styled('div')(() => ({}));

const cover = '/static/background/wavy-two.png';

export default function AboutContents() {
  return (
    <RootStyle
      sx={{
        backgroundImage: `url(${cover})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'bottom',
        backgroundColor: '#FFFFFF',
        backgroundAttachment: 'fixed'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5} sx={{ width: '100%', margin: { xs: 0 } }}>
          <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', p: { xs: '0 !important' } }}>
            <motion.div variants={varFadeInLeft} style={{ marginTop: 0, position: 'relative' }}>
              <ImgStyle>
                <Box
                  component="img"
                  src="/static/about-history.jpg"
                  sx={{
                    borderRadius: 4,
                    overflow: 'hidden'
                  }}
                />
              </ImgStyle>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', p: { xs: '0 !important' } }}>
            <motion.div variants={varFadeInRight} style={{ marginTop: 0, width: '100%' }}>
              <Typography
                component="h2"
                variant="h3"
                color="common.black"
                sx={{ color: 'common.black', mt: 1, px: { xs: 0, md: 2, lg: 6 } }}
              >
                History
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: 'common.black', mt: 1, fontWeight: 400, px: { xs: 0, md: 2, lg: 6 } }}
                component="p"
              >
                The team is composed of operation managers with experiences in handling human resource management.
                <br />
                <br />
                All team managers are graduates of reputable universities with outstanding performance in business and
                community leadership and management.
                <br />
                <br />
                From the team’s passion to help the Filipino community with self-reliance and dignity in work, 7-Star
                Manpower Services of the Philippines Corporation was established.
              </Typography>
              <Link
                color="common.white"
                href="#"
                rel="noreferrer"
                target="_blank"
                sx={{
                  display: 'block',
                  width: '100%',
                  pl: { xs: 0, md: 6, lg: 6 },
                  '&:hover': {
                    textDecoration: 'none'
                  }
                }}
              >
                <Button
                  component="p"
                  variant="contained"
                  size="large"
                  sx={{
                    width: '50%',
                    marginLeft: '0',
                    fontSize: 18,
                    my: { xs: 1, md: 3 },
                    transition: 'all 0.4s ease',
                    backgroundColor: 'blue.main',
                    boxShadow: '1px solid #000',
                    '&:hover': {
                      transition: 'all 0.4s ease',
                      tranasform: 'scale(1,1)',
                      backgroundColor: 'blue.light',
                      color: 'common.white'
                    }
                  }}
                >
                  See Full History
                </Button>
              </Link>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
