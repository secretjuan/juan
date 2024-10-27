// material
import { styled } from '@material-ui/core/styles';
// components
import Page from '../components/Page';
import {
  LandingHero,
  LandingAccreditations,
  LandingBusiness,
} from '../components/_external-pages/landing';
import  Card  from 'components/_external-pages/jaby/Card.js';
import LandingProject1 from 'components/_external-pages/landing/LandingProject1';
import LandingProject2 from 'components/_external-pages/landing/LandingProject2';
import LandingProject4 from 'components/_external-pages/landing/LandingProject4';
// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  height: '100%',
  margin: '0px',
  padding: '0px'
});

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default
}));

// ----------------------------------------------------------------------

export default function LandingPage() {
  return (
    <RootStyle title="Juan" id="move_top">
      <LandingHero />
      {/* <LandingProjects /> */}
      {/* <LandingProject /> */}
      <Card />
      <LandingProject1 />
      <LandingBusiness />
      <LandingProject2 />
      <LandingAccreditations />
    </RootStyle>
  );
}
