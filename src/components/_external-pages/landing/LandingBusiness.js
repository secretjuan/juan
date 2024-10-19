// material
import { styled } from '@material-ui/core/styles';
import { Container, Typography, Grid, Button, Link, Box } from '@material-ui/core';

//
import { motion } from 'framer-motion';
import { varFadeInLeft, varFadeInRight } from '../../animate';

const cover = '/static/background/wavy-one.png';

const RootStyle = styled('div')(() => ({
  position: 'relative',
  marginBottom: 64,
  paddingTop: 42,
  paddingBottom: 42,
  height: 600,
  display: 'flex',
  alignItems: 'center'
}));

export default function LandingBusiness() {
  return (
    <RootStyle
      sx={{
        backgroundImage: `url(${cover})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#FFFFFF',
        backgroundAttachment: 'fixed'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5} sx={{ width: '100%' }}>
          <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
            <motion.div variants={varFadeInLeft} style={{ marginTop: 0 }}>
              <Box component="img" src="/static/business.jpg" sx={{ borderRadius: 4, overflow: 'hidden' }} />
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
            <motion.div variants={varFadeInRight} style={{ marginTop: 0, width: '100%' }}>
              <Typography
                variant="h2"
                sx={{
                  color: 'common.black',
                  margin: 'auto',
                  mt: { xs: 5, sm: 0, md: 0 }
                }}
                component="h2"
              >
                B2B. Build a better business with 7-Star.
              </Typography>
              <Typography variant="h6" sx={{ color: 'common.black', mt: 1, fontWeight: 400 }} component="p">
                In today’s evolving economy, see how our comprehensive business outsourcing services can create business
                solutions to help support your business plans and strategies. Let us handle the work so you can manage
                more and worry less!
                <br /> <br />
                Ready to lead, serve and shine with us?
              </Typography>

              <Link
                color="common.white"
                href="/inquiry"
                sx={{
                  display: 'block',
                  width: '100%',
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
                    backgroundColor: 'blue.light',
                    boxShadow: '1px solid #000',
                    '&:hover': {
                      transition: 'all 0.4s ease',
                      tranasform: 'scale(1,1)',
                      backgroundColor: 'blue.main',
                      color: 'common.white'
                    }
                  }}
                >
                  Let's Collaborate!
                </Button>
              </Link>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
