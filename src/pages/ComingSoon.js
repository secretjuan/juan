import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@material-ui/core/styles';
import { Box, Button, Typography, Container } from '@material-ui/core';
// components
import { MotionContainer, varBounceIn } from '../components/animate';
import Page from '../components/Page';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
  backgroundColor: '#363636'
}));

// ----------------------------------------------------------------------

export default function ComingSoon() {
  return (
    <RootStyle title="404 Page Not Found | JMS">
      <Container>
        <MotionContainer initial="initial" open>
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <motion.div variants={varBounceIn}>
              <Typography variant="h3" paragraph sx={{ color: 'blue.main' }}>
                COMING SOON
              </Typography>
            </motion.div>
            <Typography sx={{ color: 'blue.main' }}>
              Thank you for your understanding as I complete this feature!
            </Typography>
            <Box sx={{ my: 3 }}>
              <Button to="/" size="large" variant="outlined" color="blue" component={RouterLink}>
                Go to Home
              </Button>
            </Box>
          </Box>
        </MotionContainer>
      </Container>
    </RootStyle>
  );
}
