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
      <div className={styles.list}>
        {movies.map((movie) => {
          return <MovieListItem data={movie} key={movie.movieId} />;
        })}
        {movies.map((movie) => {
          return <MovieListItem data={movie} key={movie.movieId} />;
        })}
        {movies.map((movie) => {
          return <MovieListItem data={movie} key={movie.movieId} />;
        })}
        {movies.map((movie) => {
          return <MovieListItem data={movie} key={movie.movieId} />;
        })}
        {movies.map((movie) => {
          return <MovieListItem data={movie} key={movie.movieId} />;
        })}
      </div>
    </div>
  );
}
export default MoviesListContainer;
