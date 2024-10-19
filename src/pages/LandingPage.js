// material
import { styled } from '@material-ui/core/styles';
// components
import Page from '../components/Page';
import {
  LandingHero,
  LandingProjects
} from '../components/_external-pages/landing';
import  Card  from 'components/_external-pages/jaby/Card.js';
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

export default function LandingPage() {
  return (
    <RootStyle title="Juan" id="move_top">
      <LandingHero />
      {/* <LandingProjects /> */}
      <Card />
    </RootStyle>
  );
}
