/* eslint-disable camelcase */
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

// components
import MainNavbar from './MainNavbar';
import MainFooter from './MainFooter';

import storage from '../../api/base/storage';
// ----------------------------------------------------------------------

export default function SignedLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const load = async () => {
    const check_user = await storage.getUser();
    if (!check_user) {
      return navigate('/login');
    }
    return '';
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <MainNavbar />

      <div>
        <Outlet />
      </div>

      <MainFooter />
    </>
  );
}
