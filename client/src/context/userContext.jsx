import jwtDecode from 'jwt-decode';
import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage['jwt']) {
      const decodedToken = jwtDecode(localStorage['jwt']);
      setUser({
        ...decodedToken
      });
    }
    else setUser(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage['jwt']]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};