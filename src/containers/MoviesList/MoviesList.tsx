import { useQuery } from '@tanstack/react-query';
import { fetchMovies } from 'api/movies';
import { Loader, MovieCard } from 'components';

import styles from './MoviesList.module.css';

function MoviesList() {
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
          return <MovieCard data={movie} key={movie.movieId} movieId={movie.movieId} />;
        })}
      </div>
    </div>
  );
}
export default MoviesList;
