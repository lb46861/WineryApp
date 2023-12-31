import React from 'react';
import { Navigate } from 'react-router-dom';
import { LOGIN_PATH } from '../utils/constants';
import { useUserContext } from '../context/UserContext';


export const withAuthentication = (WrappedComponent, allowedRoles) => {
  return (props) => {
    const { user } = useUserContext();

    const isAuthenticated = !!user;
    const isAllowed = allowedRoles.includes(user?.role);

    if (!isAuthenticated || !isAllowed) {
      return <Navigate to={LOGIN_PATH} />;
    }

    return <WrappedComponent {...props} />;
  };
};
