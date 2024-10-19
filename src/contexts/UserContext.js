import React, { useState, useEffect, createContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import storage from '../api/base/storage';

const UsersContext = createContext();

// eslint-disable-next-line react/prop-types
const UsersProvider = ({ children }) => {
  const { pathname } = useLocation();
  const navigation = useNavigate();
  const [user, setUser] = useState([]);

  // eslint-disable-next-line camelcase
  const check_login = async () => {
    const user = await storage.getUser();

    if (user === undefined || !user) {
      await storage.remove();
      return '';
    }

    // console.log(user);

    setUser(user);
    return navigation('/account/app');
  };

  useEffect(() => {
    check_login();
    // eslint-disable-next-line
  }, [pathname]);

  return <UsersContext.Provider value={{ user, setUser, check_login }}>{children}</UsersContext.Provider>;
};

const UserConsumer = UsersContext.Consumer;

export { UsersContext, UsersProvider, UserConsumer };
