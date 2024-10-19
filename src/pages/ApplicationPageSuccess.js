// material
import { styled } from '@material-ui/core/styles';
// components
import Page from '../components/Page';
import { ApplicationHero, ApplicationGuide, ApplicationContents } from '../components/_external-pages/applySuccess';

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

export default function ApplicationPageSuccess() {
  return (
    <RootStyle title="Application Success - 7 Star Manpower Services of Philippines Corporation" id="move_top">
      <ApplicationHero />
      <ContentStyle>
        <ApplicationGuide />
        <ApplicationContents />
      </ContentStyle>
    </RootStyle>
  );
}
