// material
import { styled } from '@material-ui/core/styles';
// components
import Page from '../components/Page';
import {
  ServicesHero,
  ServicesContent,
  ServicesCore,
  ServicesQuestion,
  ServicesOffer
} from '../components/_external-pages/services';

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

export default function ServicesPage() {
  return (
    <RootStyle title="Available Courts" id="move_top">
      <ServicesHero />
      <ContentStyle>
        <ServicesCore />
        <ServicesQuestion />
      </ContentStyle>
    </RootStyle>
  );
}
