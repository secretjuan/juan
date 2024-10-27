// material
import { styled } from '@material-ui/core/styles';
// components
import Page from '../components/Page';
import { LoginHero, LoginForm, LoginContents } from '../components/_external-pages/login';
import ComingSoon from './ComingSoon';
import { LandingBusiness } from 'components/_external-pages/landing';

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

export default function ComingSoonPage() {
  return (
    <RootStyle title="Coming Soon - JMS" id="move_top">
      <ContentStyle>
        <ComingSoon />
      </ContentStyle>
    </RootStyle>
  );
}
