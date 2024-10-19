// material
import { styled } from '@material-ui/core/styles';
import { Container, Typography, Grid } from '@material-ui/core';

//
import { motion } from 'framer-motion';
import { varFadeInRight } from '../../animate';

const RootStyle = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.blue.main,
  position: 'relative',
  marginBottom: 64,
  paddingTop: 62,
  paddingBottom: 62,
  display: 'flex',
  alignItems: 'center'
}));
const ListStyle = styled('ol')(({ theme }) => ({
  color: theme.palette.common.white,
  [theme.breakpoints.up('xs')]: {
    paddingLeft: 30,
    paddingRight: 30
  }
}));
const ListItemStyle = styled('li')(({ theme }) => ({
  color: theme.palette.common.white,
  [theme.breakpoints.up('xs')]: {
    width: '100%'
  }
}));

export default function AboutContents() {
  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Grid container spacing={5} sx={{ width: '100%', margin: { xs: 0 } }}>
          <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <motion.div variants={varFadeInRight} style={{ marginTop: 0, width: '100%' }}>
              <Typography variant="h2" sx={{ color: 'common.white', mx: 2, textAlign: 'center' }} component="h2">
                Vision
              </Typography>
              <Typography variant="h6" sx={{ color: 'common.white', mt: 1, fontWeight: 400 }} component="p">
                7-Star Manpower Services of the Philippines Corporation envisions to become a model of excellence in
                business outsourcing services.
              </Typography>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
            <motion.div variants={varFadeInRight} style={{ marginTop: 0, width: '100%' }}>
              <Typography variant="h2" sx={{ color: 'common.white', mx: 2, textAlign: 'center' }} component="h2">
                Mission
              </Typography>

              <ListStyle>
                <ListItemStyle>
                  <Typography variant="h6" sx={{ color: 'common.white', mt: 1, fontWeight: 400 }} component="p">
                    Provide highly qualified and competent workforce with ethical values.
                  </Typography>
                </ListItemStyle>
                <ListItemStyle>
                  <Typography variant="h6" sx={{ color: 'common.white', mt: 1, fontWeight: 400 }} component="p">
                    {' '}
                    Deliver most efficient and innovative business solutions services to the company we serve through
                    quality assurance that includes collaborative assessment, comprehensive performance appraisal,
                    consistent performance monitoring and employee engagement.
                  </Typography>
                </ListItemStyle>
                <ListItemStyle>
                  <Typography variant="h6" sx={{ color: 'common.white', mt: 1, fontWeight: 400 }} component="p">
                    {' '}
                    Guarantee excellently trained personnel through a globally competitive holistic training and
                    re-training program to ensure development, enrichment and success of our people.
                  </Typography>
                </ListItemStyle>
                <ListItemStyle>
                  <Typography variant="h6" sx={{ color: 'common.white', mt: 1, fontWeight: 400 }} component="p">
                    {' '}
                    Ensure compliance with the Department of Labor and Employment standards and policies.
                  </Typography>
                </ListItemStyle>
              </ListStyle>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
