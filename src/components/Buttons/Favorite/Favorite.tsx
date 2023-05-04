import { useEffect, useState } from 'react';
import { useProfile } from 'providers/ProfileProvider';
import { addPersonalMovie, deletePersonalMovie } from 'api/personalMovies';
import { HeartPlus, HeartMinus } from 'components/Icons';
import { Loader } from 'components';

import styles from './Favorite.module.css';

type FavoriteProps = {
  movie: Movie;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function Favorite({ movie, ...rest }: FavoriteProps): JSX.Element {
  const { token, personalMovies, refetchPersonalMovies } = useProfile();
  const [isInPersonalMovies, setIsInPersonalMovies] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (personalMovies) {
      const isInPersonalMovies = personalMovies.movies.some((personalMovie: Movie) => personalMovie.movieId === movie.movieId);
      setIsInPersonalMovies(isInPersonalMovies);
    }
  }, [movie.movieId, token, personalMovies]);

  const handleButtonClick = async (isAdding: boolean) => {
    if (token) {
      setIsLoading(true);
      const loadingTimer = new Promise((resolve) => setTimeout(resolve, 300));

      await Promise.all([
        loadingTimer,
        (async () => {
          if (isAdding) {
            await addPersonalMovie(movie, token);
            setIsInPersonalMovies(true);
          } else {
            await deletePersonalMovie(movie.movieId, token);
            setIsInPersonalMovies(false);
          }
        })(),
      ]);

      setIsLoading(false);
      await refetchPersonalMovies();
    }
  };

  if (isInPersonalMovies) {
    return (
      <button className={styles.btn} onClick={() => handleButtonClick(false)} {...rest}>
        {isLoading ? <Loader backgroundSize="small" isFast isNoBackground isSmall /> : <HeartMinus />}
      </button>
    );
  }

  return (
    <button className={styles.btn} onClick={() => handleButtonClick(true)} {...rest}>
      {isLoading ? <Loader backgroundSize="small" isFast isNoBackground isSmall /> : <HeartPlus />}
    </button>
  );
}

export default Favorite;
