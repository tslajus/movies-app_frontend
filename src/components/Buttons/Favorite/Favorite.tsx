import { useEffect, useState } from 'react';
import { useProfile } from 'providers/ProfileProvider';
import { addPersonalMovie, deletePersonalMovie } from 'api/personalMovies';
import { HeartPlus, HeartMinus } from 'components/Icons';

import styles from './Favorite.module.css';

type FavoriteProps = {
  movie: Movie;
  onMovieRemoved?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function Favorite({ movie, onMovieRemoved, ...rest }: FavoriteProps): JSX.Element {
  const { token, allPersonalMovies, refetchPersonalMovies } = useProfile();
  const [isInPersonalMovies, setIsInPersonalMovies] = useState(false);

  useEffect(() => {
    const isInPersonalMovies = allPersonalMovies.some((personalMovie: Movie) => personalMovie.movieId === movie.movieId);
    setIsInPersonalMovies(isInPersonalMovies);
  }, [movie.movieId, token, allPersonalMovies]);

  const handleAddMovie = async () => {
    if (token) {
      await addPersonalMovie(movie, token);
      setIsInPersonalMovies(true);
      await refetchPersonalMovies();
    }
  };

  const handleRemoveMovie = async () => {
    if (token) {
      await deletePersonalMovie(movie.movieId, token);
      setIsInPersonalMovies(false);
      await refetchPersonalMovies();
    }
  };

  if (isInPersonalMovies) {
    return (
      <button className={styles.btn} onClick={handleRemoveMovie} {...rest}>
        <HeartMinus />
      </button>
    );
  }

  return (
    <button className={styles.btn} onClick={handleAddMovie} {...rest}>
      <HeartPlus />
    </button>
  );
}

export default Favorite;
