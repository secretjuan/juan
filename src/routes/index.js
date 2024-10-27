import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import MainLayout from '../layouts/main';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
import SignedLayout from '../layouts/signed';
// components
import LoadingScreen from '../components/LoadingScreen';
import ComingSoon from 'pages/ComingSoon';
import ComingSoonPage from 'pages/ComingSoonPage';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed'
            })
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    },
    {
      path: 'account',
      element: <SignedLayout />,
      children: [
        { path: '/', element: <Navigate to="/account/app" replace /> },
        { path: '/app', element: <MemberPage /> }
      ]
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '/', element: <LandingPage /> },
        { path: '/about', element: <AboutPage /> },
        { path: '/coming-soon', element: <ComingSoonPage /> },
        { path: '/coming-soon-blog', element: <ComingSoonPage /> },
        // { path: '/services', element: <ServicesPage /> },
        // { path: '/contact-us', element: <ContactPage /> },
        // { path: '/inquiry', element: <InquiryPage /> },
        // { path: '/login', element: <LoginPage /> },
/*        { path: '/apply', element: <ApplicationPage /> },
        { path: '/apply/success', element: <ApplicationPageSuccess /> },
        { path: '/apply/member', element: <MemberPage /> }*/
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

// IMPORT COMPONENTS

const NotFound = Loadable(lazy(() => import('../pages/Page404')));
// Main
const LandingPage = Loadable(lazy(() => import('../pages/LandingPage')));
const AboutPage = Loadable(lazy(() => import('../pages/AboutPage')));
const ServicesPage = Loadable(lazy(() => import('../pages/ServicesPage')));
const ContactPage = Loadable(lazy(() => import('../pages/ContactPage')));
const InquiryPage = Loadable(lazy(() => import('../pages/InquiryPage')));
const LoginPage = Loadable(lazy(() => import('../pages/LoginPage')));
const ApplicationPage = Loadable(lazy(() => import('../pages/ApplicationPage')));
const ApplicationPageSuccess = Loadable(lazy(() => import('../pages/ApplicationPageSuccess')));

const MemberPage = Loadable(lazy(() => import('../pages/MemberPage')));
