// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import ThemePrimaryColor from './components/ThemePrimaryColor';

import { UsersProvider } from './contexts/UserContext';
// ----------------------------------------------------------------------

export default function App() {
  return (
    <>
      <ThemeConfig>
        <ThemePrimaryColor>
          <UsersProvider>
            <ScrollToTop />
            <Router />
          </UsersProvider>
        </ThemePrimaryColor>
      </ThemeConfig>
    </>
  );
}
