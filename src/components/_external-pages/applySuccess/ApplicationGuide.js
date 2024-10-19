/* eslint-disable camelcase */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// material
import { styled } from '@material-ui/core/styles';
import { Container, Typography, Grid, Box, Card } from '@material-ui/core';
import CheckCircle from '@material-ui/icons/CheckCircle';

//
import { motion } from 'framer-motion';
import { varFadeInLeft } from '../../animate';

const RootStyle = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  position: 'relative',
  paddingTop: 42,
  paddingBottom: 62,
  display: 'flex',
  alignItems: 'center'
}));

export default function ApplicationGuide() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    const load = () => {
      const get_complete = localStorage.getItem('complete');
      if (!get_complete) return navigate('/', { replace: true });

      const parseData = JSON.parse(get_complete);
      if (!parseData) return navigate('/', { replace: true });
      setData(parseData.data);
      return '';
    };

    load();

    // eslint-disable-next-line
  }, []);
  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Card sx={{ my: 10, py: 10, px: 5 }}>
          <Box>
            <motion.div variants={varFadeInLeft} style={{ marginTop: 0, position: 'relative', textAlign: 'center' }}>
              <CheckCircle
                width="128"
                height="128"
                color="common.black"
                sx={{ fontSize: 128, color: 'primary.main', my: 2 }}
              />
            </motion.div>
            <Typography
              component="h2"
              variant="h3"
              color="common.black"
              sx={{ textAlign: 'center', my: { xs: 2, md: 3 } }}
            >
              Awesome you have submitted your Job Application.
            </Typography>
            <Typography
              component="p"
              variant="h6"
              color="common.black"
              sx={{ textAlign: 'center', my: { xs: 2, md: 3 } }}
            >
              Kindly go to{' '}
              <a href={process.env.REACT_APP_MEMBER_URI} target="_blank" rel="noreferrer">
                Member's page
              </a>{' '}
              Sign in using the credentials below.
            </Typography>
          </Box>
          <Grid sx={{ width: '100%', textAlign: 'center' }}>
            <motion.div variants={varFadeInLeft} style={{ marginTop: 0, position: 'relative' }}>
              <Box sx={{ textAlign: 'left', width: { md: '50%', sm: '50%', xs: '100%' }, margin: 'auto' }}>
                <Typography variant="h5" component="h3" color="common.black" sx={{ my: 2, fontWeight: 400 }}>
                  Email address / Username : <strong>{data && data.username}</strong>
                </Typography>
                <Typography variant="h5" component="h3" color="common.black" sx={{ my: 2, fontWeight: 400 }}>
                  Password: <strong> {data && data.reference_id}</strong>
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        </Card>
      </Container>
    </RootStyle>
  );
}
