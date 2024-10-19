// material
import { styled } from '@material-ui/core/styles';
import { Container, Typography, Grid, Box, Stack, Link } from '@material-ui/core';
import { Icon } from '@iconify/react';
import facebookFill from '@iconify/icons-eva/facebook-fill';

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

export default function ContactContents() {
  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Grid container sx={{ width: '100%' }}>
          <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
            <motion.div variants={varFadeInLeft} style={{ marginTop: 0, position: 'relative' }}>
              <ImgStyle>
                <Box
                  component="img"
                  src="/static/7star-map.png"
                  sx={{
                    borderRadius: 4,
                    overflow: 'hidden'
                  }}
                />
              </ImgStyle>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', mt: { xs: 6, md: 0 } }}>
            <motion.div variants={varFadeInRight} style={{ marginTop: 0, width: '100%' }}>
              <Typography variant="overline" sx={{ pr: { md: 5 } }}>
                Office address
              </Typography>
              <Typography variant="h6" sx={{ pr: { md: 5 }, mb: 3, fontWeight: '400' }}>
                Unit 503 FERN Building I, 827 P. Paredes Street, Sampaloc, Manila
              </Typography>

              <Typography variant="overline" sx={{ pr: { md: 5 } }}>
                Email address
              </Typography>
              <Typography variant="h6" sx={{ pr: { md: 5 }, mb: 3, fontWeight: '400' }}>
                7star.temporary@gmail.com
              </Typography>

              <Typography variant="overline" sx={{ pr: { md: 5 } }}>
                Call
              </Typography>
              <Typography variant="h6" sx={{ pr: { md: 5 }, mb: 3, fontWeight: '400' }}>
                (02) 8251 5139
              </Typography>
              <Stack
                direction="row"
                justifyContent={{ xs: 'center', md: 'flex-start' }}
                sx={{ mt: 1, mb: { xs: 5, md: 0 } }}
              >
                <Link
                  rel="noreferrer"
                  target="_blank"
                  href="https://www.facebook.com/7-Star-Manpower-Services-of-the-Philippines-Corp-633111266817755"
                  sx={{
                    color: 'common.grey',
                    transition: 'all 0.4s ease',
                    '&:hover': {
                      color: 'common.blue',
                      transform: 'scale(1.1)',
                      transition: 'all 0.4s ease'
                    }
                  }}
                >
                  <Icon icon={facebookFill} width={24} height={24} color="blue" />
                </Link>
              </Stack>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
