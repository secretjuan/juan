// material
import { styled } from '@material-ui/core/styles';
// components
import Page from '../components/Page';
import {
  AboutHero,
  AboutContent,
  AboutVisionMission,
  AboutCore,
  AboutHistory
} from '../components/_external-pages/about';
import { 
  LandingStores,
  LandingTeam,
  LandingBusiness,
  LandingAccreditations

 } from 'components/_external-pages/landing';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  height: '100%'
});

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default
}));

// ----------------------------------------------------------------------

export default function AboutPage() {
  return (
    <RootStyle title="About Me - JMS" id="move_top">
      <AboutHero />
      <ContentStyle>
        <AboutContent />
        <AboutVisionMission />
        <AboutCore />
        <AboutHistory />
        <LandingStores />
        <LandingTeam />
        <LandingBusiness />
        <LandingAccreditations />
        {/* <LandingTestimony /> */}
      </ContentStyle>
    </RootStyle>
  );
}
