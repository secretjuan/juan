// material
import { styled } from '@material-ui/core/styles';
// components
import Page from '../components/Page';
import { LoginHero, LoginForm, LoginContents } from '../components/_external-pages/login';

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

export default function LoginPage() {
  return (
    <RootStyle title="Applicant Login - 7 Star Manpower Services of Philippines Corporation" id="move_top">
      <LoginHero />
      <ContentStyle>
        <LoginForm />
        <LoginContents />
      </ContentStyle>
    </RootStyle>
  );
}
