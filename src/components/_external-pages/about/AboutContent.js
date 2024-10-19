// material
import { styled } from '@material-ui/core/styles';
import { Container, Typography, Grid, Box } from '@material-ui/core';

//
import { motion } from 'framer-motion';
import { varFadeInLeft, varFadeInRight, varFadeInDown } from '../../animate';

const RootStyle = styled('div')(() => ({
  position: 'relative',
  marginBottom: 64,
  paddingTop: 42,
  paddingBottom: 42,
  display: 'flex',
  alignItems: 'center'
}));
const ImgStyle = styled('div')(() => ({}));

export default function AboutContents() {
  return (
    <RootStyle>
      <Container maxWidth="lg">
        <motion.div variants={varFadeInDown} style={{ marginTop: 0 }}>
          <Typography
            component="h2"
            variant="h5"
            color="common.black"
            sx={{ textAlign: 'center', my: { xs: 2, md: 6 } }}
          >
            We are in the business of helping clients grow their business. with more than 5 years of professional
            excellence, this is what we know and this is what we do best.
          </Typography>
        </motion.div>

        <Grid container sx={{ width: '100%' }}>
          <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
            <motion.div variants={varFadeInLeft} style={{ marginTop: 0, position: 'relative' }}>
              <ImgStyle>
                <Box
                  component="img"
                  src="/static/about-7star.jpg"
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
              <Typography
                variant="h6"
                sx={{ color: 'common.black', mt: 1, fontWeight: 400, px: { xs: 0, md: 2, lg: 6 } }}
                component="p"
              >
                7-star manpower services of the phils. Corp provides the best and widest range of expert human resource
                and business solutions services as we have developed an inimitable knowledge of the needs of each
                business.
                <br /> <br />
                Our services are built on years of professional excellence, a strong culture of innovation, and
                relentless focus on customer needs satisfaction.
                <br /> <br />
                From the team’s passion of helping the filipino community with self-reliance and dignity in work, 7-star
                was established. The team was envisioned by a group of operation managers with outstanding expertise in
                the human resource and business outsourcing industry.
              </Typography>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
