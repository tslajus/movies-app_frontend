import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchPersonalMovies } from 'api/personalMovies';
import jwt_decode from 'jwt-decode';

import { userLogin } from '../api/user';

type ProfileContextType = {
  signedIn: boolean;
  isLoading: boolean;
  isRefetching: boolean;
  token: string | null;
  personalMovies: Movies | null;
  refetchPersonalMovies: (page?: number) => Promise<void>;
  login: (email: string, password: string) => void;
  logout: () => void;
};

type ProfileProviderProps = {
  children: React.ReactNode;
};

const ProfileContext = createContext<ProfileContextType>({
  signedIn: false,
  isLoading: false,
  isRefetching: false,
  token: null,
  personalMovies: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  refetchPersonalMovies: async () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  login: async (_email, _password) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logout: () => {},
});

export const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => {
  const [signedIn, setSignedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [personalMovies, setPersonalMovies] = useState<Movies | null>(null);

  const login = async (email: string, password: string) => {
    const result = await userLogin(email, password);

    if (result.success) {
      localStorage.setItem('authToken', result.token);
      setToken(result.token);
      setSignedIn(true);
      await refetchPersonalMovies();
    } else {
      console.error('Login failed:', result.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setSignedIn(false);
  };

  const isTokenExpired = (token: string): boolean => {
    try {
      const decodedToken: any = jwt_decode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp && decodedToken.exp < currentTime) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return true;
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
      setSignedIn(true);
    }
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      if (signedIn && token) {
        setIsLoading(true);
        const movies = await fetchPersonalMovies(token);
        setPersonalMovies(movies);
        setIsLoading(false);
      } else {
        setPersonalMovies(null);
      }
    };

    fetchMovies();
  }, [signedIn, token]);

  useEffect(() => {
    if (signedIn && token) {
      if (isTokenExpired(token)) {
        logout();
      }
    }
  }, [signedIn, token]);

  const refetchPersonalMovies = useCallback(async () => {
    if (signedIn && token) {
      setIsRefetching(true);
      const movies = await fetchPersonalMovies(token);
      setPersonalMovies(movies);
      setIsRefetching(false);
    } else {
      setPersonalMovies(null);
    }
  }, [signedIn, token]);

  return (
    <ProfileContext.Provider value={{ signedIn, token, personalMovies, refetchPersonalMovies, login, logout, isLoading, isRefetching }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
