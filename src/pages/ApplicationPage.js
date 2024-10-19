// material
import { styled } from '@material-ui/core/styles';
// components
import Page from '../components/Page';
import {
  ApplicationFormHero,
  ApplicationForm,
  ApplicationFormContents
} from '../components/_external-pages/applicationForm';

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

export default function ApplicationPage() {
  return (
    <RootStyle title="Application Form - 7 Star Manpower Services of Philippines Corporation" id="move_top">
      <ApplicationFormHero />
      <ContentStyle>
        <ApplicationForm />
        <ApplicationFormContents />
      </ContentStyle>
    </RootStyle>
  );
}
