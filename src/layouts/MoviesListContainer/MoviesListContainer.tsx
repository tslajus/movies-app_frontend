import { useQuery } from '@tanstack/react-query';
import { fetchMovies } from 'api/movies';
import { Loader } from 'components';

import { MovieListItem } from './MovieListItem/MovieListItem';
import styles from './MoviesListContainer.module.css';

function MoviesListContainer() {
  const { data } = useQuery(['movies'], fetchMovies);

  if (!data) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const movies = data.movies;

  return (
    <div className={styles.container}>
      <MovieListItem data={movies[2]} />
    </div>
  );
}
export default MoviesListContainer;
