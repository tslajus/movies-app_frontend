import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPersonalMovies } from 'api/personalMovies';

import { userLogin } from '../api/user';

type ProfileContextType = {
  signedIn: boolean;
  token: string | null;
  personalMovies: Movies | null;
  allPersonalMovies: Movie[] | [];
  refetchPersonalMovies: (page?: number) => Promise<void>;
  login: (email: string, password: string) => void;
  logout: () => void;
};

type ProfileProviderProps = {
  children: React.ReactNode;
};

const ProfileContext = createContext<ProfileContextType>({
  signedIn: false,
  token: null,
  personalMovies: null,
  allPersonalMovies: [],
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
  const [personalMovies, setPersonalMovies] = useState<Movies | null>(null);
  const [allPersonalMovies, setAllPersonalMovies] = useState<Movie[]>([]);
  const [currentPage] = useState<number>(1);
  const navigate = useNavigate();

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

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
      setSignedIn(true);
    }
  }, []);

  useEffect(() => {
    const fetchMovies = async (page: number) => {
      if (signedIn && token) {
        const movies = await fetchPersonalMovies(token, page);
        setPersonalMovies(movies);
      } else {
        setPersonalMovies(null);
      }
    };

    fetchMovies(currentPage);
  }, [signedIn, token, currentPage]);

  const fetchAllPersonalMovies = async () => {
    if (signedIn && token) {
      let allMovies: Movie[] = [];
      let page = 1;
      let totalPages = 1;

      while (page <= totalPages) {
        const movies = await fetchPersonalMovies(token, page);
        if (movies) {
          allMovies = allMovies.concat(movies.movies);
          totalPages = movies.totalPages;
        }
        page++;
      }

      setAllPersonalMovies(allMovies);
    } else {
      setAllPersonalMovies([]);
    }
  };

  useEffect(() => {
    fetchAllPersonalMovies();
  }, [signedIn, token]);

  const refetchPersonalMovies = async (page?: number) => {
    if (signedIn && token) {
      if (page === undefined) {
        await fetchAllPersonalMovies();
      } else {
        const movies = await fetchPersonalMovies(token, page || currentPage);
        setPersonalMovies(movies);

        if (movies && movies.movies.length === 0 && currentPage > 1) {
          navigate(`/my-movies?page=${currentPage - 1}`);
        }
      }
    } else {
      setPersonalMovies(null);
    }
  };

  return (
    <ProfileContext.Provider value={{ signedIn, token, personalMovies, allPersonalMovies, refetchPersonalMovies, login, logout }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
