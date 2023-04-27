import { createContext, useContext, useState, useEffect } from 'react';

import { userLogin } from '../api/user';

type ProfileContextType = {
  signedIn: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
};

type ProfileProviderProps = {
  children: React.ReactNode;
};

const ProfileContext = createContext<ProfileContextType>({
  signedIn: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  login: async (_email, _password) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logout: () => {},
});

export const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setSignedIn(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const result = await userLogin(email, password);

    if (result.success) {
      localStorage.setItem('authToken', result.token);
      setSignedIn(true);
    } else {
      console.error('Login failed:', result.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setSignedIn(false);
  };

  return <ProfileContext.Provider value={{ signedIn, login, logout }}>{children}</ProfileContext.Provider>;
};

export const useProfile = () => useContext(ProfileContext);
