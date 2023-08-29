import { CircularProgress } from '@mui/material';
import jwtDecode from 'jwt-decode';
import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    if (localStorage['jwt']) {
      const decodedToken = jwtDecode(localStorage['jwt']);
      setUser({
        ...decodedToken
      });
    } else {
      setUser(null);
    }

    setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage['jwt']]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};