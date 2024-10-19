// material
import { styled } from '@material-ui/core/styles';
// components
import Page from '../components/Page';
import { MemberHero, MemberContents, NewMemberForm } from '../components/_external-pages/member';

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

export default function MemberPage() {
  return (
    <RootStyle title="Applicant Dashboard - 7 Star Manpower Services of Philippines Corporation" id="move_top">
      <MemberHero />
      <ContentStyle>
        <NewMemberForm />
        <MemberContents />
      </ContentStyle>
    </RootStyle>
  );
}
