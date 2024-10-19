// material
import { styled } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';

//
import { motion } from 'framer-motion';
import { varFadeInDown } from '../../animate';

const RootStyle = styled('div')(() => ({
  position: 'relative',
  paddingTop: 42,
  paddingBottom: 42,
  display: 'flex',
  alignItems: 'center'
}));

export default function AboutContents() {
  return (
    <RootStyle>
      <Container maxWidth="lg">
        <motion.div variants={varFadeInDown} style={{ marginTop: 0 }}>
          <Typography
            component="h2"
            variant="h2"
            color="common.black"
            sx={{ textAlign: 'left', mt: { xs: 2, md: 6 }, mb: { xs: 2, md: 2 } }}
          >
            Business Solutions you Deserve.
          </Typography>
          <Typography
            component="p"
            variant="h6"
            color="common.black"
            sx={{ textAlign: 'left', mt: { xs: 2, md: 1 }, fontWeight: '400' }}
          >
            Redesign your business process with our proven methodologies for building the most effective business
            solutions services, allowing you to focus your efforts on your core operations.
            <br />
            <br />
            Work with our dedicated and experienced industry experts to help you focus you increase business efficiency
            and costs.
            <br />
            <br />
            With our services, you and your business are assured of effective business solutions management.
          </Typography>
        </motion.div>
      </Container>
    </RootStyle>
  );
}
