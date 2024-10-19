// material
import { styled } from '@material-ui/core/styles';
import { Container, Typography, Grid, Box } from '@material-ui/core';

//
import { motion } from 'framer-motion';
import { varFadeInRight } from '../../animate';

const CORE_VALUES = [
  'Christ-centered',
  'Customer-focused',
  'Timeliness & Efficiency',
  'Discipline & Uprightness',
  'Leadership & Innovation',
  'Commitment',
  'Teamwork',
  'Meritocracy',
  'Social Responsibility'
];

const RootStyle = styled('div')(() => ({
  position: 'relative',
  marginBottom: 64,
  paddingTop: 62,
  paddingBottom: 62,
  display: 'flex',
  alignItems: 'center'
}));
const ListStyle = styled('ul')(({ theme }) => ({
  color: theme.palette.common.black,
  [theme.breakpoints.up('md')]: {
    display: 'inline-flex',
    alignnItems: 'center',
    flexWrap: 'wrap'
  },
  [theme.breakpoints.up('xs')]: {
    width: '50%',
    margin: '42px auto'
  }
}));
const ListItemStyle = styled('li')(({ theme }) => ({
  color: theme.palette.common.black,
  [theme.breakpoints.up('md')]: {
    width: '100%',
    flex: '0 0 50%',
    textAlign: 'left !important'
  }
}));

export default function AboutCore() {
  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Grid xs={12} md={12} sx={{ display: 'flex', alignItems: 'center' }}>
          <Box>
            <motion.div variants={varFadeInRight} style={{ marginTop: 0, width: '100%' }}>
              <Typography variant="h2" sx={{ color: 'common.black', mx: 2, mb: 2, textAlign: 'center' }} component="h2">
                Core Values
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: 'common.black',
                  mt: 2,
                  mb: { xs: 1, md: 3 },
                  fontWeight: 400,
                  width: { xs: '100%', md: '75%', margin: 'auto' },
                  textAlign: 'center'
                }}
                component="p"
              >
                Our core values are the guiding principles of how we perform work and conduct ourselves. We strive to be
                accountable to these values and challenge others to make sure they are met.
              </Typography>
            </motion.div>

            <motion.div variants={varFadeInRight} style={{ marginTop: 0, width: '100%', textAlign: 'center' }}>
              <Box sx={{ marginLeft: 'auto' }}>
                <ListStyle>
                  {CORE_VALUES &&
                    CORE_VALUES.map((value, KEY) => (
                      <ListItemStyle key={KEY}>
                        <Typography variant="h6" sx={{ color: 'common.black', mt: 1, fontWeight: '400' }} component="p">
                          {value}
                        </Typography>
                      </ListItemStyle>
                    ))}
                </ListStyle>
              </Box>
            </motion.div>
          </Box>
        </Grid>
      </Container>
    </RootStyle>
  );
}
