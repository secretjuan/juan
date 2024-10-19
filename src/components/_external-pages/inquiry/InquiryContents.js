// material
import { styled } from '@material-ui/core/styles';
import { Container, Typography, Grid, Box } from '@material-ui/core';
import CorporateFareOutlined from '@material-ui/icons/CorporateFareOutlined';
import EmailOutlined from '@material-ui/icons/EmailOutlined';
import LocalPhoneOutlined from '@material-ui/icons/LocalPhoneOutlined';

//
import { motion } from 'framer-motion';
import { varFadeInLeft } from '../../animate';

const RootStyle = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.blue.main,
  position: 'relative',
  paddingTop: 42,
  paddingBottom: 62,
  display: 'flex',
  alignItems: 'center'
}));

export default function InquiryContents() {
  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Box>
          <Typography
            component="h2"
            variant="h3"
            color="common.white"
            sx={{ textAlign: 'center', my: { xs: 2, md: 3 } }}
          >
            Let's Get in Touch
          </Typography>
        </Box>
        <Grid container sx={{ width: '100%' }}>
          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: 'flex', alignItems: 'flex-start', textAlign: 'center' }}
            color="common.white"
          >
            <motion.div variants={varFadeInLeft} style={{ marginTop: 0, position: 'relative' }}>
              <CorporateFareOutlined
                width="32"
                height="32"
                color="common.white"
                sx={{ fontSize: 32, color: 'common.white', my: 2 }}
              />
              <Typography variant="h5" component="h3" color="common.white">
                Let’s Meet
              </Typography>
              <Typography variant="p" sx={{ mb: 3, fontWeight: '400' }} color="common.white">
                Maximina Street, Villa Arca Ave, Project 8, Quezon City <br />
                <br />
                Monday-Friday 8:00-5:00 PM
              </Typography>
            </motion.div>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', textAlign: 'center' }}
            color="common.white"
          >
            <motion.div variants={varFadeInLeft} style={{ marginTop: 0, position: 'relative' }}>
              <EmailOutlined
                width="64"
                height="64"
                color="common.white"
                sx={{ fontSize: 32, color: 'common.white', my: 2 }}
              />
              <Typography variant="h5" component="h3" color="common.white">
                Drop us an Email
              </Typography>
              <Typography variant="p" sx={{ mb: 3, fontWeight: '400' }} color="common.white">
                rentacourt.temporary@gmail.com
              </Typography>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'flex-start', textAlign: 'center' }}>
            <motion.div variants={varFadeInLeft} style={{ marginTop: 0, position: 'relative' }}>
              <LocalPhoneOutlined
                width="64"
                height="64"
                color="common.white"
                sx={{ fontSize: 32, color: 'common.white', my: 2 }}
              />
              <Typography variant="h5" component="h3" color="common.white">
                Give us a call
              </Typography>
              <Typography variant="p" sx={{ mb: 3, fontWeight: '400' }} color="common.white">
                (02) 1234 5647
              </Typography>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
